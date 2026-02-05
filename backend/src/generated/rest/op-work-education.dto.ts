
import {OpWorkEducationDegree,OpWorkGrade} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkEducationDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
institution!: string ;
@ApiProperty({
  enum: OpWorkEducationDegree,
  enumName: 'OpWorkEducationDegree',
  nullable: true,
})
degree!: OpWorkEducationDegree  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
fieldOfStudy!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
startDate!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
endDate!: Date  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isCurrent!: boolean  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  enum: OpWorkGrade,
  enumName: 'OpWorkGrade',
  nullable: true,
})
grade!: OpWorkGrade  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
}
