import {
  OpWorkEducationDegree,
  OpWorkEmploymentType,
  OpWorkGrade,
  OpWorkSkillLevel,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('OPWork: update job seeker profile (e2e)', () => {
  const jobSeekerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const skillName = getRandomSha7();

  let jobSeekerControllerSetSkillResultId: string | undefined = undefined;
  let jobSeekerId: string | undefined = undefined;

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
          location: 'Software Engineer',
          email: jobSeekerActivity.authUser?.email,
        },
      });
    expect(
      profileControllerGetProfileResult?.data?.location || '',
    ).not.toContain('Software Engineer');
    expect(profileControllerUpdateProfileResult?.data?.location).toContain(
      'Software Engineer',
    );
  });

  it('Update job seeker profile', async () => {
    const jobSeekerControllerSetProfileResult =
      await jobSeekerActivity.sdk.jobSeekerControllerSetProfile({
        body: {
          jobSeekerId,
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
    expect(jobSeekerControllerSetProfileResult.data).toMatchObject({
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
    jobSeekerId = jobSeekerControllerSetProfileResult.data?.id;
  });

  it('Create education for job seeker profile', async () => {
    const jobSeekerEducationControllerSetEducationResult =
      await jobSeekerActivity.sdk.jobSeekerEducationControllerSetEducation({
        body: {
          jobSeekerId,
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
    expect(jobSeekerEducationControllerSetEducationResult.data).toMatchObject({
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
    const jobSeekerExperienceControllerSetExperienceResult =
      await jobSeekerActivity.sdk.jobSeekerExperienceControllerSetExperience({
        body: {
          jobSeekerId,
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
    expect(jobSeekerExperienceControllerSetExperienceResult.data).toMatchObject(
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
    );
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
          level: OpWorkSkillLevel.ADVANCED,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillId: skillId,
          jobSeekerId,
        },
      });
    expect(jobSeekerControllerSetSkillResult.data).toMatchObject({
      level: OpWorkSkillLevel.ADVANCED,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: 'JavaScript' },
    });
    jobSeekerControllerSetSkillResultId =
      jobSeekerControllerSetSkillResult.data?.id;
  });

  it('Create skill with random name for job seeker profile', async () => {
    const jobSeekerSkillControllerSetSkillResult =
      await jobSeekerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          level: OpWorkSkillLevel.ADVANCED,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
          jobSeekerId,
        },
      });

    expect(jobSeekerSkillControllerSetSkillResult.data?.id).not.toEqual(
      jobSeekerControllerSetSkillResultId,
    );
    expect(jobSeekerSkillControllerSetSkillResult.data).toMatchObject({
      level: OpWorkSkillLevel.ADVANCED,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: skillName },
    });
    jobSeekerControllerSetSkillResultId =
      jobSeekerSkillControllerSetSkillResult.data?.id;
  });

  it('Update skill options for job seeker profile', async () => {
    const jobSeekerSkillControllerSetSkillResult =
      await jobSeekerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          id: jobSeekerControllerSetSkillResultId,
          level: OpWorkSkillLevel.EXPERT,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
          jobSeekerId,
        },
      });
    expect(jobSeekerSkillControllerSetSkillResult.data).toMatchObject({
      id: jobSeekerControllerSetSkillResultId,
      level: OpWorkSkillLevel.EXPERT,
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

    const jobSeekerControllerGetProfileResult =
      await jobSeekerActivity.sdk.jobSeekerControllerGetProfile({
        query: { jobSeekerId: jobSeekerId || '' },
      });

    expect(jobSeekerControllerGetProfileResult.data).toMatchObject({
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
          level: OpWorkSkillLevel.ADVANCED,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillId: skillId,
          OpWorkSkill: { name: 'JavaScript' },
        },
        {
          level: OpWorkSkillLevel.EXPERT,
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
