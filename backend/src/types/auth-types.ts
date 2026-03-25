import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { AuthUser } from '../generated/rest/auth-user.entity';

// Enums
export const UserType = {
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER',
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

// Sign-in DTOs
export class SignInResponse {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID('4')
  sessionId!: string;

  @ApiProperty({ type: () => AuthUser })
  profile!: AuthUser;
}

export class SignInArgs {
  @ApiProperty({
    type: 'string',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    type: 'string',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  password!: string;

  @ApiPropertyOptional({
    enum: UserType,
    enumName: 'UserType',
  })
  @IsOptional()
  userType?: UserType;
}

// Sign-up DTOs

export class SignUpResponse {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID('4')
  sessionId!: string;

  @ApiProperty({ type: () => AuthUser })
  profile!: AuthUser;
}

export class SignUpArgs {
  @ApiProperty({
    type: 'string',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    type: 'string',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    enum: UserType,
    enumName: 'UserType',
    required: true,
  })
  @IsNotEmpty()
  userType!: UserType;
}

// Change password DTOs
export class ChangePasswordArgs {
  @ApiProperty({
    type: 'string',
    description: 'Current password for verification',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  @IsString()
  currentPassword!: string;

  @ApiProperty({
    type: 'string',
    description: 'New password to set',
    minLength: 6,
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword!: string;
}

// Change email DTOs
export class ChangeEmailArgs {
  @ApiProperty({
    type: 'string',
    description: 'New email address',
  })
  @Transform((p) => (p.value ? p.value.trim() : p.value))
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  newEmail!: string;
}
