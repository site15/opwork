
import {OpWorkSkillImportance,OpWorkSkillLevel} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkJobSkillDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isRequired!: boolean  | null;
@ApiProperty({
  enum: OpWorkSkillImportance,
  enumName: 'OpWorkSkillImportance',
  nullable: true,
})
importance!: OpWorkSkillImportance  | null;
@ApiProperty({
  enum: OpWorkSkillLevel,
  enumName: 'OpWorkSkillLevel',
  nullable: true,
})
minLevel!: OpWorkSkillLevel  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
}
