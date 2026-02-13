import { Reflector } from '@nestjs/core';

export const SkipCheckAuth = Reflector.createDecorator<{
  skipCheckSessionId?: boolean;
  skipCheckApiKey?: boolean;
}>();
