import { ApiProperty } from '@nestjs/swagger';
import { OpWorkProfile } from './op-work-profile.entity';
import { OpWorkJob } from './op-work-job.entity';

export class OpWorkJobView {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  profileId!: string | null;
  @ApiProperty({
    type: 'string',
  })
  jobId!: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  viewedAt!: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  ipAddress!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  userAgent!: string | null;
  @ApiProperty({
    type: () => OpWorkProfile,
    required: false,
    nullable: true,
  })
  OpWorkProfile?: OpWorkProfile | null;
  @ApiProperty({
    type: () => OpWorkJob,
    required: false,
  })
  OpWorkJob?: OpWorkJob;
}
