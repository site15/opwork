import { ApiProperty } from '@nestjs/swagger';
import { OpWorkSkill } from './op-work-skill.entity';

export class OpWorkSkillSynonym {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  skillId!: string;
  @ApiProperty({
    type: 'string',
  })
  synonym!: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: () => OpWorkSkill,
    required: false,
  })
  OpWorkSkill?: OpWorkSkill;
}
