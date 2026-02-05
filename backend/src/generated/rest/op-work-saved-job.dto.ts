
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkSavedJobDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
savedAt!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
notes!: string  | null;
}
