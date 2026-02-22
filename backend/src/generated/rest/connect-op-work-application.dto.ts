
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto {
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
jobId!: string ;
  }

@ApiExtraModels(OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto)
export class ConnectOpWorkApplicationDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto)
uqOpWorkJobSeekerJob?: OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto ;
}
