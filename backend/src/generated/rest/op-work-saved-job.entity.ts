
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkJob} from './op-work-job.entity'


export class OpWorkSavedJob {
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
jobId!: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
savedAt!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
notes!: string  | null;
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
