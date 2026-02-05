
import {OpWorkFrequency} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEnum,IsOptional} from 'class-validator'




export class UpdateOpWorkNotificationSettingsDto {
  @ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailApplicationUpdates?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailJobAlerts?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailNewsletter?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
pushApplicationUpdates?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
pushJobAlerts?: boolean  | null;
@ApiProperty({
  enum: OpWorkFrequency,
  enumName: 'OpWorkFrequency',
  default: 'DAILY',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkFrequency)
jobAlertFrequency?: OpWorkFrequency  | null;
}
