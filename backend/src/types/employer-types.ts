import { OmitType } from '@nestjs/swagger';
import { UpdateOpWorkEmployerDto } from '../generated/rest/update-op-work-employer.dto';

export class SetEmployerProfileArgs extends OmitType(UpdateOpWorkEmployerDto, [
  'OpWorkProfile',
]) {}
