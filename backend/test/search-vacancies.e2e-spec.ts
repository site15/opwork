import { Logger } from '@nestjs/common';
import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import {
  OpWorkProfileDto,
  OpWorkEmployer,
  OpWorkJobDto,
  OpWorkJobSkillDto,
} from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('Vacancies: search (e2e)', () => {
  const employer1Activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const employer2Activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const jobSeekerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const employer1Data: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    employerControllerSetProfileResult?: OpWorkEmployer | undefined;
    employeJobControllerSetJobResult?: OpWorkJobDto | undefined;
    employerWorkSkillControllerSetJobSkillResult?:
      | OpWorkJobSkillDto
      | undefined;
  } = {};

  const employer2Data: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    employerControllerSetProfileResult?: OpWorkEmployer | undefined;
    employeJobControllerSetJobResult?: OpWorkJobDto | undefined;
    employerWorkSkillControllerSetJobSkillResult?:
      | OpWorkJobSkillDto
      | undefined;
  } = {};

  const jobSeekerData: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    jobSeekerControllerSetProfileResult?: OpWorkProfileDto | undefined;
  } = {};

  const employer1SkillName = getRandomSha7();
  const employer2SkillName = getRandomSha7();

  it('Register and login as one job seeker and two employers', async () => {
    await employer1Activity.registerAndLoginRandomUser(UserType.EMPLOYER);
    await employer2Activity.registerAndLoginRandomUser(UserType.EMPLOYER);
    await jobSeekerActivity.registerAndLoginRandomUser(UserType.JOB_SEEKER);
  });

  it('Create employer job of employer 1', async () => {
    const profileControllerSetProfileResult = await employer1Activity.sdk
      .profileControllerSetProfile({
        body: {
          title: 'Employer1',
          email: employer1Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const employerControllerSetProfileResult = await employer1Activity.sdk
      .employerControllerSetProfile({
        body: {
          companyEmail: 'employer1@example.com',
          companyName: 'ABC Company1',
          companyPhone: '123-456-7890',
          companyWebsite: 'https://www.abccompany1.com',
          coverImageUrl: 'https://www.abccompany1.com/cover-image.jpg',
          culture: 'Startup culture1',
          mission: 'Innovate and solve problems1',
          description:
            'ABC Company is a startup that innovates and solves problems1.',
          industry: 'Technology1',
          facebookUrl: 'https://facebook.com/abccompany1',
          twitterUrl: 'https://twitter.com/abccompany1',
          linkedinUrl: 'https://linkedin.com/in/abccompany1',
          foundedYear: 2010,
          headquarters: 'San Francisco1',
          logoUrl: 'https://www.abccompany.com/logo.jpg',
        },
      })
      .then(async ({ data }) => data);

    const employeJobControllerSetJobResult = await employer1Activity.sdk
      .employeJobControllerSetJob({
        body: {
          description: 'This is a test description1.',
          employmentType: OpWorkEmploymentType.FULL_TIME,
          experienceLevel: OpWorkExperienceLevel.JUNIOR,
          requirements: 'These are the requirements1.',
          responsibilities: 'These are the responsibilities1.',
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 10000,
          salaryMax: 40000,
          location: 'San Francisco1',
          department: 'Engineering1',
          expiresAt: '2023-12-31T23:59:59.999Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          isRemote: false,
          salaryCurrency: 'USD',
        },
      })
      .then(async ({ data }) => data);

    const employerWorkSkillControllerSetJobSkillResult =
      await employer1Activity.sdk
        .employerWorkSkillControllerSetJobSkill({
          path: { job_id: employeJobControllerSetJobResult?.id || '' },
          body: {
            skillName: employer1SkillName,
            importance: 1,
            isRequired: true,
            minLevel: 1,
          },
        })
        .then(async ({ data }) => data);

    Object.assign(employer1Data, {
      profileControllerSetProfileResult,
      employerControllerSetProfileResult,
      employeJobControllerSetJobResult,
      employerWorkSkillControllerSetJobSkillResult,
    });
  });

  it('Create employer job of employer 2', async () => {
    const profileControllerSetProfileResult = await employer2Activity.sdk
      .profileControllerSetProfile({
        body: {
          title: 'Employer2',
          email: employer2Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const employerControllerSetProfileResult = await employer2Activity.sdk
      .employerControllerSetProfile({
        body: {
          companyEmail: 'employer2@example.com',
          companyName: 'ABC Company2',
          companyPhone: '123-456-7890',
          companyWebsite: 'https://www.abccompany2.com',
          coverImageUrl: 'https://www.abccompany2.com/cover-image.jpg',
          culture: 'Startup culture2',
          mission: 'Innovate and solve problems2',
          description:
            'ABC Company is a startup that innovates and solves problems2.',
          industry: 'Technology2',
          facebookUrl: 'https://facebook.com/abccompany2',
          twitterUrl: 'https://twitter.com/abccompany2',
          linkedinUrl: 'https://linkedin.com/in/abccompany2',
          foundedYear: 2010,
          headquarters: 'San Francisco2',
          logoUrl: 'https://www.abccompany.com/logo.jpg',
        },
      })
      .then(async ({ data }) => data);

    const employeJobControllerSetJobResult = await employer2Activity.sdk
      .employeJobControllerSetJob({
        body: {
          description: 'This is a test description2.',
          employmentType: OpWorkEmploymentType.PART_TIME,
          experienceLevel: OpWorkExperienceLevel.SENIOR,
          requirements: 'These are the requirements2.',
          responsibilities: 'These are the responsibilities2.',
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 50000,
          salaryMax: 100000,
          location: 'San Francisco2',
          department: 'Engineering2',
          expiresAt: '2023-12-31T23:59:59.999Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          isRemote: false,
          salaryCurrency: 'USD',
        },
      })
      .then(async ({ data }) => data);

    const employerWorkSkillControllerSetJobSkillResult =
      await employer2Activity.sdk
        .employerWorkSkillControllerSetJobSkill({
          path: { job_id: employeJobControllerSetJobResult?.id || '' },
          body: {
            skillName: employer2SkillName,
            importance: 1,
            isRequired: true,
            minLevel: 1,
          },
        })
        .then(async ({ data }) => data);

    Object.assign(employer2Data, {
      profileControllerSetProfileResult,
      employerControllerSetProfileResult,
      employeJobControllerSetJobResult,
      employerWorkSkillControllerSetJobSkillResult,
    });
  });

  it('Fill job seeker profile data', async () => {
    const profileControllerSetProfileResult = await jobSeekerActivity.sdk
      .profileControllerSetProfile({
        body: {
          title: 'Software Engineer',
          email: jobSeekerActivity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const jobSeekerControllerSetProfileResult = await jobSeekerActivity.sdk
      .jobSeekerControllerSetProfile({
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
      })
      .then(async ({ data }) => data);

    Object.assign(jobSeekerData, {
      profileControllerSetProfileResult,
      jobSeekerControllerSetProfileResult,
    });
  });

  it('Search for jobs by location', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          locations: ['San Francisco4', 'San Francisco1'],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].title).toContain('Test Title');
    expect(searchResult?.items[0].location).toContain('San Francisco1');
  });

  it('Search for jobs by employment type', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          employmentTypes: [OpWorkEmploymentType.PART_TIME],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain('San Francisco2');
    expect(searchResult?.items[0].employmentType).toContain('PART_TIME');
  });

  it('Search for jobs by experience level', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          experienceLevels: [OpWorkExperienceLevel.JUNIOR],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain('San Francisco1');
    expect(searchResult?.items[0].experienceLevel).toContain('JUNIOR');
  });

  it('Search for jobs by salary', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          salaryMin: 50000,
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain('San Francisco2');
    expect(searchResult?.items[0].salaryMin).toBeGreaterThanOrEqual(50000);
  });

  it('Search for jobs by skill', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          skills: [employer1SkillName, employer2SkillName],
          sort: 'createdAt:asc',
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(2);
    expect(searchResult?.items[0].location).toContain('San Francisco1');
    expect(searchResult?.items[1].location).toContain('San Francisco2');

    expect(
      searchResult?.items[0].OpWorkJobSkill?.[0].OpWorkSkill?.name,
    ).toContain(employer1SkillName);
    expect(
      searchResult?.items[1].OpWorkJobSkill?.[0].OpWorkSkill?.name,
    ).toContain(employer2SkillName);
  });

  it('Search for jobs by text', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacanciesControllerFindMany({
        query: {
          searchText: 'This is a test description2.',
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].description).toContain(
      'This is a test description2.',
    );
  });
});
