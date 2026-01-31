import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  profileId!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
}

@ApiExtraModels(OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto)
export class ConnectOpWorkSavedSearchDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto)
  uqOpWorkSavedSearchProfileName?: OpWorkSavedSearchUqOpWorkSavedSearchProfileNameUniqueInputDto;
}
