import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
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
  @IsUUID('4', { each: true })
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
    nullable: true,
  })
  @IsOptional()
  userType?: UserType;
}

// Sign-up DTOs

export class SignUpResponse {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID('4', { each: true })
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

  @ApiPropertyOptional({
    enum: UserType,
    enumName: 'UserType',
    nullable: true,
  })
  @IsOptional()
  userType?: UserType;
}
