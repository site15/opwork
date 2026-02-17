
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkNotificationOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkNotificationOpWorkProfileRelationInputDto)
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
@MaxLength(255)
title!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(4000)
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
  required: false,
  type: CreateOpWorkNotificationOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => CreateOpWorkNotificationOpWorkProfileRelationInputDto)
OpWorkProfile?: CreateOpWorkNotificationOpWorkProfileRelationInputDto ;
}
