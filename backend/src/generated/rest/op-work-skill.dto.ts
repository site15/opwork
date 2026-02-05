
import {OpWorkSkillType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkSkillDto {
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
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  enum: OpWorkSkillType,
  enumName: 'OpWorkSkillType',
  nullable: true,
})
type!: OpWorkSkillType  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
category!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
icon!: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
popularity!: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
}
