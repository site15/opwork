
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class CreateOpWorkJobViewOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkJobViewOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkJobViewOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,CreateOpWorkJobViewOpWorkJobRelationInputDto)
export class CreateOpWorkJobViewDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
viewedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(45)
ipAddress?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(500)
userAgent?: string  | null;
@ApiProperty({
  required: false,
  type: CreateOpWorkJobViewOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => CreateOpWorkJobViewOpWorkProfileRelationInputDto)
OpWorkProfile?: CreateOpWorkJobViewOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobViewOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobViewOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkJobViewOpWorkJobRelationInputDto ;
}
