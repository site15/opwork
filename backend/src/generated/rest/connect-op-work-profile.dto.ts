
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {OpWorkProfileType} from '../prisma/client'

export class OpWorkProfileUqOpWorkProfileUserTypeUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
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
