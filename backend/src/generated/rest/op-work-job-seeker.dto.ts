
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkJobSeekerDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
currentPosition!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
currentCompany!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
summary!: string  | null;
@ApiProperty({
  type: 'number',
  format: 'float',
  nullable: true,
})
expectedSalary!: number  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
salaryCurrency!: string  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isOpenToWork!: boolean  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isOpenToRemote!: boolean  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isOpenToRelocation!: boolean  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
preferredLocations!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
linkedinUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
githubUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
portfolioUrl!: string  | null;
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
