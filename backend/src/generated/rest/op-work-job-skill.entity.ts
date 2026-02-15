
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkJob} from './op-work-job.entity'
import {OpWorkSkill} from './op-work-skill.entity'


export class OpWorkJobSkill {
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
})
skillId!: string ;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isRequired!: boolean  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
importance!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
minLevel!: number  | null;
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
  type: () => OpWorkJob,
  required: false,
})
OpWorkJob?: OpWorkJob ;
@ApiProperty({
  type: () => OpWorkSkill,
  required: false,
})
OpWorkSkill?: OpWorkSkill ;
}
