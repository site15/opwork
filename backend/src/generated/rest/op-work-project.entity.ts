
import {OpWorkProjectStatus,OpWorkProjectType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'


export class OpWorkProject {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
profileId!: string  | null;
@ApiProperty({
  type: 'string',
})
title!: string ;
@ApiProperty({
  type: 'string',
})
description!: string ;
@ApiProperty({
  enum: OpWorkProjectStatus,
  enumName: 'OpWorkProjectStatus',
  nullable: true,
})
status!: OpWorkProjectStatus  | null;
@ApiProperty({
  enum: OpWorkProjectType,
  enumName: 'OpWorkProjectType',
  nullable: true,
})
type!: OpWorkProjectType  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
githubRepoUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
technologies!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
architecture!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
plannedDatesDescription!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
plannedStartDate!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
plannedEndDate!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
implementationDescription!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
actualStartDate!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
developmentStart!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
testingStart!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
launchDescription!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
launchDate!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
goLiveDate!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
completionDescription!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
actualEndDate!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
completionDate!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
maintenanceDescription!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
maintenanceStart!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
maintenanceEnd!: Date  | null;
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
  type: () => OpWorkProfile,
  required: false,
  nullable: true,
})
OpWorkProfile?: OpWorkProfile  | null;
}
