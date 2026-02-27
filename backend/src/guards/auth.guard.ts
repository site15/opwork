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

export const X_API_KEY = 'x-api-key';
export const X_SESSION_ID = 'x-session-id';
export const X_PROFILE_ID = 'x-profile-id';
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
    req.apiKey = req.headers[X_API_KEY];
    req.authSessionId = req.headers[X_SESSION_ID];
    req.opWorkProfileId = req.headers[X_PROFILE_ID];

    if (!req.userIp || !ALLOWED_IPS.includes(req.userIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        userIp: req.userIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new AuthError(AuthErrorEnum.FORBIDDEN_IP);
    }

    if (!req.authUserId && req.apiKey) {
      const apiKey = await this.prismaService.authApiKey.findFirst({
        include: { AuthUser: { include: { OpWorkProfile: true } } },
        where: { apiKey: req.apiKey },
      });
      if (apiKey?.apiKey) {
        req.apiKey = apiKey.apiKey;
      }

      if (apiKey && apiKey.AuthUser) {
        req.authUserId = apiKey.AuthUser.id;
        req.authUser = apiKey.AuthUser;
      }

      if (!req.authUserId && apiKey && !apiKey.isActive && !skipCheckAuth) {
        throw new AuthError(AuthErrorEnum.API_KEY_NOT_ACTIVE);
      }
    }

    if (!req.authUserId && req.authSessionId) {
      const authSession = await this.prismaService.authSession.findFirst({
        include: { AuthUser: { include: { OpWorkProfile: true } } },
        where: { id: req.authSessionId },
      });

      if (authSession && authSession.AuthUser) {
        req.authSession = authSession;
        req.authUserId = authSession.AuthUser.id;
        req.authUser = authSession.AuthUser;
      }

      if (
        !req.authUserId &&
        authSession &&
        !authSession.isActive &&
        !skipCheckAuth
      ) {
        throw new AuthError(AuthErrorEnum.SESSION_NOT_ACTIVE);
      }
    }

    if (
      !req.authUserId &&
      !req.apiKey &&
      !req.authSessionId &&
      !skipCheckAuth
    ) {
      throw new AuthError(AuthErrorEnum.UNAUTHORIZED);
    }

    if (
      req.opWorkProfileId ||
      (!req.opWorkProfileId && req.authUser?.OpWorkProfile.length > 0)
    ) {
      const profile =
        req.authUser?.OpWorkProfile.find((p) => p.id === req.opWorkProfileId) ||
        req.authUser?.OpWorkProfile[0];
      if (!profile) {
        throw new AuthError(AuthErrorEnum.PROFILE_NOT_FOUND);
      }
      req.opWorkProfileId = profile.id;
      req.opWorkProfile = profile;
    }

    if (
      checkOpWorkUserType?.some(
        (type) =>
          type.method === req.method &&
          !(
            Array.isArray(type.userTypes) ? type.userTypes : [type.userTypes]
          ).find((userType) => req.opWorkProfile?.userType === userType),
      )
    ) {
      throw new AuthError(AuthErrorEnum.METHOD_NOT_ALLOWED);
    }

    if (!req.authUserId && !skipCheckAuth) {
      throw new AuthError(AuthErrorEnum.UNAUTHORIZED);
    }

    return true;
  }
}
