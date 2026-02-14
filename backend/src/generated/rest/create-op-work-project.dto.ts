
import {OpWorkProjectStatus,OpWorkProjectType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDate,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkProjectOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkProjectOpWorkProfileRelationInputDto)
export class CreateOpWorkProjectDto {
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
description!: string ;
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
@IsUrl()
@MaxLength(512)
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
@IsDate()
plannedStartDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
@IsDate()
actualStartDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
developmentStart?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
@IsDate()
launchDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
@IsDate()
actualEndDate?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
@IsDate()
maintenanceStart?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
maintenanceEnd?: Date  | null;
@ApiProperty({
  type: CreateOpWorkProjectOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkProjectOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkProjectOpWorkProfileRelationInputDto ;
}
