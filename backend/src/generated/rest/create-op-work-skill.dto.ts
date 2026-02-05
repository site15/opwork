
import {OpWorkSkillType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkSkillDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
name!: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
description?: string  | null;
@ApiProperty({
  enum: OpWorkSkillType,
  enumName: 'OpWorkSkillType',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkSkillType)
type?: OpWorkSkillType  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
category?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
icon?: string  | null;
}
