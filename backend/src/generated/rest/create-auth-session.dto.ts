
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'

export class CreateAuthSessionAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,CreateAuthSessionAuthUserRelationInputDto)
export class CreateAuthSessionDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  type: CreateAuthSessionAuthUserRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateAuthSessionAuthUserRelationInputDto)
AuthUser!: CreateAuthSessionAuthUserRelationInputDto ;
}
