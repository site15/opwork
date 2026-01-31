import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OpWorkSkillUqOpWorkSkillNameUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
}

@ApiExtraModels(OpWorkSkillUqOpWorkSkillNameUniqueInputDto)
export class ConnectOpWorkSkillDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    type: OpWorkSkillUqOpWorkSkillNameUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OpWorkSkillUqOpWorkSkillNameUniqueInputDto)
  uqOpWorkSkillName?: OpWorkSkillUqOpWorkSkillNameUniqueInputDto;
}
