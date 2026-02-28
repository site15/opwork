
import {OpWorkProfileType,OpWorkUserType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {AuthUser} from './auth-user.entity'
import {OpWorkJobSeeker} from './op-work-job-seeker.entity'
import {OpWorkEmployer} from './op-work-employer.entity'
import {OpWorkProject} from './op-work-project.entity'
import {OpWorkJob} from './op-work-job.entity'
import {OpWorkApplication} from './op-work-application.entity'
import {OpWorkSavedJob} from './op-work-saved-job.entity'
import {OpWorkNotification} from './op-work-notification.entity'
import {OpWorkNotificationSettings} from './op-work-notification-settings.entity'
import {OpWorkSearchHistory} from './op-work-search-history.entity'
import {OpWorkJobView} from './op-work-job-view.entity'
import {OpWorkSavedSearch} from './op-work-saved-search.entity'
import {OpWorkJobSkill} from './op-work-job-skill.entity'
import {OpWorkExperience} from './op-work-experience.entity'
import {OpWorkEducation} from './op-work-education.entity'
import {OpWorkJobSeekerSkill} from './op-work-job-seeker-skill.entity'
import {OpWorkJobTag} from './op-work-job-tag.entity'


export class OpWorkProfile {
  @ApiProperty({
  type: 'string',
})
id!: string ;
@ApiProperty({
  type: 'string',
})
userId!: string ;
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
title!: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description!: string  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isActive!: boolean  | null;
@ApiProperty({
  type: 'boolean',
  nullable: true,
})
isEmailVerified!: boolean  | null;
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
@ApiProperty({
  type: () => AuthUser,
  required: false,
})
AuthUser?: AuthUser ;
@ApiProperty({
  type: () => OpWorkJobSeeker,
  isArray: true,
  required: false,
})
opWorkJobSeeker?: OpWorkJobSeeker[] ;
@ApiProperty({
  type: () => OpWorkEmployer,
  isArray: true,
  required: false,
})
opWorkEmployer?: OpWorkEmployer[] ;
@ApiProperty({
  type: () => OpWorkProject,
  isArray: true,
  required: false,
})
opWorkProject?: OpWorkProject[] ;
@ApiProperty({
  type: () => OpWorkJob,
  isArray: true,
  required: false,
})
opWorkJobs?: OpWorkJob[] ;
@ApiProperty({
  type: () => OpWorkApplication,
  isArray: true,
  required: false,
})
opWorkApplications?: OpWorkApplication[] ;
@ApiProperty({
  type: () => OpWorkSavedJob,
  isArray: true,
  required: false,
})
opWorkSavedJobs?: OpWorkSavedJob[] ;
@ApiProperty({
  type: () => OpWorkNotification,
  isArray: true,
  required: false,
})
opWorkNotifications?: OpWorkNotification[] ;
@ApiProperty({
  type: () => OpWorkNotificationSettings,
  required: false,
  nullable: true,
})
opWorkNotificationSettings?: OpWorkNotificationSettings  | null;
@ApiProperty({
  type: () => OpWorkSearchHistory,
  isArray: true,
  required: false,
})
opWorkSearchHistories?: OpWorkSearchHistory[] ;
@ApiProperty({
  type: () => OpWorkJobView,
  isArray: true,
  required: false,
})
opWorkJobViews?: OpWorkJobView[] ;
@ApiProperty({
  type: () => OpWorkSavedSearch,
  isArray: true,
  required: false,
})
opWorkSavedSearches?: OpWorkSavedSearch[] ;
@ApiProperty({
  type: () => OpWorkJobSkill,
  isArray: true,
  required: false,
})
opWorkJobSkills?: OpWorkJobSkill[] ;
@ApiProperty({
  type: () => OpWorkExperience,
  isArray: true,
  required: false,
})
opWorkExperiences?: OpWorkExperience[] ;
@ApiProperty({
  type: () => OpWorkEducation,
  isArray: true,
  required: false,
})
opWorkEducations?: OpWorkEducation[] ;
@ApiProperty({
  type: () => OpWorkJobSeekerSkill,
  isArray: true,
  required: false,
})
opWorkJobSeekerSkills?: OpWorkJobSeekerSkill[] ;
@ApiProperty({
  type: () => OpWorkJobTag,
  isArray: true,
  required: false,
})
opWorkJobTags?: OpWorkJobTag[] ;
}
