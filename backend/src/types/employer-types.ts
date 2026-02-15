import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UpdateOpWorkEmployerDto } from '../generated/rest/update-op-work-employer.dto';
import { CreateOpWorkJobDto } from '../generated/rest/create-op-work-job.dto';
import { IsOptional, IsString } from 'class-validator';

export class SetEmployerProfileArgs extends OmitType(UpdateOpWorkEmployerDto, [
  'OpWorkProfile',
]) {}

export class SetEmployerWorkArgs extends OmitType(CreateOpWorkJobDto, [
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
  id?: string;
}
