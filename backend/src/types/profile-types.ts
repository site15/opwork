import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateOpWorkProfileDto } from '../generated/rest/update-op-work-profile.dto';

export class SetProfileArgs extends OmitType(UpdateOpWorkProfileDto, [
  'AuthUser',
  'isEmailVerified',
  'type',
  'userType',
]) {}
