
import {OpWorkSkillLevel} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkJobSeekerSkillDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  enum: OpWorkSkillLevel,
  enumName: 'OpWorkSkillLevel',
  nullable: true,
})
level!: OpWorkSkillLevel  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
yearsOfExp!: number  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isPrimary!: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastUsed!: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
}
