
import {OpWorkSkillType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsInt,IsOptional,IsString,IsUrl,MaxLength} from 'class-validator'




export class UpdateOpWorkSkillDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
name?: string ;
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
@MaxLength(255)
category?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
icon?: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
@IsOptional()
@IsInt()
popularity?: number ;
}
