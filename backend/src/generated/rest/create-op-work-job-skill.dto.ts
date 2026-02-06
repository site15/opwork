
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsInt,IsNotEmpty,IsOptional} from 'class-validator'




export class CreateOpWorkJobSkillDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
  nullable: true,
})
@IsOptional()
@IsBoolean()
isRequired?: boolean  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
importance!: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
minLevel?: number  | null;
}
