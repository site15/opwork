
import {OpWorkApplicationStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkJobSeeker} from './op-work-job-seeker.entity'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkJob} from './op-work-job.entity'


export class OpWorkApplication {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
jobSeekerId!: string ;
@ApiProperty({
  type: 'string',
})
profileId!: string ;
@ApiProperty({
  type: 'string',
})
jobId!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
coverLetter!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
resumeUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
portfolioUrl!: string  | null;
@ApiProperty({
  enum: OpWorkApplicationStatus,
  enumName: 'OpWorkApplicationStatus',
})
status!: OpWorkApplicationStatus ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
statusNotes!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
appliedAt!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
statusUpdatedAt!: Date  | null;
@ApiProperty({
  type: () => OpWorkJobSeeker,
  required: false,
})
OpWorkJobSeeker?: OpWorkJobSeeker ;
@ApiProperty({
  type: () => OpWorkProfile,
  required: false,
})
OpWorkProfile?: OpWorkProfile ;
@ApiProperty({
  type: () => OpWorkJob,
  required: false,
})
OpWorkJob?: OpWorkJob ;
}
