import {
  ArgumentsHost,
  Catch,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaToolsService } from '../services/prisma-tools.service';
import { AuthError } from '../errors/auth.errors';
import { ValidationError } from '../utils/validation.errors';

@Catch()
export class AppExceptionsFilter extends BaseExceptionFilter {
  private logger = new Logger(AppExceptionsFilter.name);
  constructor(private readonly prismaToolsService: PrismaToolsService) {
    super();
  }

  override catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const route = `${request.method} ${request.url}`;

    this.logger.error(
      `[${route} -> ${exception instanceof Error ? exception.message : exception}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    const parsedException =
      this.prismaToolsService.convertPrismaErrorToDbError(exception);
    if (parsedException) {
      return super.catch(
        new HttpException(parsedException, HttpStatus.BAD_REQUEST),
        host,
      );
    } else {
      if (exception instanceof ValidationError) {
        this.logger.error(exception, exception.stack);
        super.catch(
          new HttpException(
            {
              code: 'VALIDATION_ERROR',
              errors: exception.errors,
            },
            HttpStatus.BAD_REQUEST,
          ),
          host,
        );
      }
      if (exception instanceof AuthError) {
        return super.catch(
          new HttpException(
            {
              code: exception.code,
              message: exception.message,
              metadata: exception.metadata,
            },
            HttpStatus.BAD_REQUEST,
          ),
          host,
        );
      }
      if (exception instanceof HttpException) {
        return super.catch(exception, host);
      } else {
        return super.catch(
          new HttpException(
            {
              code: 'ERROR',
              message: exception.message,
            },
            HttpStatus.BAD_REQUEST,
          ),
          host,
        );
      }
    }
  }
}
