
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkNotificationAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }
export class CreateOpWorkNotificationOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,CreateOpWorkNotificationAuthUserRelationInputDto,ConnectOpWorkProfileDto,CreateOpWorkNotificationOpWorkProfileRelationInputDto)
export class CreateOpWorkNotificationDto {
  @ApiProperty({
  enum: OpWorkNotificationType,
  enumName: 'OpWorkNotificationType',
})
@IsNotEmpty()
@IsEnum(OpWorkNotificationType)
type!: OpWorkNotificationType ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
title!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
message!: string ;
@ApiProperty({
  type: () => Object,
  required: false,
  nullable: true,
})
@IsOptional()
data?: Prisma.InputJsonValue  | Prisma.NullableJsonNullValueInput;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isRead?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isArchived?: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
readAt?: Date  | null;
@ApiProperty({
  type: CreateOpWorkNotificationAuthUserRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkNotificationAuthUserRelationInputDto)
AuthUser!: CreateOpWorkNotificationAuthUserRelationInputDto ;
@ApiProperty({
  required: false,
  type: CreateOpWorkNotificationOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => CreateOpWorkNotificationOpWorkProfileRelationInputDto)
OpWorkProfile?: CreateOpWorkNotificationOpWorkProfileRelationInputDto ;
}
