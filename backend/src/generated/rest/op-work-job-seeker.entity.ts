
import {ApiProperty} from '@nestjs/swagger'
import {OpWorkProfile} from './op-work-profile.entity'
import {OpWorkExperience} from './op-work-experience.entity'
import {OpWorkEducation} from './op-work-education.entity'
import {OpWorkJobSeekerSkill} from './op-work-job-seeker-skill.entity'
import {OpWorkApplication} from './op-work-application.entity'


export class OpWorkJobSeeker {
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
  type: 'integer',
  format: 'int32',
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
@ApiProperty({
  type: () => OpWorkProfile,
  required: false,
})
OpWorkProfile?: OpWorkProfile ;
@ApiProperty({
  type: () => OpWorkExperience,
  isArray: true,
  required: false,
})
OpWorkExperience?: OpWorkExperience[] ;
@ApiProperty({
  type: () => OpWorkEducation,
  isArray: true,
  required: false,
})
OpWorkEducation?: OpWorkEducation[] ;
@ApiProperty({
  type: () => OpWorkJobSeekerSkill,
  isArray: true,
  required: false,
})
OpWorkJobSeekerSkill?: OpWorkJobSeekerSkill[] ;
@ApiProperty({
  type: () => OpWorkApplication,
  isArray: true,
  required: false,
})
opWorkApplications?: OpWorkApplication[] ;
}
