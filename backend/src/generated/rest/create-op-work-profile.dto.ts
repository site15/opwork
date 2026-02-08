
import {OpWorkProfileType,OpWorkUserType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEnum,IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'

export class CreateOpWorkProfileAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,CreateOpWorkProfileAuthUserRelationInputDto)
export class CreateOpWorkProfileDto {
  @ApiProperty({
  enum: OpWorkProfileType,
  enumName: 'OpWorkProfileType',
})
@IsNotEmpty()
@IsEnum(OpWorkProfileType)
type!: OpWorkProfileType ;
@ApiProperty({
  enum: OpWorkUserType,
  enumName: 'OpWorkUserType',
})
@IsNotEmpty()
@IsEnum(OpWorkUserType)
userType!: OpWorkUserType ;
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
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  type: 'boolean',
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
@ApiProperty({
  type: CreateOpWorkProfileAuthUserRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkProfileAuthUserRelationInputDto)
AuthUser!: CreateOpWorkProfileAuthUserRelationInputDto ;
}
