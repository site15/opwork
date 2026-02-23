import {
  authControllerProfile,
  authControllerSignIn,
} from '#/generated/client';

import { client } from '../generated/client/client.gen';

export const X_SESSION_ID = 'x-session-id';

export class AuthService {
  async checkAccess() {
    return localStorage.getItem('sessionId') !== null;
  }

  getApiKey() {
    return localStorage.getItem('sessionId');
  }

  async getProfile() {
    try {
      const result = await authControllerProfile();

      if (result?.error) {
        throw Object.assign(
          new Error((result.error as any).error || 'Failed to get profile'),
          result.error,
        );
      }
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const result = await authControllerSignIn({ body: { email, password } });

      if (result?.error) {
        throw Object.assign(
          new Error(
            (result.error as any).error ||
              'Invalid credentials, please try again',
          ),
          result.error,
        );
      }

      const sessionId = result.data.sessionId;

      localStorage.setItem('sessionId', sessionId);
      client.setConfig({ headers: { [X_SESSION_ID]: sessionId } });
      return result.data.profile;
    } catch (error) {
      localStorage.removeItem('sessionId');
      client.setConfig({ headers: { [X_SESSION_ID]: null } });
      console.error(error);
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('sessionId');
    client.setConfig({ headers: { [X_SESSION_ID]: null } });
  }
}

export const authService = new AuthService();
