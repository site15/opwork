import { AuthErrorEnum } from '../src/errors/auth.errors';
import { AuthUser, SignInArgs } from './generated/client';
import { ActivityHelper } from './utils/activity-helper';
import { getRandomSha7 } from './utils/utils';

describe('Auth: Authentication flows (e2e)', () => {
  const activity = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const activity2 = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const activity3 = new ActivityHelper({
    baseUrl: process.env.VITE_GLOB_API_URL,
  });
  const credentials: SignInArgs = {
    email: `test_${getRandomSha7()}@example.com`,
    password: 'validPassword123',
    userType: 'JOB_SEEKER',
  };

  const newEmail = `test_${getRandomSha7()}_new@example.com`;
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
      activity2.register({
        email: credentials.email,
        password: 'wrongPassword',
        userType: 'JOB_SEEKER',
      }),
    ).rejects.toHaveProperty('code', AuthErrorEnum.ALREADY_EXISTS);
  });

  it('Error on login flow with wrong credentials', async () => {
    await expect(
      activity3.login({
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
    const result = await activity.getAuthProfile();
    expect(result).toMatchObject(loginProfile || {});
  });

  it('Change password flow', async () => {
    const newPassword = 'newValidPassword456';
    const result = await activity.changePassword({
      currentPassword: credentials.password,
      newPassword,
    });
    expect(result).toMatchObject({ message: 'ok' });

    // Verify can login with new password
    await activity.logout();
    const loginResult = await activity.login({
      email: credentials.email,
      password: newPassword,
    });
    expect(loginResult?.profile).not.toBeUndefined();
  });

  it('Error on change password with wrong current password', async () => {
    await expect(
      activity.changePassword({
        currentPassword: 'wrongCurrentPassword',
        newPassword: 'anotherNewPassword789',
      }),
    ).rejects.toHaveProperty('code', AuthErrorEnum.INVALID_CREDENTIALS);
  });

  it('Change email flow', async () => {
    const result = await activity.changeEmail({ newEmail });
    expect(result).toMatchObject({ message: 'ok' });

    // Verify profile has updated email
    const profile = await activity.getAuthProfile();
    expect(profile?.email).toBe(newEmail);

    // Verify can login with new email
    await activity.logout();
    const loginResult = await activity.login({
      email: newEmail,
      password: 'newValidPassword456',
    });
    expect(loginResult?.profile).not.toBeUndefined();
  });

  it('Error on change email with duplicate email', async () => {
    const duplicateEmail = `test_${getRandomSha7()}@example.com`;

    // Register another user
    await activity2.registerAndLogin({
      email: duplicateEmail,
      password: 'validPassword123',
      userType: 'JOB_SEEKER',
    });

    // Try to change first user's email to the duplicate
    await activity.logout();
    await activity.login({
      email: newEmail,
      password: 'newValidPassword456',
    });

    await expect(
      activity.changeEmail({ newEmail: duplicateEmail }),
    ).rejects.toHaveProperty('code', AuthErrorEnum.ALREADY_EXISTS);
  });

  it('Logout flow', async () => {
    const result = await activity.logout();
    expect(result).toMatchObject({ message: 'ok' });
  });

  it('Error on get profile flow after logout', async () => {
    await expect(activity.getAuthProfile()).rejects.toHaveProperty(
      'code',
      AuthErrorEnum.UNAUTHORIZED,
    );
  });
});
