
import {OpWorkEducationDegree,OpWorkGrade} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkEducationDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
institution?: string ;
@ApiProperty({
  enum: OpWorkEducationDegree,
  enumName: 'OpWorkEducationDegree',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkEducationDegree)
degree?: OpWorkEducationDegree  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
fieldOfStudy?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
@IsOptional()
@IsDateString()
startDate?: Date ;
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
description?: string  | null;
@ApiProperty({
  enum: OpWorkGrade,
  enumName: 'OpWorkGrade',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkGrade)
grade?: OpWorkGrade  | null;
}
