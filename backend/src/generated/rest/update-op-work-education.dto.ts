
import {OpWorkEducationDegree,OpWorkGrade} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDate,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'

export class UpdateOpWorkEducationOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }

@ApiExtraModels(ConnectOpWorkJobSeekerDto,UpdateOpWorkEducationOpWorkJobSeekerRelationInputDto)
export class UpdateOpWorkEducationDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
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
@MaxLength(255)
fieldOfStudy?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
@IsOptional()
@IsDateString()
@IsDate()
startDate?: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
@ApiProperty({
  required: false,
  type: UpdateOpWorkEducationOpWorkJobSeekerRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkEducationOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker?: UpdateOpWorkEducationOpWorkJobSeekerRelationInputDto ;
}
