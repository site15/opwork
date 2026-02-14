import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProfileArgs {
  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  title?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  email?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  phone?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  website?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  location?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  avatarUrl?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  coverImage?: string | null;
}
