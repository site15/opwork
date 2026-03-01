
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSeekerSkillUqOpWorkJobSeekerSkillUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
profileId!: string ;
@ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
jobSeekerId!: string ;
@ApiProperty({
  type: 'string',
})
@IsUUID('4')
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
@IsUUID('4')
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
