
import {OpWorkSkillImportance,OpWorkSkillLevel} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEnum,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

export class CreateOpWorkJobSkillOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkJobSkillOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }
export class CreateOpWorkJobSkillOpWorkSkillRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkSkillDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkSkillDto)
connect!: ConnectOpWorkSkillDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkJobSkillOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,CreateOpWorkJobSkillOpWorkJobRelationInputDto,ConnectOpWorkSkillDto,CreateOpWorkJobSkillOpWorkSkillRelationInputDto)
export class CreateOpWorkJobSkillDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isRequired?: boolean  | null;
@ApiProperty({
  enum: OpWorkSkillImportance,
  enumName: 'OpWorkSkillImportance',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkSkillImportance)
importance?: OpWorkSkillImportance  | null;
@ApiProperty({
  enum: OpWorkSkillLevel,
  enumName: 'OpWorkSkillLevel',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkSkillLevel)
minLevel?: OpWorkSkillLevel  | null;
@ApiProperty({
  type: CreateOpWorkJobSkillOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobSkillOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkJobSkillOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobSkillOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobSkillOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkJobSkillOpWorkJobRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobSkillOpWorkSkillRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobSkillOpWorkSkillRelationInputDto)
OpWorkSkill!: CreateOpWorkJobSkillOpWorkSkillRelationInputDto ;
}
