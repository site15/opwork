
import {OpWorkApplicationStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsEnum,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkApplicationDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
coverLetter?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
resumeUrl?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
portfolioUrl?: string  | null;
@ApiProperty({
  enum: OpWorkApplicationStatus,
  enumName: 'OpWorkApplicationStatus',
  required: false,
})
@IsOptional()
@IsEnum(OpWorkApplicationStatus)
status?: OpWorkApplicationStatus ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
statusNotes?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
appliedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
statusUpdatedAt?: Date  | null;
}
