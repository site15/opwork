import { Provider } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrismaPg } from '@prisma/adapter-pg';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PrismaClient } from '../generated/prisma/client';
import { universalPasswordHashingExtension } from './extensions/universal-password-hashing';

export * as PrismaSdk from '../generated/prisma/client';

export class FindManyArgs {
  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @Type(() => Number)
  curPage?: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  searchText?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  sort?: string;
}

export class FindManyResponseMeta {
  @ApiPropertyOptional({ type: 'number' })
  curPage?: number;

  @ApiPropertyOptional({ type: 'number' })
  perPage?: number;

  @ApiProperty({ type: 'number' })
  totalResults!: number;
}

export function getFirstSkipFromCurPerPage(args: FindManyArgs): {
  take: number;
  skip: number;
  curPage: number;
  perPage: number;
} {
  const curPage = +(args.curPage || 1);
  const perPage = +(args.perPage || 5);
  const skip = +curPage === 1 ? 0 : +perPage * +curPage - +perPage;

  return { take: perPage, skip, curPage, perPage };
}

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
