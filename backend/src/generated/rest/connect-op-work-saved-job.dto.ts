
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkSavedJobUqOpWorkProfileSavedJobUniqueInputDto {
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
jobId!: string ;
  }

@ApiExtraModels(OpWorkSavedJobUqOpWorkProfileSavedJobUniqueInputDto)
export class ConnectOpWorkSavedJobDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkSavedJobUqOpWorkProfileSavedJobUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkSavedJobUqOpWorkProfileSavedJobUniqueInputDto)
uqOpWorkProfileSavedJob?: OpWorkSavedJobUqOpWorkProfileSavedJobUniqueInputDto ;
}
