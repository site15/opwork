import { assert } from 'console';
import { ActivityHelper } from './utils/activity-helper';
import { AuthErrorEnum } from '../src/errors/auth.errors';

describe('OPWork: Check access rights for different user types (e2e)', () => {
  const jobSeekerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const employerActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const adminActivity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  const firstAdminApiKey = process.env.ADMIN_API_KEYS?.split(',')[0] || '';
  const firstJobSeekerApiKey =
    process.env.JOB_SEEKER_API_KEYS?.split(',')[0] || '';
  const firstEmployerApiKey =
    process.env.EMPLOYER_API_KEYS?.split(',')[0] || '';

  describe('Work as JOB_SEEKER', () => {
    it('Login', async () => {
      const result = await jobSeekerActivity.loginByApiKey({
        apiKey: firstJobSeekerApiKey,
      });
      expect(result?.isActive).toBeTruthy();
      expect(result?.email).toContain('job_seeker');
    });
    it('Read profile', async () => {
      const result =
        await jobSeekerActivity.sdk.opWorkProfileControllerFindMany({
          query: { userId: jobSeekerActivity.authUser?.id },
        });
      expect(result.data?.items.length).toBeGreaterThanOrEqual(1);
      expect(result.data?.items[0].AuthUser?.email).toContain('job_seeker');
      expect(result.data?.items[0].AuthUser?.id).toEqual(
        jobSeekerActivity.authUser?.id,
      );
    });

    it('Error on update profile', async () => {
      const opWorkProfileControllerFindManyResult =
        await jobSeekerActivity.sdk.opWorkProfileControllerFindMany({
          query: { userId: jobSeekerActivity.authUser?.id },
        });

      await expect(
        jobSeekerActivity.sdk.opWorkProfileControllerUpdateOne({
          path: {
            id: opWorkProfileControllerFindManyResult.data?.items[0].id!,
          },
          body: { email: 'profile_job_seeker@example.com' },
        }),
      ).rejects.toHaveProperty('code', AuthErrorEnum.METHOD_NOT_ALLOWED);
    });
  });

  describe('Work as EMPLOYER', () => {
    it('Login', async () => {
      const result = await employerActivity.loginByApiKey({
        apiKey: firstEmployerApiKey,
      });
      expect(result?.isActive).toBeTruthy();
      expect(result?.email).toContain('employer');
    });
    it('Read profile', async () => {
      const result = await employerActivity.sdk.opWorkProfileControllerFindMany(
        {
          query: { userId: employerActivity.authUser?.id },
        },
      );
      expect(result.data?.items.length).toBeGreaterThanOrEqual(1);
      expect(result.data?.items[0].AuthUser?.email).toContain('employer');
      expect(result.data?.items[0].AuthUser?.id).toEqual(
        employerActivity.authUser?.id,
      );
    });
    it('Error on update profile', async () => {
      const opWorkProfileControllerFindManyResult =
        await employerActivity.sdk.opWorkProfileControllerFindMany({
          query: { userId: employerActivity.authUser?.id },
        });

      await expect(
        employerActivity.sdk.opWorkProfileControllerUpdateOne({
          path: {
            id: opWorkProfileControllerFindManyResult.data?.items[0].id!,
          },
          body: { email: 'profile_employer@example.com' },
        }),
      ).rejects.toHaveProperty('code', AuthErrorEnum.METHOD_NOT_ALLOWED);
    });
  });

  describe('Work as ADMIN', () => {
    it('Login', async () => {
      const result = await adminActivity.loginByApiKey({
        apiKey: firstAdminApiKey,
      });
      expect(result?.isActive).toBeTruthy();
      expect(result?.email).toContain('admin');
    });
    it('Read profile', async () => {
      const result = await adminActivity.sdk.opWorkProfileControllerFindMany({
        query: { userId: adminActivity.authUser?.id },
      });
      expect(result.data?.items.length).toBeGreaterThanOrEqual(1);
      expect(result.data?.items[0].AuthUser?.email).toContain('admin');
      expect(result.data?.items[0].AuthUser?.id).toEqual(
        adminActivity.authUser?.id,
      );
    });

    it('Update profile', async () => {
      const opWorkProfileControllerFindManyResult =
        await adminActivity.sdk.opWorkProfileControllerFindMany({
          query: { userId: adminActivity.authUser?.id },
        });

      const opWorkProfileControllerUpdateOneResult =
        await adminActivity.sdk.opWorkProfileControllerUpdateOne({
          path: {
            id: opWorkProfileControllerFindManyResult.data?.items[0].id!,
          },
          body: { email: 'profile_admin@example.com' },
        });

      expect(opWorkProfileControllerFindManyResult.data?.items[0].id).toEqual(
        opWorkProfileControllerUpdateOneResult.data?.id,
      );
      expect(
        opWorkProfileControllerFindManyResult.data?.items.length,
      ).toBeGreaterThanOrEqual(1);
      expect(
        opWorkProfileControllerFindManyResult.data?.items[0].email,
      ).toEqual('profile_admin@example.com');
    });
  });
});
