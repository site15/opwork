
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class UpdateOpWorkJobTagOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class UpdateOpWorkJobTagOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkJobTagOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,UpdateOpWorkJobTagOpWorkJobRelationInputDto)
export class UpdateOpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(100)
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(7)
color?: string  | null;
@ApiProperty({
  required: false,
  type: UpdateOpWorkJobTagOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobTagOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkJobTagOpWorkProfileRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateOpWorkJobTagOpWorkJobRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobTagOpWorkJobRelationInputDto)
OpWorkJob?: UpdateOpWorkJobTagOpWorkJobRelationInputDto ;
}
