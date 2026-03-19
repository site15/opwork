import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
  OpWorkSkillImportance,
  OpWorkSkillLevel,
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

describe('Vacancy: search (e2e)', () => {
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

  const vacancyData: {
    vacancyControllerFindManyResult?: FindManyVacancyResponse;
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
          location: 'Employer1',
          email: employer1Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const employerControllerSetProfileResult = await employer1Activity.sdk
      .employerControllerSetProfile({
        body: {
          companyEmail: `employer${employer1Activity.randomSha7}@example.com`,
          companyName: `ABC Company${employer1Activity.randomSha7}`,
          companyPhone: '123-456-7890',
          companyWebsite: `https://www.abccompany${employer1Activity.randomSha7}.com`,
          coverImageUrl: `https://www.abccompany${employer1Activity.randomSha7}.com/cover-image.jpg`,
          culture: `Startup culture${employer1Activity.randomSha7}`,
          mission: `Innovate and solve problems${employer1Activity.randomSha7}`,
          description: `ABC Company is a startup that innovates and solves problems${employer1Activity.randomSha7}.`,
          industry: `Technology${employer1Activity.randomSha7}`,
          facebookUrl: `https://facebook.com/abccompany${employer1Activity.randomSha7}`,
          twitterUrl: `https://twitter.com/abccompany${employer1Activity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/abccompany${employer1Activity.randomSha7}`,
          foundedYear: 2010,
          headquarters: `San Francisco${employer1Activity.randomSha7}`,
          logoUrl: `https://www.abccompany${employer1Activity.randomSha7}.com/logo.jpg`,
        },
      })
      .then(async ({ data }) => data);

    const employeJobControllerSetJobResult = await employer1Activity.sdk
      .employeJobControllerSetJob({
        body: {
          description: `This is a test description${employer1Activity.randomSha7}.`,
          employmentType: OpWorkEmploymentType.FULL_TIME,
          experienceLevel: OpWorkExperienceLevel.JUNIOR,
          requirements: `These are the requirements${employer1Activity.randomSha7}.`,
          responsibilities: `These are the responsibilities${employer1Activity.randomSha7}.`,
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 10000,
          salaryMax: 40000,
          location: `San Francisco${employer1Activity.randomSha7}`,
          department: `Engineering${employer1Activity.randomSha7}`,
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
            importance: OpWorkSkillImportance.HIGH,
            isRequired: true,
            minLevel: OpWorkSkillLevel.ADVANCED,
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
          location: 'Employer2',
          email: employer2Activity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const employerControllerSetProfileResult = await employer2Activity.sdk
      .employerControllerSetProfile({
        body: {
          companyEmail: `employer${employer2Activity.randomSha7}@example.com`,
          companyName: `ABC Company${employer2Activity.randomSha7}`,
          companyPhone: '123-456-7890',
          companyWebsite: `https://www.abccompany${employer2Activity.randomSha7}.com`,
          coverImageUrl: `https://www.abccompany${employer2Activity.randomSha7}.com/cover-image.jpg`,
          culture: `Startup culture${employer2Activity.randomSha7}`,
          mission: `Innovate and solve problems${employer2Activity.randomSha7}`,
          description: `ABC Company is a startup that innovates and solves problems${employer2Activity.randomSha7}.`,
          industry: `Technology${employer2Activity.randomSha7}`,
          facebookUrl: `https://facebook.com/abccompany${employer2Activity.randomSha7}`,
          twitterUrl: `https://twitter.com/abccompany${employer2Activity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/abccompany${employer2Activity.randomSha7}`,
          foundedYear: 2010,
          headquarters: 'San Francisco2',
          logoUrl: `https://www.abccompany${employer2Activity.randomSha7}.com/logo.jpg`,
        },
      })
      .then(async ({ data }) => data);

    const employeJobControllerSetJobResult = await employer2Activity.sdk
      .employeJobControllerSetJob({
        body: {
          description: `This is a test description${employer2Activity.randomSha7}.`,
          employmentType: OpWorkEmploymentType.PART_TIME,
          experienceLevel: OpWorkExperienceLevel.SENIOR,
          requirements: `These are the requirements${employer2Activity.randomSha7}.`,
          responsibilities: `These are the responsibilities${employer2Activity.randomSha7}.`,
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 50000,
          salaryMax: 100000,
          location: `San Francisco${employer2Activity.randomSha7}`,
          department: `Engineering${employer2Activity.randomSha7}`,
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
            importance: OpWorkSkillImportance.HIGH,
            isRequired: true,
            minLevel: OpWorkSkillLevel.ADVANCED,
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
          location: `Software Engineer ${jobSeekerActivity.randomSha7}`,
          email: jobSeekerActivity.authUser?.email,
        },
      })
      .then(async ({ data }) => data);

    const jobSeekerControllerSetProfileResult = await jobSeekerActivity.sdk
      .jobSeekerControllerSetProfile({
        body: {
          currentPosition: `Software Engineer ${jobSeekerActivity.randomSha7}`,
          currentCompany: `ABC Company ${jobSeekerActivity.randomSha7}`,
          expectedSalary: 100000,
          githubUrl: `https://github.com/username${jobSeekerActivity.randomSha7}`,
          linkedinUrl: `https://linkedin.com/in/username${jobSeekerActivity.randomSha7}`,
          portfolioUrl: `https://portfolio.com/username${jobSeekerActivity.randomSha7}`,
          preferredLocations: `New York, San Francisco ${jobSeekerActivity.randomSha7}`,
          salaryCurrency: 'USD',
          isOpenToRelocation: true,
          isOpenToRemote: true,
          isOpenToWork: true,
          summary: `Software Engineer with 5 years of experience ${jobSeekerActivity.randomSha7}`,
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
      .vacancyControllerFindMany({
        query: {
          locations: [
            'San Francisco4',
            `San Francisco${employer1Activity.randomSha7}`,
          ],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].title).toContain('Test Title');
    expect(searchResult?.items[0].location).toContain(
      `San Francisco${employer1Activity.randomSha7}`,
    );
  });

  it('Search for jobs by employment type', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          employmentTypes: [OpWorkEmploymentType.PART_TIME],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain(
      `San Francisco${employer2Activity.randomSha7}`,
    );
    expect(searchResult?.items[0].employmentType).toContain('PART_TIME');
  });

  it('Search for jobs by experience level', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          experienceLevels: [OpWorkExperienceLevel.JUNIOR],
          locations: [`San Francisco${employer1Activity.randomSha7}`],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain(
      `San Francisco${employer1Activity.randomSha7}`,
    );
    expect(searchResult?.items[0].experienceLevel).toContain('JUNIOR');
  });

  it('Search for jobs by salary', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          salaryMin: 50000,
          locations: [`San Francisco${employer2Activity.randomSha7}`],
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(1);
    expect(searchResult?.items[0].location).toContain(
      `San Francisco${employer2Activity.randomSha7}`,
    );
    expect(searchResult?.items[0].salaryMin).toBeGreaterThanOrEqual(50000);
  });

  it('Search for jobs by skill', async () => {
    const searchResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          skills: [employer1SkillName, employer2SkillName],
          sort: 'createdAt:asc',
        },
      })
      .then(async ({ data }) => data);
    expect(searchResult?.items.length).toBeGreaterThanOrEqual(2);
    expect(searchResult?.items[0].location).toContain(
      `San Francisco${employer1Activity.randomSha7}`,
    );
    expect(searchResult?.items[1].location).toContain(
      `San Francisco${employer2Activity.randomSha7}`,
    );

    expect(
      searchResult?.items[0].OpWorkJobSkill?.[0].OpWorkSkill?.name,
    ).toContain(employer1SkillName);
    expect(
      searchResult?.items[1].OpWorkJobSkill?.[0].OpWorkSkill?.name,
    ).toContain(employer2SkillName);
  });

  it('Search for jobs by text', async () => {
    const vacancyControllerFindManyResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          searchText: `This is a test description${employer2Activity.randomSha7}.`,
        },
      })
      .then(async ({ data }) => data);
    expect(
      vacancyControllerFindManyResult?.items.length,
    ).toBeGreaterThanOrEqual(1);
    expect(vacancyControllerFindManyResult?.items[0].description).toContain(
      `This is a test description${employer2Activity.randomSha7}.`,
    );

    expect(vacancyControllerFindManyResult?.items[0].applicationsCount).toEqual(
      0,
    );
    expect(
      vacancyControllerFindManyResult?.items[0].OpWorkApplication?.length || 0,
    ).toEqual(0);

    Object.assign(vacancyData, {
      vacancyControllerFindManyResult,
    });
  });

  it('Apply for a vacancy', async () => {
    const applyResult = await jobSeekerActivity.sdk
      .vacanyApplicationControllerApply({
        path: {
          vacancy_id: vacancyData.vacancyControllerFindManyResult?.items[0].id!,
        },
        body: {
          jobSeekerId: jobSeekerData.jobSeekerControllerSetProfileResult?.id!,
          coverLetter: `This is a cover letter${employer2Activity.randomSha7}.`,
        },
      })
      .then(async ({ data }) => data);
    expect(applyResult?.message).toEqual('ok');

    const vacancyControllerFindManyResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          searchText: `This is a test description${employer2Activity.randomSha7}.`,
        },
      })
      .then(async ({ data }) => data);
    expect(
      vacancyControllerFindManyResult?.items.length,
    ).toBeGreaterThanOrEqual(1);
    expect(vacancyControllerFindManyResult?.items[0].description).toContain(
      `This is a test description${employer2Activity.randomSha7}.`,
    );
    expect(vacancyControllerFindManyResult?.items[0].applicationsCount).toEqual(
      1,
    );
  });

  it('Check application of vaction', async () => {
    const vacancyControllerFindManyResult = await jobSeekerActivity.sdk
      .vacancyControllerFindOne({
        path: {
          vacancy_id: vacancyData.vacancyControllerFindManyResult?.items[0].id!,
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindManyResult?.description).toContain(
      `This is a test description${employer2Activity.randomSha7}.`,
    );
    expect(vacancyControllerFindManyResult?.applicationsCount).toEqual(1);
    expect(vacancyControllerFindManyResult?.OpWorkApplication?.length).toEqual(
      1,
    );
    expect(
      vacancyControllerFindManyResult?.OpWorkApplication?.[0].profileId,
    ).toEqual(jobSeekerData.profileControllerSetProfileResult?.id!);
    expect(
      vacancyControllerFindManyResult?.OpWorkApplication?.[0].jobSeekerId,
    ).toEqual(jobSeekerData.jobSeekerControllerSetProfileResult?.id!);
    expect(
      vacancyControllerFindManyResult?.OpWorkApplication?.[0].coverLetter,
    ).toEqual(`This is a cover letter${employer2Activity.randomSha7}.`);
  });
});
