import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { SkipCheckAuth } from '../decorators/skip-check-auth';
import { AuthError, AuthErrorEnum } from '../errors/auth.errors';
import { OpWorkProfileType } from '../generated/prisma/enums';
import { AuthUser } from '../generated/rest/auth-user.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import {
  ChangeEmailArgs,
  ChangePasswordArgs,
  SignInArgs,
  SignInResponse,
  SignUpArgs,
  SignUpResponse,
  UserType,
} from '../types/auth-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';
import { hashPassword, verifyPassword } from '../utils/hashPassword';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('info')
  @ApiOkResponse({ type: AuthUser })
  async info(@CurrentAppRequest() req: AppRequest): Promise<AuthUser> {
    return req.authUser;
  }

  @Get('sign-out')
  @ApiOkResponse({ type: StatusResponse })
  async signOut(@CurrentAppRequest() req: AppRequest): Promise<StatusResponse> {
    if (req.authSessionId) {
      await this.prismaService.authSession.update({
        where: { id: req.authSessionId },
        data: { isActive: false },
      });
    }
    return { message: 'ok' };
  }

  @HttpCode(200)
  @ApiBadRequestResponse({
    schema: { allOf: refs(AuthError) },
  })
  @SkipCheckAuth()
  @Post('sign-up')
  @ApiOkResponse({ type: SignUpResponse })
  async signUp(@Body() args: SignUpArgs): Promise<SignUpResponse> {
    const user = await this.createUser(args);

    const session = await this.createAuthSession(user);
    if (args.userType) {
      await this.getOrCreateOpWorkProfile({ userType: args.userType, user });
    }
    if (args.userType === UserType.JOB_SEEKER) {
      await this.getOrCreateOpWorkProfile({
        userType: UserType.EMPLOYER,
        user,
      });
    }
    if (args.userType === UserType.EMPLOYER) {
      await this.getOrCreateOpWorkProfile({
        userType: UserType.JOB_SEEKER,
        user,
      });
    }

    return { sessionId: session.id, profile: user };
  }

  @HttpCode(200)
  @ApiBadRequestResponse({
    schema: { allOf: refs(AuthError) },
  })
  @SkipCheckAuth()
  @Post('sign-in')
  @ApiOkResponse({ type: SignInResponse })
  async signIn(@Body() args: SignInArgs): Promise<SignInResponse> {
    const user = await this.getAuthUserByEmailAndPassword(args);

    const session = await this.createAuthSession(user);
    if (args.userType) {
      await this.getOrCreateOpWorkProfile({ userType: args.userType, user });
    }

    return { sessionId: session.id, profile: user };
  }

  @HttpCode(200)
  @ApiOkResponse({ type: StatusResponse })
  @Post('change-password')
  async changePassword(
    @CurrentAppRequest() req: AppRequest,
    @Body() body: ChangePasswordArgs,
  ): Promise<StatusResponse> {
    const user = await this.prismaService.authUser.findUnique({
      where: { id: req.authUserId },
      select: { password: true },
    });

    if (!user || !user.password) {
      throw new AuthError(AuthErrorEnum.INVALID_CREDENTIALS);
    }

    // Verify current password
    const isCurrentPasswordValid = verifyPassword(
      body.currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new AuthError(AuthErrorEnum.INVALID_CREDENTIALS);
    }

    // Hash and update new password
    await this.prismaService.authUser.update({
      where: { id: req.authUserId },
      data: { password: body.newPassword },
    });

    return { message: 'ok' };
  }

  @HttpCode(200)
  @ApiOkResponse({ type: StatusResponse })
  @Post('change-email')
  async changeEmail(
    @CurrentAppRequest() req: AppRequest,
    @Body() body: ChangeEmailArgs,
  ): Promise<StatusResponse> {
    // Check if email already exists
    const existingUser = await this.prismaService.authUser.findFirst({
      where: {
        email: { equals: body.newEmail || null, mode: 'insensitive' },
      },
    });

    if (existingUser && existingUser.id !== req.authUserId) {
      throw new AuthError(AuthErrorEnum.ALREADY_EXISTS);
    }

    // Update email
    await this.prismaService.authUser.update({
      where: { id: req.authUserId },
      data: { email: body.newEmail },
    });

    return { message: 'ok' };
  }

  private async getOrCreateOpWorkProfile({
    userType,
    user,
  }: {
    userType: UserType;
    user: AuthUser;
  }) {
    const type =
      userType === UserType.JOB_SEEKER
        ? OpWorkProfileType.SPECIALIST
        : OpWorkProfileType.EMPLOYER;
    await this.prismaService.opWorkProfile.upsert({
      where: {
        uqOpWorkProfileUserType: { userId: user.id, type },
      },
      create: {
        userId: user.id,
        userType: userType,
        type,
      },
      update: {
        userId: user.id,
        userType: userType,
        type,
      },
    });
  }

  private async createAuthSession(user: AuthUser) {
    return await this.prismaService.authSession.create({
      data: { userId: user.id, isActive: true },
    });
  }

  private async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    let user = await this.prismaService.authUser.findFirst({
      where: {
        email: { equals: email || null, mode: 'insensitive' },
      },
    });

    if (user) {
      throw new AuthError(AuthErrorEnum.ALREADY_EXISTS);
    }

    user = await this.prismaService.authUser.create({
      data: {
        email,
        password,
        isActive: true,
      },
    });
    return user;
  }

  private async getAuthUserByEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user =
      await this.prismaService.$withoutUniversalPasswordHashing.authUser.findFirst(
        {
          select: { password: true, isActive: true, id: true },
          where: {
            email: { equals: email || null, mode: 'insensitive' },
          },
        },
      );

    if (!user || !user.password || !verifyPassword(password, user.password)) {
      throw new AuthError(AuthErrorEnum.INVALID_CREDENTIALS);
    }

    if (!user?.isActive) {
      throw new AuthError(AuthErrorEnum.DISABLED);
    }
    return await this.prismaService.authUser.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });
  }
}
