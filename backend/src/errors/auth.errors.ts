import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AuthErrorEnum {
  COMMON = 'AUTH_ERROR',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  API_KEY_NOT_ACTIVE = 'API_KEY_NOT_ACTIVE',
  SESSION_NOT_ACTIVE = 'SESSION_NOT_ACTIVE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN_IP = 'FORBIDDEN_IP',
  PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DISABLED = 'DISABLED',
}

export const AUTH_ERROR_ENUM_TITLES: Record<AuthErrorEnum, string> = {
  [AuthErrorEnum.COMMON]: 'Auth error',
  [AuthErrorEnum.ALREADY_EXISTS]: 'User already exists',
  [AuthErrorEnum.INVALID_CREDENTIALS]: 'Invalid credentials',
  [AuthErrorEnum.API_KEY_NOT_ACTIVE]: 'API key is not active',
  [AuthErrorEnum.SESSION_NOT_ACTIVE]: 'Session is not active',
  [AuthErrorEnum.UNAUTHORIZED]: 'Unauthorized',
  [AuthErrorEnum.FORBIDDEN_IP]: 'Forbidden: IP address not allowed',
  [AuthErrorEnum.PROFILE_NOT_FOUND]: 'Profile not found',
  [AuthErrorEnum.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [AuthErrorEnum.VALIDATION_ERROR]: 'Validation error',
  [AuthErrorEnum.DISABLED]: 'Disabled',
};

export class AuthError<T = unknown> extends Error {
  @ApiProperty({
    type: String,
    description: Object.entries(AUTH_ERROR_ENUM_TITLES)
      .map(([key, value]) => `${value} (${key})`)
      .join(', '),
    example: AUTH_ERROR_ENUM_TITLES[AuthErrorEnum.COMMON],
  })
  override message: string;

  @ApiProperty({
    enum: AuthErrorEnum,
    enumName: 'AuthErrorEnum',
    example: AuthErrorEnum.COMMON,
  })
  code = AuthErrorEnum.COMMON;

  @ApiPropertyOptional({ type: Object })
  metadata?: T;

  constructor(
    message?: string | AuthErrorEnum,
    code?: AuthErrorEnum,
    metadata?: T,
  ) {
    const messageAsCode = Boolean(
      message &&
      Object.values(AuthErrorEnum).includes(message as AuthErrorEnum),
    );
    const preparedCode = messageAsCode ? (message as AuthErrorEnum) : code;
    const preparedMessage =
      messageAsCode && preparedCode
        ? AUTH_ERROR_ENUM_TITLES[preparedCode]
        : message;

    code = preparedCode || AuthErrorEnum.COMMON;
    message = preparedMessage || AUTH_ERROR_ENUM_TITLES[code];

    super(message);

    this.code = code;
    this.message = message;
    this.metadata = metadata;
  }
}
