
import {OpWorkFrequency,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkSavedSearchDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
name!: string ;
@ApiProperty({
  type: 'string',
})
query!: string ;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
filters!: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isActive!: boolean  | null;
@ApiProperty({
  enum: OpWorkFrequency,
  enumName: 'OpWorkFrequency',
  nullable: true,
})
frequency!: OpWorkFrequency  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastSentAt!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt!: Date ;
}
