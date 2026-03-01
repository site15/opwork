import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateOpWorkEducationDto } from '../generated/rest/create-op-work-education.dto';
import { CreateOpWorkExperienceDto } from '../generated/rest/create-op-work-experience.dto';
import { CreateOpWorkJobSeekerSkillDto } from '../generated/rest/create-op-work-job-seeker-skill.dto';
import { UpdateOpWorkJobSeekerDto } from '../generated/rest/update-op-work-job-seeker.dto';

export class SetJobSeekerProfileArgs extends UpdateOpWorkJobSeekerDto {
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
  jobSeekerId?: string;
}

export class SetJobSeekerSkillArgs extends OmitType(
  CreateOpWorkJobSeekerSkillDto,
  ['OpWorkJobSeeker', 'OpWorkProfile', 'OpWorkSkill'],
) {
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
  jobSeekerId?: string;

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

export class SetJobSeekerEducationArgs extends OmitType(
  CreateOpWorkEducationDto,
  ['OpWorkJobSeeker', 'OpWorkProfile'],
) {
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
  jobSeekerId?: string;
}

export class SetJobSeekerExperienceArgs extends OmitType(
  CreateOpWorkExperienceDto,
  ['OpWorkJobSeeker', 'OpWorkProfile'],
) {
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
  jobSeekerId?: string;
}
