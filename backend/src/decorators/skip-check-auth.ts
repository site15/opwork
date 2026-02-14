import { Reflector } from '@nestjs/core';

export const SkipCheckAuth = Reflector.createDecorator<true>();
