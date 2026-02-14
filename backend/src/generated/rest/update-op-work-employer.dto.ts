
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsEmail,IsInt,IsNotEmpty,IsOptional,IsString,IsUrl,MaxLength,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {ConnectOpWorkProfileDto} from './connect-op-work-profile.dto'

export class UpdateOpWorkEmployerOpWorkProfileRelationInputDto {
    @ApiProperty({
  type: ConnectOpWorkProfileDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ConnectOpWorkProfileDto)
connect!: ConnectOpWorkProfileDto ;
  }

@ApiExtraModels(ConnectOpWorkProfileDto,UpdateOpWorkEmployerOpWorkProfileRelationInputDto)
export class UpdateOpWorkEmployerDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@MaxLength(255)
companyName?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
industry?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
description?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
mission?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
culture?: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
foundedYear?: number  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(255)
headquarters?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
logoUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
coverImageUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsEmail()
@MaxLength(255)
companyEmail?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(50)
companyPhone?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
companyWebsite?: string  | null;
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
twitterUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@IsUrl()
@MaxLength(500)
facebookUrl?: string  | null;
@ApiProperty({
  required: false,
  type: UpdateOpWorkEmployerOpWorkProfileRelationInputDto,
})
@IsOptional()
@ValidateNested()
@Type(() => UpdateOpWorkEmployerOpWorkProfileRelationInputDto)
OpWorkProfile?: UpdateOpWorkEmployerOpWorkProfileRelationInputDto ;
}
