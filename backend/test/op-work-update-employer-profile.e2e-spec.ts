import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
  OpWorkSkillImportance,
  OpWorkSkillLevel,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('OPWork: update employer profile (e2e)', () => {
  const employerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const skillName = getRandomSha7();

  let employerControllerSetProfileResultId: string | undefined;
  let jobId: string | undefined;

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
          location: 'Employer',
          email: employerActivity.authUser?.email,
        },
      });
    expect(
      profileControllerGetProfileResult?.data?.location || '',
    ).not.toContain('Employer');
    expect(profileControllerUpdateProfileResult?.data?.location).toContain(
      'Employer',
    );
  });

  it('Update employer profile', async () => {
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
    employerControllerSetProfileResultId =
      employerControllerSetProfileResult.data?.id;
  });

  it('Create employer job', async () => {
    const employeJobControllerSetJobResult =
      await employerActivity.sdk.employeJobControllerSetJob({
        body: {
          employerId: employerControllerSetProfileResultId || '',
          description: 'This is a test description.',
          employmentType: OpWorkEmploymentType.FULL_TIME,
          experienceLevel: OpWorkExperienceLevel.JUNIOR,
          requirements: 'These are the requirements.',
          responsibilities: 'These are the responsibilities.',
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 50000,
          salaryMax: 100000,
          location: 'San Francisco',
          department: 'Engineering',
          expiresAt: '2023-12-31T23:59:59.999Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          isRemote: false,
          salaryCurrency: 'USD',
        },
      });
    expect(employeJobControllerSetJobResult.data).toMatchObject({
      description: 'This is a test description.',
      employmentType: OpWorkEmploymentType.FULL_TIME,
      experienceLevel: OpWorkExperienceLevel.JUNIOR,
      requirements: 'These are the requirements.',
      responsibilities: 'These are the responsibilities.',
      status: OpWorkJobStatus.ACTIVE,
      title: 'Test Title',
      salaryMin: 50000,
      salaryMax: 100000,
      location: 'San Francisco',
      department: 'Engineering',
      expiresAt: '2023-12-31T23:59:59.999Z',
      publishedAt: '2023-01-01T00:00:00.000Z',
      isRemote: false,
      salaryCurrency: 'USD',
    });
    jobId = employeJobControllerSetJobResult.data?.id;
  });

  it('Create employer job skill', async () => {
    const skillId = (
      await employerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;

    const employerWorkSkillControllerSetJobSkillResult =
      await employerActivity.sdk.employerWorkSkillControllerSetJobSkill({
        path: { job_id: jobId || '' },
        body: {
          skillId,
          importance: OpWorkSkillImportance.BELOW_MEDIUM,
          isRequired: true,
          minLevel: OpWorkSkillLevel.ADVANCED,
        },
      });

    expect(employerWorkSkillControllerSetJobSkillResult.data).toMatchObject({
      skillId,
      importance: OpWorkSkillImportance.BELOW_MEDIUM,
      isRequired: true,
      minLevel: OpWorkSkillLevel.ADVANCED,
    });
  });

  it('Create employer job tags', async () => {
    const employerJobTagsControllerSetJobTagsResult =
      await employerActivity.sdk.employerJobTagsControllerSetJobTag({
        path: { job_id: jobId || '' },
        body: {
          name: 'MVP',
          color: '#FF0000',
        },
      });

    expect(employerJobTagsControllerSetJobTagsResult.data).toMatchObject({
      name: 'MVP',
      color: '#FF0000',
    });
  });

  it('Read employer profile', async () => {
    const skillId = (
      await employerActivity.sdk.opWorkSkillControllerFindMany({
        query: { searchText: 'JavaScript' },
      })
    )?.data?.items?.[0]?.id;

    const employerControllerGetProfileResult =
      await employerActivity.sdk.employerControllerGetProfile({
        path: { employer_id: employerControllerSetProfileResultId || '' },
      });

    expect(employerControllerGetProfileResult.data?.OpWorkJob).toHaveLength(1);
    expect(
      employerControllerGetProfileResult.data?.OpWorkJob?.[0].OpWorkJobSkill,
    ).toHaveLength(1);
    expect(
      employerControllerGetProfileResult.data?.OpWorkJob?.[0].opWorkJobTags,
    ).toHaveLength(1);

    expect(employerControllerGetProfileResult.data).toMatchObject({
      OpWorkJob: [
        {
          opWorkJobTags: [
            {
              name: 'MVP',
              color: '#FF0000',
            },
          ],
          OpWorkJobSkill: [
            {
              skillId,
              importance: OpWorkSkillImportance.BELOW_MEDIUM,
              isRequired: true,
              minLevel: OpWorkSkillLevel.ADVANCED,
            },
          ],
          description: 'This is a test description.',
          employmentType: OpWorkEmploymentType.FULL_TIME,
          experienceLevel: OpWorkExperienceLevel.JUNIOR,
          requirements: 'These are the requirements.',
          responsibilities: 'These are the responsibilities.',
          status: OpWorkJobStatus.ACTIVE,
          title: 'Test Title',
          salaryMin: 50000,
          salaryMax: 100000,
          location: 'San Francisco',
          department: 'Engineering',
          expiresAt: '2023-12-31T23:59:59.999Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          isRemote: false,
          salaryCurrency: 'USD',
        },
      ],
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
});
