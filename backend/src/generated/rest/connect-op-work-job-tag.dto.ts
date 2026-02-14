
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class OpWorkJobTagUqOpWorkJobTagUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
jobId!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(100)
name!: string ;
  }

@ApiExtraModels(OpWorkJobTagUqOpWorkJobTagUniqueInputDto)
export class ConnectOpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: OpWorkJobTagUqOpWorkJobTagUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => OpWorkJobTagUqOpWorkJobTagUniqueInputDto)
uqOpWorkJobTag?: OpWorkJobTagUqOpWorkJobTagUniqueInputDto ;
}
