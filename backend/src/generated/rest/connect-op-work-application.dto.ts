import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  jobSeekerId!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  jobId!: string;
}

@ApiExtraModels(OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto)
export class ConnectOpWorkApplicationDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto)
  uqOpWorkJobSeekerJob?: OpWorkApplicationUqOpWorkJobSeekerJobUniqueInputDto;
}
