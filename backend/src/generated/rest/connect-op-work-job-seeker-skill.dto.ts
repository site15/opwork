
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
jobSeekerId!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
skillId!: string ;
  }

@ApiExtraModels(OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto)
export class ConnectOpWorkJobSeekerSkillDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto)
uqOpWorkJobSeekerSkill?: OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto ;
}
