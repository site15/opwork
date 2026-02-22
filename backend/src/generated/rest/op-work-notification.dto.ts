
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkNotificationDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  enum: OpWorkNotificationType,
  enumName: 'OpWorkNotificationType',
})
type!: OpWorkNotificationType ;
@ApiProperty({
  type: 'string',
})
title!: string ;
@ApiProperty({
  type: 'string',
})
message!: string ;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
data!: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isRead!: boolean  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isArchived!: boolean  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt!: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
readAt!: Date  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
autoMarkReadAtIds!: string  | null;
}
