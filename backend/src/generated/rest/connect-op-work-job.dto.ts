
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,IsUUID} from 'class-validator'




export class ConnectOpWorkJobDto {
  @ApiProperty({
  type: 'string',
})
@IsUUID('4')
@IsNotEmpty()
@IsString()
id!: string ;
}
