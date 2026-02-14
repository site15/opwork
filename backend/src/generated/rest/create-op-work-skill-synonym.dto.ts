
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

export class CreateOpWorkSkillSynonymOpWorkSkillRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkSkillDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkSkillDto)
connect!: ConnectOpWorkSkillDto ;
  }

@ApiExtraModels(ConnectOpWorkSkillDto,CreateOpWorkSkillSynonymOpWorkSkillRelationInputDto)
export class CreateOpWorkSkillSynonymDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
synonym!: string ;
@ApiProperty({
  type: CreateOpWorkSkillSynonymOpWorkSkillRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkSkillSynonymOpWorkSkillRelationInputDto)
OpWorkSkill!: CreateOpWorkSkillSynonymOpWorkSkillRelationInputDto ;
}
