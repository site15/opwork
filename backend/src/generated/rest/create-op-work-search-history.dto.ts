
import {Prisma} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDate,IsDateString,IsInt,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkSearchHistoryOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkSearchHistoryOpWorkProfileRelationInputDto)
export class CreateOpWorkSearchHistoryDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(500)
query!: string ;
@ApiProperty({
  type: () => Object,
  required: false,
  nullable: true,
})
@IsOptional()
filters?: Prisma.InputJsonValue  | Prisma.NullableJsonNullValueInput;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
resultsCount?: number  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
searchedAt?: Date  | null;
@ApiProperty({
  type: CreateOpWorkSearchHistoryOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkSearchHistoryOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkSearchHistoryOpWorkProfileRelationInputDto ;
}
