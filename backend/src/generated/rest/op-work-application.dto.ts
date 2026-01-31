import { OpWorkApplicationStatus } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OpWorkApplicationDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  coverLetter!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  resumeUrl!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  portfolioUrl!: string | null;
  @ApiProperty({
    enum: OpWorkApplicationStatus,
    enumName: 'OpWorkApplicationStatus',
  })
  status!: OpWorkApplicationStatus;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  statusNotes!: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  appliedAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  statusUpdatedAt!: Date | null;
}
