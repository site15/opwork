import { AuthErrorEnum } from '../src/errors/auth.errors';
import { AuthUser } from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('Auth: Authentication flows (e2e)', () => {
  const activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const credentials = {
    email: `test_${getRandomSha7()}@example.com`,
    password: 'validPassword123',
  };
  let regProfile: AuthUser | null;
  let loginProfile: AuthUser | null;

  it('Registration flow', async () => {
    const result = await activity.register(credentials);
    regProfile = result?.profile || null;
    expect(result?.profile).not.toBeUndefined();
    expect(result?.sessionId).not.toBeUndefined();
  });

  it('Error on registration flow with duplicate credentials', async () => {
    await expect(
      activity.register({
        email: credentials.email,
        password: 'wrongPassword',
      }),
    ).rejects.toHaveProperty('code', AuthErrorEnum.ALREADY_EXISTS);
  });

  it('Error on login flow with wrong credentials', async () => {
    await expect(
      activity.login({
        email: credentials.email,
        password: 'wrongPassword',
      }),
    ).rejects.toHaveProperty('code', AuthErrorEnum.INVALID_CREDENTIALS);
  });

  it('Login flow', async () => {
    const result = await activity.login(credentials);
    loginProfile = result?.profile || null;
    expect(result?.profile).not.toBeUndefined();

    expect(regProfile).toMatchObject(loginProfile || {});
  });

  it('Get profile flow', async () => {
    const result = await activity.getProfile();
    expect(result).toMatchObject(loginProfile || {});
  });

  it('Logout flow', async () => {
    const result = await activity.logout();
    expect(result).toMatchObject({ message: 'ok' });
  });

  it('Error on get profile flow after logout', async () => {
    await expect(activity.getProfile()).rejects.toHaveProperty(
      'code',
      AuthErrorEnum.UNAUTHORIZED,
    );
  });
});
