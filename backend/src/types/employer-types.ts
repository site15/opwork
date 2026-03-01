import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateOpWorkJobSkillDto } from '../generated/rest/create-op-work-job-skill.dto';
import { CreateOpWorkJobTagDto } from '../generated/rest/create-op-work-job-tag.dto';
import { CreateOpWorkJobDto } from '../generated/rest/create-op-work-job.dto';
import { UpdateOpWorkEmployerDto } from '../generated/rest/update-op-work-employer.dto';

export class DetEmployerProfileArgs {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;
}

export class SetEmployerProfileArgs extends UpdateOpWorkEmployerDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;
}

export class SetEmployerJobArgs extends OmitType(CreateOpWorkJobDto, [
  'OpWorkEmployer',
  'OpWorkProfile',
  'viewsCount',
  'applicationsCount',
  'savesCount',
]) {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  employerId?: string;
}

export class DelEmployerJobArgs {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;
}

export class SetEmployerJobSkillArgs extends OmitType(CreateOpWorkJobSkillDto, [
  'OpWorkProfile',
  'OpWorkJob',
  'OpWorkSkill',
]) {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  skillName?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  skillId?: string;
}

export class SetEmployerJobTagsArgs extends OmitType(CreateOpWorkJobTagDto, [
  'OpWorkJob',
  'OpWorkProfile',
]) {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID('4', { each: true })
  id?: string;
}
