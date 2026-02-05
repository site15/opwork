
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkJob} from './op-work-job.entity'


export class OpWorkJobTag {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
jobId!: string ;
@ApiProperty({
  type: 'string',
})
name!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
color!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: () => OpWorkJob,
  required: false,
})
OpWorkJob?: OpWorkJob ;
}
