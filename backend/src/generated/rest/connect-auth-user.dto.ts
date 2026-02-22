
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class AuthUserUqSupabaseUserIdUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
supabaseUserId!: string ;
  }

@ApiExtraModels(AuthUserUqSupabaseUserIdUniqueInputDto)
export class ConnectAuthUserDto {
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
supabaseUserId?: string ;
@ApiProperty({
  type: AuthUserUqSupabaseUserIdUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => AuthUserUqSupabaseUserIdUniqueInputDto)
uqSupabaseUserId?: AuthUserUqSupabaseUserIdUniqueInputDto ;
}
