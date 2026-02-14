import { Provider } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { universalPasswordHashingExtension } from './extensions/universal-password-hashing';

export * as PrismaSdk from '../generated/prisma/client';

export * from '../types/prisma-types';

const prismaService = (connectionString: string) =>
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
    }),
  }).$extends(universalPasswordHashingExtension);

export type PrismaService = ReturnType<typeof prismaService>;

export const PRISMA_SERVICE = Symbol('PrismaService');

export function providePrismaService(connectionString: string): Provider {
  return {
    provide: PRISMA_SERVICE,
    useFactory: () => {
      return prismaService(connectionString);
    },
  } satisfies Provider;
}
