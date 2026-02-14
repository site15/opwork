import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
