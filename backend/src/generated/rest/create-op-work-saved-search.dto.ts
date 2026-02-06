
import {OpWorkFrequency,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkSavedSearchDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
name!: string ;
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
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean  | null;
@ApiProperty({
  enum: OpWorkFrequency,
  enumName: 'OpWorkFrequency',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkFrequency)
frequency?: OpWorkFrequency  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
lastSentAt?: Date  | null;
}
