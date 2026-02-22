
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {OpWorkProfileType} from '../prisma/client'

export class OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
userId!: string ;
@ApiProperty({
  enum: OpWorkProfileType,
  enumName: 'OpWorkProfileType',
})
@IsNotEmpty()
@IsEnum(OpWorkProfileType)
type!: OpWorkProfileType ;
  }

@ApiExtraModels(OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto)
export class ConnectOpWorkProfileDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsUUID('4')
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto)
uqOpWorkProfileUserType?: OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto ;
}
