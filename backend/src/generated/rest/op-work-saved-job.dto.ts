import { ApiProperty } from '@nestjs/swagger';

export class OpWorkSavedJobDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  savedAt!: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  notes!: string | null;
}
