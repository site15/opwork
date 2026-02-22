
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto {
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

@ApiExtraModels(OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto)
export class ConnectOpWorkSavedSearchDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto)
uqOpWorkSavedSearchProfileName?: OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto ;
}
