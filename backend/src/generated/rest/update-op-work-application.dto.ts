
import {OpWorkApplicationStatus} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsEnum,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class UpdateOpWorkApplicationOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }
export class UpdateOpWorkApplicationOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class UpdateOpWorkApplicationOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkJobSeekerDto,UpdateOpWorkApplicationOpWorkJobSeekerRelationInputDto,ConnectOpWorkProfileDto,UpdateOpWorkApplicationOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,UpdateOpWorkApplicationOpWorkJobRelationInputDto)
export class UpdateOpWorkApplicationDto {
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
@IsUrl()
@MaxLength(500)
resumeUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
portfolioUrl?: string  | null;
@ApiProperty({
  enum: OpWorkApplicationStatus,
  enumName: 'OpWorkApplicationStatus',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkApplicationStatus)
status?: OpWorkApplicationStatus ;
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
  required: false,
  type: UpdateOpWorkApplicationOpWorkJobSeekerRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkApplicationOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker?: UpdateOpWorkApplicationOpWorkJobSeekerRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkApplicationOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkApplicationOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkApplicationOpWorkProfileRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkApplicationOpWorkJobRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkApplicationOpWorkJobRelationInputDto)
OpWorkJob?: UpdateOpWorkApplicationOpWorkJobRelationInputDto ;
}
