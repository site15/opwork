
import {OpWorkEmploymentType,OpWorkExperienceLevel,OpWorkJobStatus} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsInt,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkEmployerDto} from './connect-op-work-employer.dto'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkJobOpWorkEmployerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkEmployerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkEmployerDto)
connect!: ConnectOpWorkEmployerDto ;
  }
export class CreateOpWorkJobOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkEmployerDto,CreateOpWorkJobOpWorkEmployerRelationInputDto,ConnectOpWorkProfileDto,CreateOpWorkJobOpWorkProfileRelationInputDto)
export class CreateOpWorkJobDto {
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
@MaxLength(6000)
description!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(4000)
requirements!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(6000)
responsibilities!: string ;
@ApiProperty({
  enum: OpWorkEmploymentType,
  enumName: 'OpWorkEmploymentType',
})
@IsNotEmpty()
@IsEnum(OpWorkEmploymentType)
employmentType!: OpWorkEmploymentType ;
@ApiProperty({
  enum: OpWorkExperienceLevel,
  enumName: 'OpWorkExperienceLevel',
})
@IsNotEmpty()
@IsEnum(OpWorkExperienceLevel)
experienceLevel!: OpWorkExperienceLevel ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
department?: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
salaryMin?: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
salaryMax?: number  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(3)
salaryCurrency?: string  | null;
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
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isRemote?: boolean  | null;
@ApiProperty({
  enum: OpWorkJobStatus,
  enumName: 'OpWorkJobStatus',
})
@IsNotEmpty()
@IsEnum(OpWorkJobStatus)
status!: OpWorkJobStatus ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
viewsCount!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
applicationsCount!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
savesCount!: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
publishedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
expiresAt?: Date  | null;
@ApiProperty({
  type: CreateOpWorkJobOpWorkEmployerRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobOpWorkEmployerRelationInputDto)
OpWorkEmployer!: CreateOpWorkJobOpWorkEmployerRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkJobOpWorkProfileRelationInputDto ;
}
