
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
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
  type: OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto)
uqOpWorkEmployerProfile?: OpWorkEmployerUqOpWorkEmployerProfileUniqueInputDto ;
}
