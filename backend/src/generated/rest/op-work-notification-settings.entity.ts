import { OpWorkFrequency } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { OpWorkProfile } from './op-work-profile.entity';

export class OpWorkNotificationSettings {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  profileId!: string;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  emailApplicationUpdates!: boolean | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  emailJobAlerts!: boolean | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  emailNewsletter!: boolean | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  pushApplicationUpdates!: boolean | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  pushJobAlerts!: boolean | null;
  @ApiProperty({
    enum: OpWorkFrequency,
    enumName: 'OpWorkFrequency',
    nullable: true,
  })
  jobAlertFrequency!: OpWorkFrequency | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
  @ApiProperty({
    type: () => OpWorkProfile,
    required: false,
  })
  OpWorkProfile?: OpWorkProfile;
}
