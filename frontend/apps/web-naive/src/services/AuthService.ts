import { authControllerProfile } from '#/generated/client';

import { client } from '../generated/client/client.gen';

export const X_API_KEY = 'x-api-key';

export class AuthService {
  async checkAccess() {
    return localStorage.getItem('apiKey') !== null;
  }

  getApiKey() {
    return localStorage.getItem('apiKey');
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

  async login({ apiKey }: { apiKey: string }) {
    try {
      const result = await authControllerProfile({
        headers: { [X_API_KEY]: apiKey },
      });

      if (result?.error) {
        throw Object.assign(
          new Error(
            (result.error as any).error ||
              'Invalid credentials, please try again',
          ),
          result.error,
        );
      }

      localStorage.setItem('apiKey', apiKey);
      client.setConfig({ headers: { [X_API_KEY]: apiKey } });
      return result.data;
    } catch (error) {
      localStorage.removeItem('apiKey');
      client.setConfig({ headers: { [X_API_KEY]: null } });
      console.error(error);
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('apiKey');
    client.setConfig({ headers: { [X_API_KEY]: null } });
  }
}

export const authService = new AuthService();
