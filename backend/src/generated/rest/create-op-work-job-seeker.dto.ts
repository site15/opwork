
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsInt,IsOptional,IsString} from 'class-validator'




export class CreateOpWorkJobSeekerDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
currentPosition?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
currentCompany?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
summary?: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
expectedSalary?: number  | null;
@ApiProperty({
  type: 'string',
  default: 'USD',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
salaryCurrency?: string  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isOpenToWork?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isOpenToRemote?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isOpenToRelocation?: boolean  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
preferredLocations?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
linkedinUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
githubUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
portfolioUrl?: string  | null;
}
