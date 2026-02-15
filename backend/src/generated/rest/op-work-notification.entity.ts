
import {OpWorkNotificationType,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {AuthUser} from './auth-user.entity'


export class OpWorkNotification {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
profileId!: string  | null;
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
  type: () => OpWorkProfile,
  required: false,
  nullable: true,
})
OpWorkProfile?: OpWorkProfile  | null;
@ApiProperty({
  type: () => AuthUser,
  required: false,
  nullable: true,
})
authUser?: AuthUser  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
authUserId!: string  | null;
}
