import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  OpWorkJobStatus,
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

  it('Create employer work', async () => {
    const employerControllerSetEmployerWorkResult =
      await employerActivity.sdk.employerWorkControllerSetWork({
        body: {
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
    expect(employerControllerSetEmployerWorkResult.data).toMatchObject({
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
  });
});
