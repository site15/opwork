import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CheckOpWorkUserType } from '../decorators/check-op-work-user-type';
import { SkipCheckAuth } from '../decorators/skip-check-auth';
import { AuthError, AuthErrorEnum } from '../errors/auth.errors';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';
import { getClientIp } from '../utils/request-ip';

export const X_API_KEY_HEADER_NAME = 'x-api-key';
export const X_SESSION_ID_HEADER_NAME = 'x-session-id';
export const X_PROFILE_ID_HEADER_NAME = 'x-profile-id';
export const DEFAULT_ALLOWED_IPS = ['127.0.0.1', '192.168.168.1', '::1'];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getRequestFromExecutionContext(context) as AppRequest;
    const method = req.method;

    const skipCheckAuth = !!this.reflector.getAllAndOverride(SkipCheckAuth, [
      context.getHandler(),
      context.getClass(),
    ]);
    const checkOpWorkUserType = this.reflector.getAllAndOverride(
      CheckOpWorkUserType,
      [context.getHandler(), context.getClass()],
    );

    // List of allowed IP addresses for security filtering
    const ALLOWED_IPS = process.env.ALLOWED_IPS
      ? [...(process.env.ALLOWED_IPS?.split(',') || [])]
      : [...DEFAULT_ALLOWED_IPS];

    req.userIp =
      process.env.CHECK_IP === 'true' ? getClientIp(req as any) : '127.0.0.1';
    req.apiKey = req.headers[X_API_KEY_HEADER_NAME];
    req.sessionId = req.headers[X_SESSION_ID_HEADER_NAME];
    req.profileId = req.headers[X_PROFILE_ID_HEADER_NAME];

    if (!req.userIp || !ALLOWED_IPS.includes(req.userIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        userIp: req.userIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new AuthError(AuthErrorEnum.FORBIDDEN_IP);
    }

    if (!req.userId && req.apiKey) {
      const apiKey = await this.prismaService.authApiKey.findFirst({
        include: { AuthUser: { include: { OpWorkProfile: true } } },
        where: { apiKey: req.apiKey },
      });
      if (apiKey?.apiKey) {
        req.apiKey = apiKey.apiKey;
      }

      if (apiKey && apiKey.AuthUser) {
        req.userId = apiKey.AuthUser.id;
        req.user = apiKey.AuthUser;
      }

      if (!req.userId && apiKey && !apiKey.isActive && !skipCheckAuth) {
        throw new AuthError(AuthErrorEnum.API_KEY_NOT_ACTIVE);
      }
    }

    if (!req.userId && req.sessionId) {
      const session = await this.prismaService.authSession.findFirst({
        include: { AuthUser: { include: { OpWorkProfile: true } } },
        where: { id: req.sessionId },
      });
      if (session && session.AuthUser) {
        req.userId = session.AuthUser.id;
        req.user = session.AuthUser;
      }

      if (!req.userId && session && !session.isActive && !skipCheckAuth) {
        throw new AuthError(AuthErrorEnum.SESSION_NOT_ACTIVE);
      }
    }

    if (!req.userId && !req.apiKey && !req.sessionId && !skipCheckAuth) {
      throw new AuthError(AuthErrorEnum.UNAUTHORIZED);
    }

    if (
      req.profileId ||
      (!req.profileId && req.user?.OpWorkProfile.length > 0)
    ) {
      const profile =
        req.user?.OpWorkProfile.find((p) => p.id === req.profileId) ||
        req.user?.OpWorkProfile[0];
      if (!profile) {
        throw new AuthError(AuthErrorEnum.PROFILE_NOT_FOUND);
      }
      req.profileId = profile.id;
      req.profile = profile;
    }

    if (
      checkOpWorkUserType?.some(
        (type) =>
          type.method === req.method &&
          !(
            Array.isArray(type.userTypes) ? type.userTypes : [type.userTypes]
          ).find((userType) => req.profile?.userType === userType),
      )
    ) {
      throw new AuthError(AuthErrorEnum.METHOD_NOT_ALLOWED);
    }

    if (!req.userId && !skipCheckAuth) {
      throw new AuthError(AuthErrorEnum.UNAUTHORIZED);
    }

    return true;
  }
}
