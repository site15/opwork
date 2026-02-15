import {
  OpWorkEducationDegree,
  OpWorkEmploymentType,
  OpWorkGrade,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('OPWork: update job employer profile (e2e)', () => {
  const employerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const skillName = getRandomSha7();

  let employerControllerSetSkillResultId: string | undefined;

  it('Login', async () => {
    const result = await employerActivity.registerAndLoginRandomUser(
      UserType.EMPLOYER,
    );
    expect(result?.profile?.isActive).toBeTruthy();
    expect(result?.profile?.email).toContain('employer');
  });

  it('Update profile', async () => {
    const profileControllerGetProfileResult =
      await employerActivity.sdk.profileControllerGetProfile();
    const profileControllerUpdateProfileResult =
      await employerActivity.sdk.profileControllerSetProfile({
        body: {
          title: 'Employer',
          email: employerActivity.authUser?.email,
        },
      });
    expect(profileControllerGetProfileResult?.data?.title || '').not.toContain(
      'Employer',
    );
    expect(profileControllerUpdateProfileResult?.data?.title).toContain(
      'Employer',
    );
  });

  it('Update job employer profile', async () => {
    const employerControllerSetProfileResult =
      await employerActivity.sdk.employerControllerSetProfile({
        body: {
          companyEmail: 'employer@example.com',
          companyName: 'ABC Company',
          companyPhone: '123-456-7890',
          companyWebsite: 'https://www.abccompany.com',
          coverImageUrl: 'https://www.abccompany.com/cover-image.jpg',
          culture: 'Startup culture',
          mission: 'Innovate and solve problems',
          description:
            'ABC Company is a startup that innovates and solves problems.',
          industry: 'Technology',
          facebookUrl: 'https://facebook.com/abccompany',
          twitterUrl: 'https://twitter.com/abccompany',
          linkedinUrl: 'https://linkedin.com/in/abccompany',
          foundedYear: 2010,
          headquarters: 'San Francisco',
          logoUrl: 'https://www.abccompany.com/logo.jpg',
        },
      });
    expect(employerControllerSetProfileResult.data).toMatchObject({
      companyEmail: 'employer@example.com',
      companyName: 'ABC Company',
      companyPhone: '123-456-7890',
      companyWebsite: 'https://www.abccompany.com',
      coverImageUrl: 'https://www.abccompany.com/cover-image.jpg',
      culture: 'Startup culture',
      mission: 'Innovate and solve problems',
      description:
        'ABC Company is a startup that innovates and solves problems.',
      industry: 'Technology',
      facebookUrl: 'https://facebook.com/abccompany',
      twitterUrl: 'https://twitter.com/abccompany',
      linkedinUrl: 'https://linkedin.com/in/abccompany',
      foundedYear: 2010,
      headquarters: 'San Francisco',
      logoUrl: 'https://www.abccompany.com/logo.jpg',
    });
  });

  /*
  it('Create education for job seeker profile', async () => {
    const jobSeekerControllerSetEducationResult =
      await employerActivity.sdk.jobSeekerEducationControllerSetEducation({
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
      await employerActivity.sdk.jobSeekerExperienceControllerSetExperience({
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
      await employerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;
    const jobSeekerControllerSetSkillResult =
      await employerActivity.sdk.jobSeekerSkillControllerSetSkill({
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
    employerControllerSetSkillResultId =
      jobSeekerControllerSetSkillResult.data?.id;
  });

  it('Create skill with random name for job seeker profile', async () => {
    const jobSeekerControllerSetSkillResult =
      await employerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          level: 5,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
        },
      });

    expect(jobSeekerControllerSetSkillResult.data?.id).not.toEqual(
      employerControllerSetSkillResultId,
    );
    expect(jobSeekerControllerSetSkillResult.data).toMatchObject({
      level: 5,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: skillName },
    });
    employerControllerSetSkillResultId =
      jobSeekerControllerSetSkillResult.data?.id;
  });

  it('Update skill options for job seeker profile', async () => {
    const jobSeekerControllerUpdateSkillResult =
      await employerActivity.sdk.jobSeekerSkillControllerSetSkill({
        body: {
          id: employerControllerSetSkillResultId,
          level: 6,
          isPrimary: true,
          lastUsed: new Date('2020-09-01').toISOString(),
          yearsOfExp: 2,
          skillName,
        },
      });
    expect(jobSeekerControllerUpdateSkillResult.data).toMatchObject({
      id: employerControllerSetSkillResultId,
      level: 6,
      isPrimary: true,
      lastUsed: new Date('2020-09-01').toISOString(),
      yearsOfExp: 2,
      OpWorkSkill: { name: skillName },
    });
  });

  it('Read job seeker profile', async () => {
    const skillId = (
      await employerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;
    const jobSeekerControllerGetJobSeekerProfileResult =
      await employerActivity.sdk.jobSeekerControllerGetProfile();
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
  });*/
});
