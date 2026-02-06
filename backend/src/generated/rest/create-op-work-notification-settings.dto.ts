
import {OpWorkFrequency} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEnum,IsOptional} from 'class-validator'




export class CreateOpWorkNotificationSettingsDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailApplicationUpdates?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailJobAlerts?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
emailNewsletter?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
pushApplicationUpdates?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
pushJobAlerts?: boolean  | null;
@ApiProperty({
  enum: OpWorkFrequency,
  enumName: 'OpWorkFrequency',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkFrequency)
jobAlertFrequency?: OpWorkFrequency  | null;
}
