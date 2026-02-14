
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDate,IsDateString,IsInt,IsNotEmpty,IsOptional,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkJobSeekerDto} from './connect-op-work-job-seeker.dto'
import {ConnectOpWorkSkillDto} from './connect-op-work-skill.dto'

export class CreateOpWorkJobSeekerSkillOpWorkJobSeekerRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkJobSeekerDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkJobSeekerDto)
connect!: ConnectOpWorkJobSeekerDto ;
  }
export class CreateOpWorkJobSeekerSkillOpWorkSkillRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkSkillDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkSkillDto)
connect!: ConnectOpWorkSkillDto ;
  }

@ApiExtraModels(ConnectOpWorkJobSeekerDto,CreateOpWorkJobSeekerSkillOpWorkJobSeekerRelationInputDto,ConnectOpWorkSkillDto,CreateOpWorkJobSeekerSkillOpWorkSkillRelationInputDto)
export class CreateOpWorkJobSeekerSkillDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
level!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
yearsOfExp?: number  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isPrimary?: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
@IsDate()
lastUsed?: Date  | null;
@ApiProperty({
  type: CreateOpWorkJobSeekerSkillOpWorkJobSeekerRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobSeekerSkillOpWorkJobSeekerRelationInputDto)
OpWorkJobSeeker!: CreateOpWorkJobSeekerSkillOpWorkJobSeekerRelationInputDto ;
@ApiProperty({
  type: CreateOpWorkJobSeekerSkillOpWorkSkillRelationInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => CreateOpWorkJobSeekerSkillOpWorkSkillRelationInputDto)
OpWorkSkill!: CreateOpWorkJobSeekerSkillOpWorkSkillRelationInputDto ;
}
