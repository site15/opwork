
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
jobId!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
skillId!: string ;
  }

@ApiExtraModels(OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto)
export class ConnectOpWorkJobSkillDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto)
uqOpWorkJobSkill?: OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto ;
}
