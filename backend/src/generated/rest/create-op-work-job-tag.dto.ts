
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class CreateOpWorkJobTagOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }
export class CreateOpWorkJobTagOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkJobTagOpWorkProfileRelationInputDto,ConnectOpWorkJobDto,CreateOpWorkJobTagOpWorkJobRelationInputDto)
export class CreateOpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@MaxLength(100)
name!: string ;
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
  type: CreateOpWorkJobTagOpWorkProfileRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobTagOpWorkProfileRelationInputDto)
OpWorkProfile!: CreateOpWorkJobTagOpWorkProfileRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobTagOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobTagOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkJobTagOpWorkJobRelationInputDto ;
}
