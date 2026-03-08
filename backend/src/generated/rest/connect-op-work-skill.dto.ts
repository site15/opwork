
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkSkillUqOpWorkSkillNameUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
name!: string ;
  }
export class OpWorkSkillUqOpWorkProfileSkillNameUniqueInputDto {
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
@IsNotEmpty()
@IsString()
@MaxLength(255)
name!: string ;
  }

@ApiExtraModels(OpWorkSkillUqOpWorkSkillNameUniqueInputDto,OpWorkSkillUqOpWorkProfileSkillNameUniqueInputDto)
export class ConnectOpWorkSkillDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
name?: string ;
@ApiProperty({
  type: OpWorkSkillUqOpWorkSkillNameUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkSkillUqOpWorkSkillNameUniqueInputDto)
uqOpWorkSkillName?: OpWorkSkillUqOpWorkSkillNameUniqueInputDto ;
@ApiProperty({
  type: OpWorkSkillUqOpWorkProfileSkillNameUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkSkillUqOpWorkProfileSkillNameUniqueInputDto)
uqOpWorkProfileSkillName?: OpWorkSkillUqOpWorkProfileSkillNameUniqueInputDto ;
}
