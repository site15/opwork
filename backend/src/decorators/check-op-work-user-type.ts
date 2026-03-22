import { Reflector } from '@nestjs/core';
import { OpWorkUserType } from '../generated/prisma/enums';

type CheckOpWorkUserTypeOptions = {
  userTypes: OpWorkUserType[] | OpWorkUserType;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
};

export const CheckOpWorkUserTypes =
  Reflector.createDecorator<CheckOpWorkUserTypeOptions[]>();
