
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDate,IsDateString,IsEnum,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class UpdateOpWorkNotificationOpWorkProfileRelationInputDto {
    @ApiProperty({
  required: false,
  type: ConnectOpWorkProfileDto,
})
@IsOptional()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect?: ConnectOpWorkProfileDto ;
@ApiProperty({
  required: false,
  type: 'boolean',
})
@IsOptional()
@IsBoolean()
disconnect?: boolean ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkNotificationOpWorkProfileRelationInputDto)
export class UpdateOpWorkNotificationDto {
  @ApiProperty({
  enum: OpWorkNotificationType,
  enumName: 'OpWorkNotificationType',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkNotificationType)
type?: OpWorkNotificationType ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
title?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
message?: string ;
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
@IsDate()
readAt?: Date  | null;
@ApiProperty({
  required: false,
  type: UpdateOpWorkNotificationOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkNotificationOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkNotificationOpWorkProfileRelationInputDto ;
}
