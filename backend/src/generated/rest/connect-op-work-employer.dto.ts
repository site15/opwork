
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
profileId!: string ;
  }

@ApiExtraModels(OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto)
export class ConnectOpWorkEmployerDto {
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
  type: OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto)
uqOpWorkEmployerProfile?: OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto ;
}
