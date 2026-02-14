import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaToolsService } from '../services/prisma-tools.service';
import { AuthError } from '../errors/auth.errors';

@Catch()
export class AppExceptionsFilter extends BaseExceptionFilter {
  private logger = new Logger(AppExceptionsFilter.name);
  constructor(private readonly prismaToolsService: PrismaToolsService) {
    super();
  }

  override catch(exception: HttpException | Error, host: ArgumentsHost) {
    const parsedException =
      this.prismaToolsService.convertPrismaErrorToDbError(exception);
    if (parsedException) {
      super.catch(
        new HttpException(parsedException, HttpStatus.BAD_REQUEST),
        host,
      );
    } else {
      if (exception instanceof AuthError) {
        this.logger.error(exception, exception.stack);
        super.catch(
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
        super.catch(exception, host);
      } else {
        this.logger.error(exception, exception.stack);
        super.catch(
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
