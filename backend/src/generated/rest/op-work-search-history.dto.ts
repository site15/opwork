import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OpWorkSearchHistoryDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
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
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  resultsCount!: number | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  searchedAt!: Date;
}
