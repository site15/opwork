
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobDto} from './connect-op-work-job.dto'

export class UpdateOpWorkJobTagOpWorkJobRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobDto)
connect!: ConnectOpWorkJobDto ;
  }

@ApiExtraModels(ConnectOpWorkJobDto,UpdateOpWorkJobTagOpWorkJobRelationInputDto)
export class UpdateOpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
color?: string  | null;
@ApiProperty({
  required: false,
  type: UpdateOpWorkJobTagOpWorkJobRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkJobTagOpWorkJobRelationInputDto)
OpWorkJob?: UpdateOpWorkJobTagOpWorkJobRelationInputDto ;
}
