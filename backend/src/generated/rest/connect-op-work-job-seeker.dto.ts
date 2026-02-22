
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
profileId!: string ;
  }

@ApiExtraModels(OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto)
export class ConnectOpWorkJobSeekerDto {
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
@IsUUID('4')
@IsOptional()
@IsString()
profileId?: string ;
@ApiProperty({
  type: OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto)
uqOpWorkJobSeekerProfile?: OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto ;
}
