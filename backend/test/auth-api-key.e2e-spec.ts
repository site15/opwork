import { ActivityHelper } from './utils/activity-helper';

describe('Auth Api Key (e2e)', () => {
  const activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });

  it('login by ApiKey', async () => {
    const result = await activity.loginByApiKey({
      apiKey: process.env.ADMIN_API_KEYS?.split(',')[0] || '',
    });
    expect(result.isActive).toBeTruthy();
    expect(result.email).toContain('admin');
  });
});
