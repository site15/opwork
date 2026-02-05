
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkJobTagDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
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
}
