
import {OpWorkSkillType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsInt,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkSkillOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkSkillOpWorkProfileRelationInputDto)
export class CreateOpWorkSkillDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
name!: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(4000)
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
})
@IsNotEmpty()
@IsInt()
popularity!: number ;
@ApiProperty({
  required: false,
  type: CreateOpWorkSkillOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => CreateOpWorkSkillOpWorkProfileRelationInputDto)
OpWorkProfile?: CreateOpWorkSkillOpWorkProfileRelationInputDto ;
}
