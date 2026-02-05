
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobSeekerUqOpWorkJobSeekerProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
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
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
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
