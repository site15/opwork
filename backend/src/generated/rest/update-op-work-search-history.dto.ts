
import {Prisma} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDate,IsDateString,IsInt,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class UpdateOpWorkSearchHistoryOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkSearchHistoryOpWorkProfileRelationInputDto)
export class UpdateOpWorkSearchHistoryDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(500)
query?: string ;
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
  required: false,
  type: UpdateOpWorkSearchHistoryOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkSearchHistoryOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkSearchHistoryOpWorkProfileRelationInputDto ;
}
