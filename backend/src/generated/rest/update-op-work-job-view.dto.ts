
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDate,IsDateString,IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class UpdateOpWorkJobViewOpWorkProfileRelationInputDto {
    @ApiProperty({
  required: false,
  type: ConnectOpWorkProfileDto,
})
@IsOptional()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect?: ConnectOpWorkProfileDto ;
@ApiProperty({
  required: false,
  type: 'boolean',
})
@IsOptional()
@IsBoolean()
disconnect?: boolean ;
  }
export class UpdateOpWorkJobViewOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkJobViewOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,UpdateOpWorkJobViewOpWorkJobRelationInputDto)
export class UpdateOpWorkJobViewDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
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
  type: UpdateOpWorkJobViewOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobViewOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkJobViewOpWorkProfileRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkJobViewOpWorkJobRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobViewOpWorkJobRelationInputDto)
OpWorkJob?: UpdateOpWorkJobViewOpWorkJobRelationInputDto ;
}
