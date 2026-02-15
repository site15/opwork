
import {OpWorkEmploymentType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkJobSeeker} from './op-work-job-seeker.entity'


export class OpWorkExperience {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
profileId!: string ;
@ApiProperty({
  type: 'string',
})
jobSeekerId!: string ;
@ApiProperty({
  type: 'string',
})
company!: string ;
@ApiProperty({
  type: 'string',
})
position!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
startDate!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
endDate!: Date  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isCurrent!: boolean  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
location!: string  | null;
@ApiProperty({
  enum: OpWorkEmploymentType,
  enumName: 'OpWorkEmploymentType',
  nullable: true,
})
employmentType!: OpWorkEmploymentType  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: () => OpWorkProfile,
  required: false,
})
OpWorkProfile?: OpWorkProfile ;
@ApiProperty({
  type: () => OpWorkJobSeeker,
  required: false,
})
OpWorkJobSeeker?: OpWorkJobSeeker ;
}
