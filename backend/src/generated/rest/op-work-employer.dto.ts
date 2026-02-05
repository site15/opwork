
import {ApiProperty} from '@nestjs/swagger'


export class OpWorkEmployerDto {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
companyName!: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
industry!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
mission!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
culture!: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
foundedYear!: number  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
headquarters!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
logoUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
coverImageUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
companyEmail!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
companyPhone!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
companyWebsite!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
linkedinUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
twitterUrl!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
facebookUrl!: string  | null;
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
