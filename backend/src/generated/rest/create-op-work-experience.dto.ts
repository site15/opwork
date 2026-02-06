
import {OpWorkEmploymentType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkExperienceDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
company!: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
position!: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
description?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
@IsNotEmpty()
@IsDateString()
startDate!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
endDate?: Date  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isCurrent?: boolean  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
location?: string  | null;
@ApiProperty({
  enum: OpWorkEmploymentType,
  enumName: 'OpWorkEmploymentType',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkEmploymentType)
employmentType?: OpWorkEmploymentType  | null;
}
