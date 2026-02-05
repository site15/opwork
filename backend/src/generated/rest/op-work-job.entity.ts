
import {OpWorkEmploymentType,OpWorkExperienceLevel,OpWorkJobStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkEmployer} from './op-work-employer.entity'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkApplication} from './op-work-application.entity'
import {OpWorkJobSkill} from './op-work-job-skill.entity'
import {OpWorkSavedJob} from './op-work-saved-job.entity'
import {OpWorkJobView} from './op-work-job-view.entity'
import {OpWorkJobTag} from './op-work-job-tag.entity'


export class OpWorkJob {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
employerId!: string ;
@ApiProperty({
  type: 'string',
})
profileId!: string ;
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
  type: 'integer',
  format: 'int32',
  nullable: true,
})
salaryMin!: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
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
@ApiProperty({
  type: () => OpWorkEmployer,
  required: false,
})
OpWorkEmployer?: OpWorkEmployer ;
@ApiProperty({
  type: () => OpWorkProfile,
  required: false,
})
OpWorkProfile?: OpWorkProfile ;
@ApiProperty({
  type: () => OpWorkApplication,
  isArray: true,
  required: false,
})
OpWorkApplication?: OpWorkApplication[] ;
@ApiProperty({
  type: () => OpWorkJobSkill,
  isArray: true,
  required: false,
})
OpWorkJobSkill?: OpWorkJobSkill[] ;
@ApiProperty({
  type: () => OpWorkSavedJob,
  isArray: true,
  required: false,
})
OpWorkSavedJob?: OpWorkSavedJob[] ;
@ApiProperty({
  type: () => OpWorkJobView,
  isArray: true,
  required: false,
})
opWorkJobViews?: OpWorkJobView[] ;
@ApiProperty({
  type: () => OpWorkJobTag,
  isArray: true,
  required: false,
})
opWorkJobTags?: OpWorkJobTag[] ;
}
