
import {OpWorkEmploymentType,OpWorkExperienceLevel,OpWorkJobStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsInt,IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkJobDto {
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
description!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
requirements!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
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
}
