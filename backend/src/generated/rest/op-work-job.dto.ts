
import {OpWorkEmploymentType,OpWorkExperienceLevel,OpWorkJobStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkJobDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
title!: string ;
@ApiProperty({
  type: 'string',
})
description!: string ;
@ApiProperty({
  type: 'string',
})
requirements!: string ;
@ApiProperty({
  type: 'string',
})
responsibilities!: string ;
@ApiProperty({
  enum: OpWorkEmploymentType,
  enumName: 'OpWorkEmploymentType',
})
employmentType!: OpWorkEmploymentType ;
@ApiProperty({
  enum: OpWorkExperienceLevel,
  enumName: 'OpWorkExperienceLevel',
})
experienceLevel!: OpWorkExperienceLevel ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
department!: string  | null;
@ApiProperty({
  type: 'number',
  format: 'float',
  nullable: true,
})
salaryMin!: number  | null;
@ApiProperty({
  type: 'number',
  format: 'float',
  nullable: true,
})
salaryMax!: number  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
salaryCurrency!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
location!: string  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isRemote!: boolean  | null;
@ApiProperty({
  enum: OpWorkJobStatus,
  enumName: 'OpWorkJobStatus',
})
status!: OpWorkJobStatus ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
viewsCount!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
applicationsCount!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
savesCount!: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
publishedAt!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
expiresAt!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt!: Date ;
}
