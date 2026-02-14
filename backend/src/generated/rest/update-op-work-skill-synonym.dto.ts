
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

export class UpdateOpWorkSkillSynonymOpWorkSkillRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkSkillDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkSkillDto)
connect!: ConnectOpWorkSkillDto ;
  }

@ApiExtraModels(ConnectOpWorkSkillDto,UpdateOpWorkSkillSynonymOpWorkSkillRelationInputDto)
export class UpdateOpWorkSkillSynonymDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
synonym?: string ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkSkillSynonymOpWorkSkillRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkSkillSynonymOpWorkSkillRelationInputDto)
OpWorkSkill?: UpdateOpWorkSkillSynonymOpWorkSkillRelationInputDto ;
}
