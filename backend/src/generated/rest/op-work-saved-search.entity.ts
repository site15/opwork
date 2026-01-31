import { OpWorkFrequency, Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { OpWorkProfile } from './op-work-profile.entity';

export class OpWorkSavedSearch {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  profileId!: string;
  @ApiProperty({
    type: 'string',
  })
  name!: string;
  @ApiProperty({
    type: 'string',
  })
  query!: string;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  filters!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isActive!: boolean | null;
  @ApiProperty({
    enum: OpWorkFrequency,
    enumName: 'OpWorkFrequency',
    nullable: true,
  })
  frequency!: OpWorkFrequency | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastSentAt!: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
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
