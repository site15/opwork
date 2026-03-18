
import {OpWorkSkillImportance,OpWorkSkillLevel} from '../prisma/client'
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
  enum: OpWorkSkillImportance,
  enumName: 'OpWorkSkillImportance',
  nullable: true,
})
importance!: OpWorkSkillImportance  | null;
@ApiProperty({
  enum: OpWorkSkillLevel,
  enumName: 'OpWorkSkillLevel',
  nullable: true,
})
minLevel!: OpWorkSkillLevel  | null;
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
