
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class CreateOpWorkSavedJobOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkSavedJobOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkSavedJobOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,CreateOpWorkSavedJobOpWorkJobRelationInputDto)
export class CreateOpWorkSavedJobDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
savedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(4000)
notes?: string  | null;
@ApiProperty({
  type: CreateOpWorkSavedJobOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkSavedJobOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkSavedJobOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkSavedJobOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkSavedJobOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkSavedJobOpWorkJobRelationInputDto ;
}
