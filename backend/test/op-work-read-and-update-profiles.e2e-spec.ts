import {
  OpWorkProfileType,
  OpWorkUserType,
} from '../src/generated/prisma/enums';
import { UserType } from '../src/types/auth-types';
import { ActivityHelper } from './utils/activity-helper';

describe('OPWork: Read and update profile (e2e)', () => {
  const jobSeekerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  it('Login', async () => {
    const result = await jobSeekerActivity.registerAndLoginRandomUser(
      UserType.JOB_SEEKER,
    );
    expect(result?.profile?.isActive).toBeTruthy();
    expect(result?.profile?.email).toContain('job_seeker');
  });

  it('Read profile', async () => {
    const result = await jobSeekerActivity.sdk.profileControllerGetProfile();
    expect(result?.data?.type).toContain(OpWorkProfileType.SPECIALIST);
    expect(result?.data?.userType).toContain(OpWorkUserType.JOB_SEEKER);
  });

  it('Update profile', async () => {
    const profileControllerGetProfileResult =
      await jobSeekerActivity.sdk.profileControllerGetProfile();
    const profileControllerUpdateProfileResult =
      await jobSeekerActivity.sdk.profileControllerSetProfile({
        body: {
          title: 'Software Engineer',
        },
      });
    expect(profileControllerGetProfileResult?.data?.title || '').not.toContain(
      'Software Engineer',
    );
    expect(profileControllerUpdateProfileResult?.data?.title).toContain(
      'Software Engineer',
    );
  });
});
