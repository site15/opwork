
import {OpWorkProfileType,OpWorkUserType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEnum,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkProfileDto {
  @ApiProperty({
  enum: OpWorkProfileType,
  enumName: 'OpWorkProfileType',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkProfileType)
type?: OpWorkProfileType ;
@ApiProperty({
  enum: OpWorkUserType,
  enumName: 'OpWorkUserType',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkUserType)
userType?: OpWorkUserType ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
title?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
description?: string  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isEmailVerified?: boolean  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
email?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
phone?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
website?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
location?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
avatarUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
coverImage?: string  | null;
}
