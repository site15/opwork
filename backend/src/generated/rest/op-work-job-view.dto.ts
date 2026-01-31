import { ApiProperty } from '@nestjs/swagger';

export class OpWorkJobViewDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
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
}
