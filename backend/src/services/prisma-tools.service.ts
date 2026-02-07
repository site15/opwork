import { Injectable, Logger } from '@nestjs/common';
import { basename } from 'path';

export enum DatabaseErrorEnum {
  COMMON = 'DB-000',
  UNHANDLED_ERROR = 'DB-001',
  UNIQUE_ERROR = 'DB-002',
  INVALID_IDENTIFIER = 'DB-003',
  INVALID_LINKED_TABLE_IDENTIFIER = 'DB-004',
  DATABASE_QUERY_ERROR = 'DB-005',
  NOT_FOUND_ERROR = 'DB-006',
}

export const DATABASE_ERROR_ENUM_TITLES: Record<DatabaseErrorEnum, string> = {
  [DatabaseErrorEnum.COMMON]: 'Common db error',
  [DatabaseErrorEnum.UNHANDLED_ERROR]: 'Unhandled error',
  [DatabaseErrorEnum.UNIQUE_ERROR]: 'Unique error',
  [DatabaseErrorEnum.INVALID_IDENTIFIER]: 'Invalid identifier',
  [DatabaseErrorEnum.INVALID_LINKED_TABLE_IDENTIFIER]:
    'Invalid linked table identifier',
  [DatabaseErrorEnum.DATABASE_QUERY_ERROR]: 'Database query error',
  [DatabaseErrorEnum.NOT_FOUND_ERROR]: 'Not found error',
};

const ERROR_CODE_P2002 = 'P2002';
const ERROR_CODE_P2025 = 'P2025';
const ERROR_SUBSTRING_RECORD_NOT_FOUND = 'NotFoundError';
const ERROR_SUBSTRING_DELETE_RECORD_NOT_FOUND =
  'Record to delete does not exist';
const ERROR_SUBSTRING_UPDATE_RECORD_NOT_FOUND = 'Record to update not found';

@Injectable()
export class PrismaToolsService {
  private logger = new Logger(PrismaToolsService.name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertPrismaErrorToDbError(exception: any) {
    try {
      const stacktrace = String(exception?.stack || exception)
        ?.split(`${__dirname}/webpack:/${basename(__dirname)}/`)
        ?.join('');
      const originalError = Object.assign(new Error(), { stack: stacktrace });

      if (
        String(exception?.name).startsWith('PrismaClient') ||
        String(exception?.code).startsWith('P')
      ) {
        if (exception?.code === 'P2002') {
          return {
            message: DATABASE_ERROR_ENUM_TITLES[DatabaseErrorEnum.UNIQUE_ERROR],
            stacktrace,
            code: DatabaseErrorEnum.UNIQUE_ERROR,
            metadata: exception?.meta,
            originalError,
          };
        }

        if (exception?.code === 'P2025') {
          if (exception.meta?.['cause'] === 'Record to update not found.') {
            return {
              message:
                DATABASE_ERROR_ENUM_TITLES[
                  DatabaseErrorEnum.INVALID_IDENTIFIER
                ],
              stacktrace,
              code: DatabaseErrorEnum.INVALID_IDENTIFIER,
              metadata: exception?.meta,
              originalError,
            };
          }
          const relatedTable = exception.meta?.['cause']?.split(`'`)?.[1];
          if (relatedTable && exception.meta?.['modelName']) {
            this.logger.debug({
              modelName: exception.meta?.['modelName'],
              relatedTable,
            });
          }

          return {
            message:
              DATABASE_ERROR_ENUM_TITLES[
                DatabaseErrorEnum.INVALID_LINKED_TABLE_IDENTIFIER
              ],
            stacktrace,
            code: DatabaseErrorEnum.INVALID_LINKED_TABLE_IDENTIFIER,
            metadata: exception?.meta,
            originalError,
          };
        }

        this.logger.error(exception, exception.stack);

        return {
          message:
            DATABASE_ERROR_ENUM_TITLES[DatabaseErrorEnum.DATABASE_QUERY_ERROR],
          stacktrace,
          code: DatabaseErrorEnum.DATABASE_QUERY_ERROR,
          metadata: exception?.meta,
          originalError,
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err, err.stack);
      return {
        message: DATABASE_ERROR_ENUM_TITLES[DatabaseErrorEnum.UNHANDLED_ERROR],
        code: DatabaseErrorEnum.UNHANDLED_ERROR,
        metadata: exception?.meta,
      };
    }
    return null;
  }

  isErrorOfRecordNotFound(err: Error): boolean {
    let str: string;
    try {
      str = JSON.stringify(err);
    } catch (error) {
      str = String(err);
    }
    return (
      String(str).includes(ERROR_SUBSTRING_RECORD_NOT_FOUND) ||
      String(str).includes(ERROR_CODE_P2025) ||
      String(str).includes(ERROR_SUBSTRING_DELETE_RECORD_NOT_FOUND) ||
      String(str).includes(ERROR_SUBSTRING_UPDATE_RECORD_NOT_FOUND)
    );
  }

  isErrorOfUniqueField<T>(
    prismaError:
      | { code: string; meta: { target: string[] } }
      | { code: string; meta: { cause: { fields: string[] } } },
    field: keyof T,
    error: any,
    defaultError: any = null,
  ) {
    return prismaError.code === ERROR_CODE_P2002 &&
      this.getErrorFields(prismaError).includes(field as string)
      ? error
      : defaultError;
  }

  private getErrorFields(
    prismaError:
      | { code: string; meta: { target: string[] } }
      | { code: string; meta: { cause: { fields: string[] } } }
      | {
          code: string;
          meta: { driverAdapterError: { cause: { fields: string[] } } };
        },
  ) {
    // default behavior
    if ('target' in prismaError.meta) {
      return (
        prismaError.meta?.target.map((field) =>
          field.replace(new RegExp('"', 'ig'), ''),
        ) || []
      );
    }

    // previewFeatures: ['queryCompiler', 'driverAdapters']
    if ('driverAdapterError' in prismaError.meta) {
      return (
        prismaError.meta?.driverAdapterError?.cause?.fields.map((field) =>
          field.replace(new RegExp('"', 'ig'), ''),
        ) || []
      );
    }
    return (
      prismaError.meta?.cause?.fields.map((field) =>
        field.replace(new RegExp('"', 'ig'), ''),
      ) || []
    );
  }

  isErrorOfUniqueFields<T>(
    prismaError: { code: string; meta: { target: string[] } },
    fields: (keyof T)[],
    error: any,
    defaultError: any = null,
  ) {
    return prismaError.code === ERROR_CODE_P2002 &&
      fields.filter((field) =>
        this.getErrorFields(prismaError).includes(field as string),
      ).length === fields.length
      ? error
      : defaultError;
  }

  isErrorsOfUniqueField<T>(
    prismaError: { code: string; meta: { target: string[] } },
    errors: {
      field: keyof T;
      error: any;
    }[],
  ) {
    const firstError = errors.find((error) =>
      this.isErrorOfUniqueField<T>(prismaError, error.field, true),
    );

    return firstError
      ? this.isErrorOfUniqueField<T>(
          prismaError,
          firstError.field,
          firstError.error,
        )
      : prismaError;
  }
}
