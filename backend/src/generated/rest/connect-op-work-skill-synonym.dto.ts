
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
skillId!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
synonym!: string ;
  }

@ApiExtraModels(OpWorkSkillSynonymUqOpWorkSkillSynonymUniqueInputDto)
export class ConnectOpWorkSkillSynonymDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
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
