
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class CreateOpWorkJobTagOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkJobDto,CreateOpWorkJobTagOpWorkJobRelationInputDto)
export class CreateOpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
name!: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
color?: string  | null;
@ApiProperty({
  type: CreateOpWorkJobTagOpWorkJobRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobTagOpWorkJobRelationInputDto)
OpWorkJob!: CreateOpWorkJobTagOpWorkJobRelationInputDto ;
}
