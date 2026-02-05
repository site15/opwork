
import {OpWorkSkillType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkJobSeekerSkill} from './op-work-job-seeker-skill.entity'
import {OpWorkJobSkill} from './op-work-job-skill.entity'
import {OpWorkSkillSynonym} from './op-work-skill-synonym.entity'


export class OpWorkSkill {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
name!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  enum: OpWorkSkillType,
  enumName: 'OpWorkSkillType',
  nullable: true,
})
type!: OpWorkSkillType  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
category!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
icon!: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
popularity!: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: () => OpWorkJobSeekerSkill,
  isArray: true,
  required: false,
})
OpWorkJobSeekerSkill?: OpWorkJobSeekerSkill[] ;
@ApiProperty({
  type: () => OpWorkJobSkill,
  isArray: true,
  required: false,
})
OpWorkJobSkill?: OpWorkJobSkill[] ;
@ApiProperty({
  type: () => OpWorkSkillSynonym,
  isArray: true,
  required: false,
})
opWorkSkillSynonyms?: OpWorkSkillSynonym[] ;
}
