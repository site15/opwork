import {
  OpWorkEducationDegree,
  OpWorkEmploymentType,
  OpWorkGrade,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import { Sdk } from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('OPWork: update job seeker profile (e2e)', () => {
  const jobSeekerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const skillName = getRandomSha7();

  let jobSeekerControllerSetSkillResultId: string | undefined;

  it('Login', async () => {
    const result = await jobSeekerActivity.registerAndLoginRandomUser(
      UserType.JOB_SEEKER,
    );
    expect(result?.profile?.isActive).toBeTruthy();
    expect(result?.profile?.email).toContain('job_seeker');
  });

  it('Update profile', async () => {
    const profileControllerGetProfileResult =
      await jobSeekerActivity.sdk.profileControllerGetProfile();
    const profileControllerUpdateProfileResult =
      await jobSeekerActivity.sdk.profileControllerSetProfile({
        body: {
          title: 'Software Engineer',
          email: jobSeekerActivity.authUser?.email,
        },
      });
    expect(profileControllerGetProfileResult?.data?.title || '').not.toContain(
      'Software Engineer',
    );
    expect(profileControllerUpdateProfileResult?.data?.title).toContain(
      'Software Engineer',
    );
  });

  it('Update job seeker profile', async () => {
    const jobSeekerControllerUpdateJobSeekerProfileResult =
      await jobSeekerActivity.sdk.jobSeekerControllerSetProfile({
        body: {
          currentPosition: 'Software Engineer',
          currentCompany: 'ABC Company',
          expectedSalary: 100000,
          githubUrl: 'https://github.com/username',
          linkedinUrl: 'https://linkedin.com/in/username',
          portfolioUrl: 'https://portfolio.com/username',
          preferredLocations: 'New York, San Francisco',
          salaryCurrency: 'USD',
          isOpenToRelocation: true,
          isOpenToRemote: true,
          isOpenToWork: true,
          summary: 'Software Engineer with 5 years of experience',
        },
      });
    expect(jobSeekerControllerUpdateJobSeekerProfileResult.data).toMatchObject({
      currentPosition: 'Software Engineer',
      currentCompany: 'ABC Company',
      expectedSalary: 100000,
      githubUrl: 'https://github.com/username',
      linkedinUrl: 'https://linkedin.com/in/username',
      portfolioUrl: 'https://portfolio.com/username',
      preferredLocations: 'New York, San Francisco',
      salaryCurrency: 'USD',
      isOpenToRelocation: true,
      isOpenToRemote: true,
      isOpenToWork: true,
      summary: 'Software Engineer with 5 years of experience',
    });
  });

  it('Create education for job seeker profile', async () => {
    const jobSeekerControllerSetEducationResult =
      await jobSeekerActivity.sdk.jobSeekerEducationControllerSetEducation({
        body: {
          degree: OpWorkEducationDegree.BACHELOR,
          institution: 'XYZ University',
          fieldOfStudy: 'Computer Science',
          startDate: new Date('2015-09-01').toISOString(),
          endDate: new Date('2019-06-01').toISOString(),
          description: 'Bachelor of Computer Science',
          grade: OpWorkGrade.A,
          isCurrent: false,
        },
      });
    expect(jobSeekerControllerSetEducationResult.data).toMatchObject({
      degree: OpWorkEducationDegree.BACHELOR,
      fieldOfStudy: 'Computer Science',
      institution: 'XYZ University',
      startDate: new Date('2015-09-01').toISOString(),
      endDate: new Date('2019-06-01').toISOString(),
      description: 'Bachelor of Computer Science',
      grade: OpWorkGrade.A,
      isCurrent: false,
    });
  });

  it('Create experience for job seeker profile', async () => {
    const jobSeekerControllerSetEducationResult =
      await jobSeekerActivity.sdk.jobSeekerExperienceControllerSetExperience({
        body: {
          company: 'XYZ Company',
          position: 'Software Engineer',
          startDate: new Date('2015-09-01').toISOString(),
          endDate: new Date('2019-06-01').toISOString(),
          description: 'Software Engineer at XYZ Company',
          employmentType: OpWorkEmploymentType.FULL_TIME,
          isCurrent: false,
          location: 'New York',
        },
      });
    expect(jobSeekerControllerSetEducationResult.data).toMatchObject({
      company: 'XYZ Company',
      position: 'Software Engineer',
      startDate: new Date('2015-09-01').toISOString(),
      endDate: new Date('2019-06-01').toISOString(),
      description: 'Software Engineer at XYZ Company',
      employmentType: OpWorkEmploymentType.FULL_TIME,
      isCurrent: false,
      location: 'New York',
    });
  });

  it('Create skill for job seeker profile', async () => {
    const skillId = (
      await jobSeekerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;
    const jobSeekerControllerSetSkillResult =
      await jobSeekerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          level: 5,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillId: skillId,
        },
      });
    expect(jobSeekerControllerSetSkillResult.data).toMatchObject({
      level: 5,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      skillId: skillId,
      OpWorkSkill: { name: 'JavaScript' },
    });
    jobSeekerControllerSetSkillResultId =
      jobSeekerControllerSetSkillResult.data?.id;
  });

  it('Create skill with random name for job seeker profile', async () => {
    const jobSeekerControllerSetSkillResult =
      await jobSeekerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          level: 5,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
        },
      });

    expect(jobSeekerControllerSetSkillResult.data?.id).not.toEqual(
      jobSeekerControllerSetSkillResultId,
    );
    expect(jobSeekerControllerSetSkillResult.data).toMatchObject({
      level: 5,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: skillName },
    });
    jobSeekerControllerSetSkillResultId =
      jobSeekerControllerSetSkillResult.data?.id;
  });

  it('Update skill options for job seeker profile', async () => {
    const jobSeekerControllerUpdateSkillResult =
      await jobSeekerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          id: jobSeekerControllerSetSkillResultId,
          level: 6,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
        },
      });
    expect(jobSeekerControllerUpdateSkillResult.data).toMatchObject({
      id: jobSeekerControllerSetSkillResultId,
      level: 6,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: skillName },
    });
  });

  it('Read job seeker profile', async () => {
    const skillId = (
      await jobSeekerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;
    const jobSeekerControllerGetJobSeekerProfileResult =
      await jobSeekerActivity.sdk.jobSeekerControllerGetProfile();
    expect(jobSeekerControllerGetJobSeekerProfileResult.data).toMatchObject({
      OpWorkEducation: [
        {
          degree: OpWorkEducationDegree.BACHELOR,
          fieldOfStudy: 'Computer Science',
          institution: 'XYZ University',
          startDate: new Date('2015-09-01').toISOString(),
          endDate: new Date('2019-06-01').toISOString(),
          description: 'Bachelor of Computer Science',
          grade: OpWorkGrade.A,
          isCurrent: false,
        },
      ],
      OpWorkExperience: [
        {
          company: 'XYZ Company',
          position: 'Software Engineer',
          startDate: new Date('2015-09-01').toISOString(),
          endDate: new Date('2019-06-01').toISOString(),
          description: 'Software Engineer at XYZ Company',
          employmentType: OpWorkEmploymentType.FULL_TIME,
          isCurrent: false,
          location: 'New York',
        },
      ],
      OpWorkJobSeekerSkill: [
        {
          level: 5,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillId: skillId,
          OpWorkSkill: { name: 'JavaScript' },
        },
        {
          level: 6,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          OpWorkSkill: { name: skillName },
        },
      ],
      currentPosition: 'Software Engineer',
      currentCompany: 'ABC Company',
      expectedSalary: 100000,
      githubUrl: 'https://github.com/username',
      linkedinUrl: 'https://linkedin.com/in/username',
      portfolioUrl: 'https://portfolio.com/username',
      preferredLocations: 'New York, San Francisco',
      salaryCurrency: 'USD',
      isOpenToRelocation: true,
      isOpenToRemote: true,
      isOpenToWork: true,
      summary: 'Software Engineer with 5 years of experience',
    });
  });
});
