import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import {
  FindManyVacancyResponse,
  OpWorkEmployer,
  OpWorkJobDto,
  OpWorkJobSkillDto,
  OpWorkProfileDto,
} from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('Resume: search (e2e)', () => {
  const employerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const jobSeeker1Activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const jobSeeker2Activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const employerData: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    employerControllerSetProfileResult?: OpWorkEmployer | undefined;
    employeJobControllerSetJobResult?: OpWorkJobDto | undefined;
    employerWorkSkillControllerSetJobSkillResult?:
      | OpWorkJobSkillDto
      | undefined;
  } = {};

  const jobSeeker1Data: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    jobSeekerControllerSetProfileResult?: OpWorkProfileDto | undefined;
  } = {};

  const jobSeeker2Data: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    jobSeekerControllerSetProfileResult?: OpWorkProfileDto | undefined;
  } = {};

  const resumeData: {
    resumeControllerFindManyResult?: FindManyVacancyResponse;
  } = {};

  const employer1SkillName = getRandomSha7();

  it('Register and login as two job seekers and one employer', async () => {
    await employerActivity.registerAndLoginRandomUser(UserType.EMPLOYER);
    await jobSeeker1Activity.registerAndLoginRandomUser(UserType.JOB_SEEKER);
    await jobSeeker2Activity.registerAndLoginRandomUser(UserType.JOB_SEEKER);
  });

  it('Create employer job of employer 1', async () => {
    const profileControllerSetProfileResult = await employerActivity.sdk
      .profileControllerSetProfile({
        body: {
          title: 'Employer1',
          email: employerActivity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const employerControllerSetProfileResult = await employerActivity.sdk
      .employerControllerSetProfile({
        body: {
          companyEmail: `employer${employerActivity.randomSha7}@example.com`,
          companyName: `ABC Company${employerActivity.randomSha7}`,
          companyPhone: '123-456-7890',
          companyWebsite: `https://www.abccompany${employerActivity.randomSha7}.com`,
          coverImageUrl: `https://www.abccompany${employerActivity.randomSha7}.com/cover-image.jpg`,
          culture: `Startup culture${employerActivity.randomSha7}`,
          mission: `Innovate and solve problems${employerActivity.randomSha7}`,
          description: `ABC Company is a startup that innovates and solves problems${employerActivity.randomSha7}.`,
          industry: `Technology${employerActivity.randomSha7}`,
          facebookUrl: `https://facebook.com/abccompany${employerActivity.randomSha7}`,
          twitterUrl: `https://twitter.com/abccompany${employerActivity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/abccompany${employerActivity.randomSha7}`,
          foundedYear: 2010,
          headquarters: `San Francisco${employerActivity.randomSha7}`,
          logoUrl: `https://www.abccompany${employerActivity.randomSha7}.com/logo.jpg`,
        },
      })
      .then(async ({ data }) => data);

    const employeJobControllerSetJobResult = await employerActivity.sdk
      .employeJobControllerSetJob({
        body: {
          description: `This is a test description${employerActivity.randomSha7}.`,
          employmentType: OpWorkEmploymentType.FULL_TIME,
          experienceLevel: OpWorkExperienceLevel.JUNIOR,
          requirements: `These are the requirements${employerActivity.randomSha7}.`,
          responsibilities: `These are the responsibilities${employerActivity.randomSha7}.`,
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 10000,
          salaryMax: 40000,
          location: `San Francisco${employerActivity.randomSha7}`,
          department: `Engineering${employerActivity.randomSha7}`,
          expiresAt: '2023-12-31T23:59:59.999Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          isRemote: false,
          salaryCurrency: 'USD',
        },
      })
      .then(async ({ data }) => data);

    const employerWorkSkillControllerSetJobSkillResult =
      await employerActivity.sdk
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

    Object.assign(employerData, {
      profileControllerSetProfileResult,
      employerControllerSetProfileResult,
      employeJobControllerSetJobResult,
      employerWorkSkillControllerSetJobSkillResult,
    });
  });

  it('Fill job seeker 1 profile data', async () => {
    const profileControllerSetProfileResult = await jobSeeker1Activity.sdk
      .profileControllerSetProfile({
        body: {
          title: `Software Engineer ${jobSeeker1Activity.randomSha7}`,
          email: jobSeeker1Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const jobSeekerControllerSetProfileResult = await jobSeeker1Activity.sdk
      .jobSeekerControllerSetProfile({
        body: {
          currentPosition: `Software Engineer ${jobSeeker1Activity.randomSha7}`,
          currentCompany: `ABC Company ${jobSeeker1Activity.randomSha7}`,
          expectedSalary: 100000,
          githubUrl: `https://github.com/username${jobSeeker1Activity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/username${jobSeeker1Activity.randomSha7}`,
          portfolioUrl: `https://portfolio.com/username${jobSeeker1Activity.randomSha7}`,
          preferredLocations: `New York, San Francisco ${jobSeeker1Activity.randomSha7}`,
          salaryCurrency: 'USD',
          isOpenToRelocation: true,
          isOpenToRemote: true,
          isOpenToWork: true,
          summary: `Software Engineer with 5 years of experience ${jobSeeker1Activity.randomSha7}`,
        },
      })
      .then(async ({ data }) => data);

    Object.assign(jobSeeker1Data, {
      profileControllerSetProfileResult,
      jobSeekerControllerSetProfileResult,
    });
  });

  it('Fill job seeker 2 profile data', async () => {
    const profileControllerSetProfileResult = await jobSeeker2Activity.sdk
      .profileControllerSetProfile({
        body: {
          title: `Software Engineer ${jobSeeker2Activity.randomSha7}`,
          email: jobSeeker2Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const jobSeekerControllerSetProfileResult = await jobSeeker2Activity.sdk
      .jobSeekerControllerSetProfile({
        body: {
          currentPosition: `Software Engineer ${jobSeeker2Activity.randomSha7}`,
          currentCompany: `ABC Company ${jobSeeker2Activity.randomSha7}`,
          expectedSalary: 500000,
          githubUrl: `https://github.com/username${jobSeeker2Activity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/username${jobSeeker2Activity.randomSha7}`,
          portfolioUrl: `https://portfolio.com/username${jobSeeker2Activity.randomSha7}`,
          preferredLocations: `New York, San Francisco ${jobSeeker2Activity.randomSha7}`,
          salaryCurrency: 'USD',
          isOpenToRelocation: false,
          isOpenToRemote: true,
          isOpenToWork: false,
          summary: `Software Engineer with 5 years of experience ${jobSeeker2Activity.randomSha7}`,
        },
      })
      .then(async ({ data }) => data);

    Object.assign(jobSeeker2Data, {
      profileControllerSetProfileResult,
      jobSeekerControllerSetProfileResult,
    });
  });

  it('Search for resume by location', async () => {
    const searchResult = await employerActivity.sdk
      .resumeControllerFindMany({
        query: {
          locations: [`San Francisco ${jobSeeker1Activity.randomSha7}`],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].preferredLocations).toContain(
      `New York, San Francisco ${jobSeeker1Activity.randomSha7}`,
    );
    expect(searchResult?.items[0].currentPosition).toContain(
      `Software Engineer ${jobSeeker1Activity.randomSha7}`,
    );
  });

  it('Search for resume by employment type', async () => {
    const searchResult = await employerActivity.sdk
      .resumeControllerFindMany({
        query: {
          isOpenToRelocation: false,
          locations: [`San Francisco ${jobSeeker2Activity.randomSha7}`],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].isOpenToRelocation).toBe(false);
    expect(searchResult?.items[0].currentPosition).toContain(
      `Software Engineer ${jobSeeker2Activity.randomSha7}`,
    );
  });

  it('Search for resume by salary', async () => {
    const searchResult = await employerActivity.sdk
      .resumeControllerFindMany({
        query: {
          salaryMin: 500000,
          locations: [`San Francisco ${jobSeeker2Activity.randomSha7}`],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult).toBeDefined();
    expect(searchResult?.items).toBeDefined();
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].expectedSalary).toEqual(500000);
    expect(searchResult?.items[0].salaryCurrency).toBe('USD');
  });

  it('Search for resume by text', async () => {
    const resumeControllerFindManyResult = await employerActivity.sdk
      .resumeControllerFindMany({
        query: {
          searchText: `Software Engineer with 5 years of experience ${jobSeeker1Activity.randomSha7}`,
        },
      })
      .then(async ({ data }) => data);
    expect(resumeControllerFindManyResult).toBeDefined();
    expect(resumeControllerFindManyResult?.items).toBeDefined();
    expect(resumeControllerFindManyResult?.items.length).toBeGreaterThanOrEqual(
      1,
    );
    expect(resumeControllerFindManyResult?.items[0].summary).toContain(
      `Software Engineer with 5 years of experience ${jobSeeker1Activity.randomSha7}`,
    );

    Object.assign(resumeData, {
      resumeControllerFindManyResult,
    });
  });
});
