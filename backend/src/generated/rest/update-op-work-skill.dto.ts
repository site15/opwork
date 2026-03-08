
import {OpWorkSkillType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsInt,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class UpdateOpWorkSkillOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkSkillOpWorkProfileRelationInputDto)
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
  required: false,
})
@IsOptional()
@IsInt()
popularity?: number ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkSkillOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkSkillOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkSkillOpWorkProfileRelationInputDto ;
}
