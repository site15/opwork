import type { OpWorkProfileDto, SetProfileArgs } from '#/generated/client';

import { ref, watch } from 'vue';

import { defineStore } from 'pinia';

import {
  profileControllerGetAllProfiles,
  profileControllerGetProfile,
  profileControllerSetProfile,
} from '#/generated/client';
import { unwrap } from '#/utils/unwrap';

import { client } from '../generated/client/client.gen';

export const X_PROFILE_ID = 'x-profile-id';

export const useAppOpWorkProfileStore = defineStore(
  'opWorkProfileStore',
  () => {
    const profile = ref<null | OpWorkProfileDto>(null);
    const profileId = ref<null | string>(null);

    function syncHeader(id: null | string) {
      const config = client.getConfig();

      client.setConfig({
        ...config,
        headers: {
          ...config.headers,
          [X_PROFILE_ID]: id,
        },
      });
    }

    watch(profileId, syncHeader, { immediate: true });

    function init() {
      syncHeader(profileId.value);
    }

    // 🔥 явно вызываем для синхронного обновления хедера
    function updateProfileHeader(id: null | string) {
      profileId.value = id;
      syncHeader(id);
    }

    function checkAccess() {
      return profileId.value !== null;
    }

    function clean() {
      profile.value = null;
      profileId.value = null;
    }

    function setProfileId(id: null | string) {
      profileId.value = id;
    }

    async function getProfile() {
      const result = unwrap(await profileControllerGetProfile());

      profile.value = result;
      setProfileId(result.id);

      return result;
    }

    async function getProfiles() {
      const result = unwrap(await profileControllerGetAllProfiles());

      return result;
    }

    async function setProfile(payload: SetProfileArgs) {
      const result = unwrap(
        await profileControllerSetProfile({
          body: payload,
        }),
      );

      profile.value = result;
      setProfileId(result.id);

      return result;
    }

    function $reset() {
      clean();
    }

    return {
      init,
      profile,
      profileId,
      clean,
      checkAccess,
      getProfile,
      getProfiles,
      setProfile,
      setProfileId,
      updateProfileHeader,
      $reset,
    };
  },
  {
    persist: {
      key: 'op-work-profile',
      storage: localStorage,

      // 💡 важно: сохраняем только нужное
      pick: ['profileId'],
    },
  },
);
