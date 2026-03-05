
import {Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsEmail,IsOptional,IsString,MaxLength} from 'class-validator'




export class CreateAuthUserDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsEmail()
email?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
password?: string  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isEmailVerified?: boolean  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
anonymousId?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
supabaseUserId?: string  | null;
@ApiProperty({
  type: () => Object,
  required: false,
  nullable: true,
})
@IsOptional()
supabaseUserData?: Prisma.InputJsonValue  | Prisma.NullableJsonNullValueInput;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
}
