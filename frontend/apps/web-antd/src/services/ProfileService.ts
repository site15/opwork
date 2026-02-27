import type { SetProfileArgs } from '#/generated/client';

import {
  profileControllerGetAllProfiles,
  profileControllerGetProfile,
  profileControllerSetProfile,
} from '#/generated/client';

import { client } from '../generated/client/client.gen';

export const X_PROFILE_ID = 'x-profile-id';

export class OpWorkProfileService {
  async checkAccess() {
    return localStorage.getItem('profileId') !== null;
  }

  async clean() {
    this.setProfileId(null);
  }

  async getProfile() {
    try {
      const result = await profileControllerGetProfile();

      if (result?.error) {
        throw Object.assign(
          new Error((result.error as any).error || 'Failed to get profile'),
          result.error,
        );
      }
      this.setProfileId(result.data.id);
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getProfileId() {
    return localStorage.getItem('profileId');
  }

  async getProfiles() {
    try {
      const result = await profileControllerGetAllProfiles();

      if (result?.error) {
        throw Object.assign(
          new Error((result.error as any).error || 'Failed to get profiles'),
          result.error,
        );
      }
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  init() {
    const profileId = this.getProfileId();
    if (profileId) {
      client.setConfig({
        headers: {
          [X_PROFILE_ID]: profileId,
        },
      });
    }
  }

  async setProfile(profile: SetProfileArgs) {
    try {
      const result = await profileControllerSetProfile({ body: profile });

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

  setProfileId(profileId: null | string) {
    const config = client.getConfig();
    client.setConfig({
      ...config,
      headers: {
        ...config.headers,
        [X_PROFILE_ID]: profileId,
      },
    });
    if (profileId) {
      return localStorage.setItem('profileId', profileId);
    }
    return localStorage.removeItem('profileId');
  }
}

export const opWorkProfileService = new OpWorkProfileService();
