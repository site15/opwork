import { authControllerInfo, authControllerSignIn } from '#/generated/client';

import { client } from '../generated/client/client.gen';

export const X_SESSION_ID = 'x-session-id';

export class AuthService {
  async checkAccess() {
    return localStorage.getItem('sessionId') !== null;
  }

  async clean() {
    this.setSessionId(null);
  }

  async getProfile() {
    try {
      const result = await authControllerInfo();

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

  getSessionId() {
    return localStorage.getItem('sessionId');
  }

  init() {
    const sessionId = this.getSessionId();
    if (sessionId) {
      client.setConfig({
        headers: {
          [X_SESSION_ID]: sessionId,
        },
      });
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

      this.setSessionId(result.data.sessionId);
      return result.data.profile;
    } catch (error) {
      this.setSessionId(null);
      console.error(error);
      throw error;
    }
  }

  setSessionId(sessionId: null | string) {
    const config = client.getConfig();
    client.setConfig({
      ...config,
      headers: {
        ...config.headers,
        [X_SESSION_ID]: sessionId,
      },
    });
    if (sessionId) {
      return localStorage.setItem('sessionId', sessionId);
    }
    return localStorage.removeItem('sessionId');
  }
}

export const authService = new AuthService();
