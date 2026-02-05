
import {OpWorkEmploymentType,OpWorkExperienceLevel} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsInt,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkJobDto {
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
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
requirements?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
responsibilities?: string ;
@ApiProperty({
  enum: OpWorkEmploymentType,
  enumName: 'OpWorkEmploymentType',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkEmploymentType)
employmentType?: OpWorkEmploymentType ;
@ApiProperty({
  enum: OpWorkExperienceLevel,
  enumName: 'OpWorkExperienceLevel',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkExperienceLevel)
experienceLevel?: OpWorkExperienceLevel ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
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
  default: 'USD',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
salaryCurrency?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
location?: string  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isRemote?: boolean  | null;
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
}
