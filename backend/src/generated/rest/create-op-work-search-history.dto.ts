
import {Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsInt,IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkSearchHistoryDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
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
  default: 0,
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
searchedAt?: Date  | null;
}
