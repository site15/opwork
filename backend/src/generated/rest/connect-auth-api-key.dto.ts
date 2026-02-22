
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class AuthApiKeyUqApiKeyUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
apiKey!: string ;
  }

@ApiExtraModels(AuthApiKeyUqApiKeyUniqueInputDto)
export class ConnectAuthApiKeyDto {
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
apiKey?: string ;
@ApiProperty({
  type: AuthApiKeyUqApiKeyUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => AuthApiKeyUqApiKeyUniqueInputDto)
uqApiKey?: AuthApiKeyUqApiKeyUniqueInputDto ;
}
