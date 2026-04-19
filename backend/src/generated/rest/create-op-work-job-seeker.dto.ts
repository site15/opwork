
import {OpWorkJobSeekerGender} from '../prisma/client'
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsEnum,IsNotEmpty,IsNumber,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class CreateOpWorkJobSeekerOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,CreateOpWorkJobSeekerOpWorkProfileRelationInputDto)
export class CreateOpWorkJobSeekerDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(100)
firstName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(100)
lastName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(100)
middleName?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
birthDate?: Date  | null;
@ApiProperty({
  enum: OpWorkJobSeekerGender,
  enumName: 'OpWorkJobSeekerGender',
  required: false,
  nullable: true,
})
@IsOptional()
@IsEnum(OpWorkJobSeekerGender)
@MaxLength(50)
gender?: OpWorkJobSeekerGender  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
currentPosition?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
currentCompany?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(10000)
summary?: string  | null;
@ApiProperty({
  type: 'number',
  format: 'float',
  required: false,
  nullable: true,
})
@IsOptional()
@IsNumber()
expectedSalary?: number  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(3)
salaryCurrency?: string  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isOpenToWork?: boolean  | null;
@ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isOpenToRemote?: boolean  | null;
@ApiProperty({
  type: 'boolean',
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
@MaxLength(255)
preferredLocations?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
linkedinUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
githubUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
portfolioUrl?: string  | null;
@ApiProperty({
  required: false,
  type: CreateOpWorkJobSeekerOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => CreateOpWorkJobSeekerOpWorkProfileRelationInputDto)
OpWorkProfile?: CreateOpWorkJobSeekerOpWorkProfileRelationInputDto ;
}
