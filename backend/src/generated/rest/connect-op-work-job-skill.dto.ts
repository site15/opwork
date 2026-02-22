
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSkillUqOpWorkJobSkillUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
jobId!: string ;
@ApiProperty({
  type: 'string',
})
@IsUUID('4')
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
@IsUUID('4')
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
