
import {OpWorkApplicationStatus} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class CreateOpWorkApplicationOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }
export class CreateOpWorkApplicationOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkApplicationOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkJobSeekerDto,CreateOpWorkApplicationOpWorkJobSeekerRelationInputDto,ConnectOpWorkProfileDto,CreateOpWorkApplicationOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,CreateOpWorkApplicationOpWorkJobRelationInputDto)
export class CreateOpWorkApplicationDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
coverLetter?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
resumeUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
portfolioUrl?: string  | null;
@ApiProperty({
  enum: OpWorkApplicationStatus,
  enumName: 'OpWorkApplicationStatus',
})
@IsNotEmpty()
@IsEnum(OpWorkApplicationStatus)
status!: OpWorkApplicationStatus ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
statusNotes?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
appliedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
statusUpdatedAt?: Date  | null;
@ApiProperty({
  type: CreateOpWorkApplicationOpWorkJobSeekerRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkApplicationOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker!: CreateOpWorkApplicationOpWorkJobSeekerRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkApplicationOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkApplicationOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkApplicationOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkApplicationOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkApplicationOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkApplicationOpWorkJobRelationInputDto ;
}
