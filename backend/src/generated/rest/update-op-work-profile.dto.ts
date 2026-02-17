
import {OpWorkProfileType,OpWorkUserType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEmail,IsEnum,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'

export class UpdateOpWorkProfileAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,UpdateOpWorkProfileAuthUserRelationInputDto)
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
@MaxLength(255)
title?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(6000)
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
@IsEmail()
@MaxLength(255)
email?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(50)
phone?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
website?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
location?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
avatarUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
coverImage?: string  | null;
@ApiProperty({
  required: false,
  type: UpdateOpWorkProfileAuthUserRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkProfileAuthUserRelationInputDto)
AuthUser?: UpdateOpWorkProfileAuthUserRelationInputDto ;
}
