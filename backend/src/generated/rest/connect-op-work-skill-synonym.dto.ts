
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
skillId!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
synonym!: string ;
  }

@ApiExtraModels(OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto)
export class ConnectOpWorkSkillSynonymDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto)
uqOpWorkSkillSynonym?: OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto ;
}
