
import {OpWorkProjectStatus,OpWorkProjectType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsEnum,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkProjectDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
title?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
description?: string ;
@ApiProperty({
  enum: OpWorkProjectStatus,
  enumName: 'OpWorkProjectStatus',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkProjectStatus)
status?: OpWorkProjectStatus  | null;
@ApiProperty({
  enum: OpWorkProjectType,
  enumName: 'OpWorkProjectType',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkProjectType)
type?: OpWorkProjectType  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
githubRepoUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
technologies?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
architecture?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
plannedDatesDescription?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
plannedStartDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
plannedEndDate?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
implementationDescription?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
actualStartDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
developmentStart?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
testingStart?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
launchDescription?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
launchDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
goLiveDate?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
completionDescription?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
actualEndDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
completionDate?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
maintenanceDescription?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
maintenanceStart?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
maintenanceEnd?: Date  | null;
}
