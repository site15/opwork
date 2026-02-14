
import {OpWorkEmploymentType} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDate,IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'

export class UpdateOpWorkExperienceOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }

@ApiExtraModels(ConnectOpWorkJobSeekerDto,UpdateOpWorkExperienceOpWorkJobSeekerRelationInputDto)
export class UpdateOpWorkExperienceDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
company?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
position?: string ;
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
@MaxLength(255)
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
@ApiProperty({
  required: false,
  type: UpdateOpWorkExperienceOpWorkJobSeekerRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkExperienceOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker?: UpdateOpWorkExperienceOpWorkJobSeekerRelationInputDto ;
}
