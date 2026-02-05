
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsOptional,IsString} from 'class-validator'




export class UpdateOpWorkSavedJobDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
savedAt?: Date  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
notes?: string  | null;
}
