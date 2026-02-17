
import {OpWorkEducationDegree,OpWorkGrade} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'

export class CreateOpWorkEducationOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkEducationOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkEducationOpWorkProfileRelationInputDto,ConnectOpWorkJobSeekerDto,CreateOpWorkEducationOpWorkJobSeekerRelationInputDto)
export class CreateOpWorkEducationDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(255)
institution!: string ;
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
@MaxLength(4000)
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
  type: CreateOpWorkEducationOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkEducationOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkEducationOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkEducationOpWorkJobSeekerRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkEducationOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker!: CreateOpWorkEducationOpWorkJobSeekerRelationInputDto ;
}
