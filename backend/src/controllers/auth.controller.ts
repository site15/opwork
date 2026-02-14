import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { SkipCheckAuth } from '../decorators/skip-check-auth';
import { AuthError, AuthErrorEnum } from '../errors/auth.errors';
import { AuthUser } from '../generated/rest/auth-user.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';
import { createHashFromString } from '../utils/create-hash-from-string';

export class SignInResponse {
  @ApiProperty({
    type: 'string',
  })
  sessionId!: string;

  @ApiProperty({ type: () => AuthUser })
  profile!: AuthUser;
}

export class SignInArgs {
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsNotEmpty()
  email!: string | null;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsNotEmpty()
  password!: string | null;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('profile')
  @ApiOkResponse({ type: AuthUser })
  async profile(@CurrentAppRequest() req: AppRequest): Promise<AuthUser> {
    return req.user;
  }

  @Get('sign-out')
  @ApiOkResponse({ type: StatusResponse })
  async signOut(@CurrentAppRequest() req: AppRequest): Promise<StatusResponse> {
    await this.prismaService.authSession.update({
      where: { id: req.sessionId },
      data: { isActive: false },
    });
    return { message: 'ok' };
  }

  @ApiBadRequestResponse({
    schema: { allOf: refs(AuthError) },
  })
  @SkipCheckAuth()
  @Post('sign-up')
  @ApiOkResponse({ type: SignInResponse })
  async signUp(@Body() args: SignInArgs): Promise<SignInResponse> {
    const email = args.email?.trim();
    const password = args.password?.trim();

    let user = await this.prismaService.authUser.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
    });

    if (user) {
      throw new AuthError(AuthErrorEnum.ALREADY_EXISTS);
    }

    user =
      await this.prismaService.$withoutUniversalPasswordHashing.authUser.create(
        {
          data: {
            email,
            password: createHashFromString(password || ''),
            isActive: true,
          },
        },
      );
    const session = await this.prismaService.authSession.create({
      data: { userId: user.id, isActive: true },
    });
    return { sessionId: session.id, profile: user };
  }

  @ApiBadRequestResponse({
    schema: { allOf: refs(AuthError) },
  })
  @SkipCheckAuth()
  @Post('sign-in')
  @ApiOkResponse({ type: SignInResponse })
  async signIn(@Body() args: SignInArgs): Promise<SignInResponse> {
    const email = args.email?.trim();
    const password = args.password?.trim();

    const user =
      await this.prismaService.$withoutUniversalPasswordHashing.authUser.findFirst(
        {
          where: {
            email: { equals: email, mode: 'insensitive' },
            password: createHashFromString(password || ''),
            isActive: true,
          },
        },
      );
    if (!user) {
      throw new AuthError(AuthErrorEnum.INVALID_CREDENTIALS);
    }
    const session = await this.prismaService.authSession.create({
      data: { userId: user.id },
    });
    return { sessionId: session.id, profile: user };
  }
}
