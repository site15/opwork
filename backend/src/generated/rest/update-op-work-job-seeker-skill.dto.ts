
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsDateString,IsInt,IsOptional} from 'class-validator'




export class UpdateOpWorkJobSeekerSkillDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
yearsOfExp?: number  | null;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isPrimary?: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
lastUsed?: Date  | null;
}
