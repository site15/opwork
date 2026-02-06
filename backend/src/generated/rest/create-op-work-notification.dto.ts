
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString} from 'class-validator'




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
}
