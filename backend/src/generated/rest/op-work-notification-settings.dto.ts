import { OpWorkFrequency } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OpWorkNotificationSettingsDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
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
}
