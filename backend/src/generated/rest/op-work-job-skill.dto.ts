import { ApiProperty } from '@nestjs/swagger';

export class OpWorkJobSkillDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isRequired!: boolean | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  importance!: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  minLevel!: number | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
}
