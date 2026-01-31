import { ApiProperty } from '@nestjs/swagger';
import { OpWorkJobSeeker } from './op-work-job-seeker.entity';
import { OpWorkSkill } from './op-work-skill.entity';

export class OpWorkJobSeekerSkill {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  jobSeekerId!: string;
  @ApiProperty({
    type: 'string',
  })
  skillId!: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  level!: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  yearsOfExp!: number | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isPrimary!: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastUsed!: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: () => OpWorkJobSeeker,
    required: false,
  })
  OpWorkJobSeeker?: OpWorkJobSeeker;
  @ApiProperty({
    type: () => OpWorkSkill,
    required: false,
  })
  OpWorkSkill?: OpWorkSkill;
}
