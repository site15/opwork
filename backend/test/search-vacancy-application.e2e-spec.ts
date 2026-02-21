import {
  OpWorkApplicationStatus,
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import {
  FindManyVacancyResponse,
  OpWorkEmployer,
  OpWorkJob,
  OpWorkJobDto,
  OpWorkJobSkillDto,
  OpWorkProfileDto,
} from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('Vacancy: work with applications (e2e)', () => {
  const employerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const jobSeekerActivity = new ActivityHelper({
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

  const jobSeekerData: {
    profileControllerSetProfileResult?: OpWorkProfileDto | undefined;
    jobSeekerControllerSetProfileResult?: OpWorkProfileDto | undefined;
  } = {};

  let globalVacancyControllerFindManyResult:
    | FindManyVacancyResponse
    | undefined;

  let globalVacancyControllerFindOneResult: OpWorkJob | undefined;

  const employerSkillName = getRandomSha7();

  it('Register and login as one job seeker and employer', async () => {
    await employerActivity.registerAndLoginRandomUser(UserType.EMPLOYER);
    await jobSeekerActivity.registerAndLoginRandomUser(UserType.JOB_SEEKER);
  });

  it('Create employer job of employer', async () => {
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
            skillName: employerSkillName,
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

  it('Create job seekr and fill job seeker profile data', async () => {
    const profileControllerSetProfileResult = await jobSeekerActivity.sdk
      .profileControllerSetProfile({
        body: {
          title: `Software Engineer ${jobSeekerActivity.randomSha7}`,
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

  it('As job seeker search for jobs by location', async () => {
    const vacancyControllerFindManyResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          locations: [
            'San Francisco4',
            `San Francisco${employerActivity.randomSha7}`,
          ],
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindManyResult).toBeDefined();
    expect(vacancyControllerFindManyResult?.items).toBeDefined();
    expect(
      vacancyControllerFindManyResult?.items.length,
    ).toBeGreaterThanOrEqual(1);
    expect(vacancyControllerFindManyResult?.items[0].title).toContain(
      'Test Title',
    );
    expect(vacancyControllerFindManyResult?.items[0].location).toContain(
      `San Francisco${employerActivity.randomSha7}`,
    );
    globalVacancyControllerFindManyResult = vacancyControllerFindManyResult;
  });

  it('As job seeker apply for a vacancy', async () => {
    const applyResult = await jobSeekerActivity.sdk
      .vacanyApplicationControllerApply({
        path: {
          vacancy_id: globalVacancyControllerFindManyResult?.items[0].id!,
        },
        body: {
          jobSeekerId: jobSeekerData.jobSeekerControllerSetProfileResult?.id!,
          coverLetter: `This is a cover letter${employerActivity.randomSha7}.`,
        },
      })
      .then(async ({ data }) => data);
    expect(applyResult).toBeDefined();
    expect(applyResult?.message).toEqual('ok');

    const vacancyControllerFindManyResult = await jobSeekerActivity.sdk
      .vacancyControllerFindMany({
        query: {
          searchText: `This is a test description${employerActivity.randomSha7}.`,
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindManyResult).toBeDefined();
    expect(vacancyControllerFindManyResult?.items).toBeDefined();
    expect(
      vacancyControllerFindManyResult?.items.length,
    ).toBeGreaterThanOrEqual(1);
    expect(vacancyControllerFindManyResult?.items[0].description).toContain(
      `This is a test description${employerActivity.randomSha7}.`,
    );
    expect(vacancyControllerFindManyResult?.items[0].applicationsCount).toEqual(
      1,
    );
  });

  it('As job seeker check application of vaction', async () => {
    const vacancyControllerFindOneResult = await jobSeekerActivity.sdk
      .vacancyControllerFindOne({
        path: {
          vacancy_id: globalVacancyControllerFindManyResult?.items[0].id!,
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindOneResult).toBeDefined();

    expect(vacancyControllerFindOneResult?.applicationsCount).toEqual(1);
    expect(vacancyControllerFindOneResult?.OpWorkApplication?.length).toEqual(
      1,
    );
    expect(
      vacancyControllerFindOneResult?.OpWorkApplication?.[0].profileId,
    ).toEqual(jobSeekerData.profileControllerSetProfileResult?.id!);
    expect(
      vacancyControllerFindOneResult?.OpWorkApplication?.[0].jobSeekerId,
    ).toEqual(jobSeekerData.jobSeekerControllerSetProfileResult?.id!);
    globalVacancyControllerFindOneResult = vacancyControllerFindOneResult;
  });

  it('As employer check application of vaction', async () => {
    const vacancyControllerFindOneResult = await employerActivity.sdk
      .vacancyControllerFindOne({
        path: {
          vacancy_id: globalVacancyControllerFindManyResult?.items[0].id!,
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindOneResult).toBeDefined();

    expect(vacancyControllerFindOneResult?.applicationsCount).toEqual(1);
    expect(vacancyControllerFindOneResult?.OpWorkApplication?.length).toEqual(
      1,
    );
    expect(
      vacancyControllerFindOneResult?.OpWorkApplication?.[0].profileId,
    ).toEqual(jobSeekerData.profileControllerSetProfileResult?.id!);
    expect(
      vacancyControllerFindOneResult?.OpWorkApplication?.[0].jobSeekerId,
    ).toEqual(jobSeekerData.jobSeekerControllerSetProfileResult?.id!);
    expect(
      vacancyControllerFindOneResult?.OpWorkApplication?.[0].status,
    ).toEqual(OpWorkApplicationStatus.PENDING);
    globalVacancyControllerFindOneResult = vacancyControllerFindOneResult;
  });

  it('As employer change status of aplication', async () => {
    await employerActivity.sdk.vacanyApplicationControllerChangeStatus({
      path: {
        vacancy_id: globalVacancyControllerFindOneResult?.id!,
        id:
          globalVacancyControllerFindOneResult?.OpWorkApplication?.[0].id || '',
      },
      body: {
        status: OpWorkApplicationStatus.INTERVIEW,
      },
    });

    const vacancyControllerFindManyResult = await employerActivity.sdk
      .vacancyControllerFindOne({
        path: {
          vacancy_id: globalVacancyControllerFindOneResult?.id!,
        },
      })
      .then(async ({ data }) => data);
    expect(vacancyControllerFindManyResult).toBeDefined();

    expect(
      vacancyControllerFindManyResult?.OpWorkApplication?.[0].status,
    ).toEqual(OpWorkApplicationStatus.INTERVIEW);
  });
});
