
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsInt,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

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

@ApiExtraModels(ConnectOpWorkJobDto,CreateOpWorkJobSkillOpWorkJobRelationInputDto,ConnectOpWorkSkillDto,CreateOpWorkJobSkillOpWorkSkillRelationInputDto)
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
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
importance!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
minLevel?: number  | null;
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
