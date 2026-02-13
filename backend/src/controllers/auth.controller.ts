import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { SkipCheckAuth } from '../decorators/skip-check-auth';
import { AuthUser } from '../generated/rest/auth-user.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { createHashFromString } from '../utils/create-hash-from-string';

export class SignInResponse {
  @ApiProperty({
    type: 'string',
  })
  sessionId!: string;

  @ApiProperty({ type: () => AuthUser })
  profile!: AuthUser;
}

export class SignInArgs extends PickType(AuthUser, ['email']) {
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

  @SkipCheckAuth()
  @Get('profile')
  @ApiOkResponse({ type: AuthUser })
  async profile(@CurrentAppRequest() req: AppRequest): Promise<AuthUser> {
    return req.user;
  }

  @Get('sign-out')
  @ApiOkResponse({ type: AuthUser })
  async signOut(@CurrentAppRequest() req: AppRequest): Promise<AuthUser> {
    await this.prismaService.authSession.update({
      where: { id: req.sessionId },
      data: { isActive: false },
    });
    return req.user;
  }

  @SkipCheckAuth({ skipCheckSessionId: true })
  @Post('sign-up')
  @ApiOkResponse({ type: SignInResponse })
  async signUp(@Body() args: SignInArgs): Promise<SignInResponse> {
    const user = await this.prismaService.authUser.create({
      data: {
        email: args.email,
        password: createHashFromString(args.password || ''),
        isActive: true,
      },
    });
    const session = await this.prismaService.authSession.create({
      data: { userId: user.id, isActive: true },
    });
    return { sessionId: session.id, profile: user };
  }

  @SkipCheckAuth({ skipCheckSessionId: true })
  @Post('sign-in')
  @ApiOkResponse({ type: SignInResponse })
  async signIn(@Body() args: SignInArgs): Promise<SignInResponse> {
    const user = await this.prismaService.authUser.findFirst({
      where: {
        email: args.email,
        password: createHashFromString(args.password || ''),
        isActive: true,
      },
    });
    if (!user) {
      throw new BadRequestException({
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }
    const session = await this.prismaService.authSession.create({
      data: { userId: user.id },
    });
    return { sessionId: session.id, profile: user };
  }
}
