
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectAuthUserDto} from './connect-auth-user.dto'

export class UpdateAuthSessionAuthUserRelationInputDto {
    @ApiProperty({
  type: ConnectAuthUserDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectAuthUserDto)
connect!: ConnectAuthUserDto ;
  }

@ApiExtraModels(ConnectAuthUserDto,UpdateAuthSessionAuthUserRelationInputDto)
export class UpdateAuthSessionDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  required: false,
  type: UpdateAuthSessionAuthUserRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateAuthSessionAuthUserRelationInputDto)
AuthUser?: UpdateAuthSessionAuthUserRelationInputDto ;
}
