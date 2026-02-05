
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkProjectUqOpWorkProjectProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
profileId!: string ;
  }

@ApiExtraModels(OpWorkProjectUqOpWorkProjectProfileUniqueInputDto)
export class ConnectOpWorkProjectDto {
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
  type: OpWorkProjectUqOpWorkProjectProfileUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkProjectUqOpWorkProjectProfileUniqueInputDto)
uqOpWorkProjectProfile?: OpWorkProjectUqOpWorkProjectProfileUniqueInputDto ;
}
