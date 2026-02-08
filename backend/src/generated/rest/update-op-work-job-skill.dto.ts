
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsInt,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

export class UpdateOpWorkJobSkillOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }
export class UpdateOpWorkJobSkillOpWorkSkillRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkSkillDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkSkillDto)
connect!: ConnectOpWorkSkillDto ;
  }

@ApiExtraModels(ConnectOpWorkJobDto,UpdateOpWorkJobSkillOpWorkJobRelationInputDto,ConnectOpWorkSkillDto,UpdateOpWorkJobSkillOpWorkSkillRelationInputDto)
export class UpdateOpWorkJobSkillDto {
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
  required: false,
})
@IsOptional()
@IsInt()
importance?: number ;
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
  required: false,
  type: UpdateOpWorkJobSkillOpWorkJobRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobSkillOpWorkJobRelationInputDto)
OpWorkJob?: UpdateOpWorkJobSkillOpWorkJobRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkJobSkillOpWorkSkillRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobSkillOpWorkSkillRelationInputDto)
OpWorkSkill?: UpdateOpWorkJobSkillOpWorkSkillRelationInputDto ;
}
