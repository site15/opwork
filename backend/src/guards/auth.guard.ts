import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SkipCheckAuth } from '../decorators/skip-check-auth';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';
import { getClientIp } from '../utils/request-ip';

export const X_API_KEY_HEADER_NAME = 'x-api-key';
export const X_SESSION_ID_HEADER_NAME = 'x-session-id';
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
    const skipCheckAuth = this.reflector.getAllAndMerge(SkipCheckAuth, [
      context.getHandler(),
      context.getClass(),
    ]);

    req.userIp =
      process.env.CHECK_IP === 'true' ? getClientIp(req as any) : '127.0.0.1';

    if (req.headers[X_API_KEY_HEADER_NAME] && !skipCheckAuth.skipCheckApiKey) {
      const apiKey = await this.prismaService.authApiKey.findFirst({
        select: { AuthUser: true, isActive: true },
        where: { apiKey: req.headers[X_API_KEY_HEADER_NAME] },
      });
      if (apiKey && !apiKey.isActive) {
        throw new BadRequestException({
          code: 'API_KEY_NOT_ACTIVE',
          message: 'API key is not active',
        });
      }
      if (apiKey && apiKey.AuthUser) {
        req.userId = apiKey.AuthUser.id;
        req.user = apiKey.AuthUser;
        return true;
      } else {
        throw new BadRequestException({
          code: 'INVALID_API_KEY',
          message: 'Invalid API key',
        });
      }
    } else {
      if (
        !req.headers[X_SESSION_ID_HEADER_NAME] &&
        !skipCheckAuth.skipCheckSessionId
      ) {
        const session = await this.prismaService.authSession.findFirst({
          select: { id: true, AuthUser: true, isActive: true },
          where: { id: req.headers[X_SESSION_ID_HEADER_NAME] },
        });
        if (session && !session.isActive) {
          throw new BadRequestException({
            code: 'SESSION_NOT_ACTIVE',
            message: 'Session is not active',
          });
        }
        if (session && session.AuthUser) {
          req.sessionId = session.id;
          req.userId = session.AuthUser.id;
          req.user = session.AuthUser;
          return true;
        } else {
          throw new BadRequestException({
            code: 'INVALID_SESSION_ID',
            message: 'Invalid session ID',
          });
        }
      }
    }

    // List of allowed IP addresses for security filtering
    const ALLOWED_IPS = process.env.ALLOWED_IPS
      ? [...(process.env.ALLOWED_IPS?.split(',') || [])]
      : [...DEFAULT_ALLOWED_IPS];

    if (!req.userId) {
      throw new UnauthorizedException({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    }

    if (!req.userIp || !ALLOWED_IPS.includes(req.userIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        userIp: req.userIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new UnauthorizedException({
        code: 'FORBIDDEN_IP',
        message: 'Forbidden: IP address not allowed',
      });
    }

    return Array.isArray(skipCheckAuth) && skipCheckAuth.length === 0
      ? true
      : Object.keys(skipCheckAuth).length === 0;

    // const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    //
    // if (!authHeader) {
    //   return false;
    // }
    //
    // const token = authHeader.split(' ')[1];
    //
    // try {
    //   const decoded = this.jwtService.verify(token);
    //   request.user = decoded;
    //   return true;
    // } catch (error) {
    //   return false;
    // }
  }
}
