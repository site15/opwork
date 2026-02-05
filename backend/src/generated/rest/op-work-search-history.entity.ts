
import {Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'


export class OpWorkSearchHistory {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
profileId!: string ;
@ApiProperty({
  type: 'string',
})
query!: string ;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
filters!: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
resultsCount!: number  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
searchedAt!: Date  | null;
@ApiProperty({
  type: () => OpWorkProfile,
  required: false,
})
OpWorkProfile?: OpWorkProfile ;
}
