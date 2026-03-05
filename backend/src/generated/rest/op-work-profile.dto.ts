
import {OpWorkProfileType,OpWorkUserType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkProfileDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  enum: OpWorkProfileType,
  enumName: 'OpWorkProfileType',
})
type!: OpWorkProfileType ;
@ApiProperty({
  enum: OpWorkUserType,
  enumName: 'OpWorkUserType',
})
userType!: OpWorkUserType ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
phone!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
website!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
location!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
avatarUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
coverImage!: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt!: Date ;
}
