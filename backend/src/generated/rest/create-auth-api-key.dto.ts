
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'

export class CreateAuthApiKeyAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,CreateAuthApiKeyAuthUserRelationInputDto)
export class CreateAuthApiKeyDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
apiKey?: string  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  type: CreateAuthApiKeyAuthUserRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateAuthApiKeyAuthUserRelationInputDto)
AuthUser!: CreateAuthApiKeyAuthUserRelationInputDto ;
}
