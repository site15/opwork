
import {OpWorkSkillLevel} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkJobSeeker} from './op-work-job-seeker.entity'
import {OpWorkSkill} from './op-work-skill.entity'


export class OpWorkJobSeekerSkill {
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
skillId!: string ;
@ApiProperty({
  enum: OpWorkSkillLevel,
  enumName: 'OpWorkSkillLevel',
  nullable: true,
})
level!: OpWorkSkillLevel  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
yearsOfExp!: number  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isPrimary!: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastUsed!: Date  | null;
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
@ApiProperty({
  type: () => OpWorkSkill,
  required: false,
})
OpWorkSkill?: OpWorkSkill ;
}
