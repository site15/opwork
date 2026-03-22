import { ref, watch } from 'vue';

import { defineStore } from 'pinia';

import { authControllerInfo, authControllerSignIn } from '#/generated/client';
import { unwrap } from '#/utils/unwrap';

import { client } from '../generated/client/client.gen';

export const X_SESSION_ID = 'x-session-id';

export const useAppAuthStore = defineStore(
  'authStore',
  () => {
    // ================= STATE =================
    const sessionId = ref<null | string>(null);
    const profile = ref<any | null>(null);

    // ================= INTERNAL =================
    function syncHeader(id: null | string) {
      const config = client.getConfig();

      client.setConfig({
        ...config,
        headers: {
          ...config.headers,
          [X_SESSION_ID]: id,
        },
      });
    }

    // 🔥 реактивная магия вместо init()
    watch(sessionId, syncHeader, { immediate: true });

    function init() {
      syncHeader(sessionId.value);
    }

    // ================= ACTIONS =================

    function checkAccess() {
      return sessionId.value !== null;
    }

    function clean() {
      sessionId.value = null;
      profile.value = null;
    }

    function setSessionId(id: null | string) {
      sessionId.value = id;
    }

    async function getProfile() {
      try {
        const data = unwrap(
          await authControllerInfo(),
          'Failed to get profile',
        );

        profile.value = data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function login({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      try {
        const data = unwrap(
          await authControllerSignIn({
            body: { email, password },
          }),
          'Invalid credentials, please try again',
        );

        sessionId.value = data.sessionId;
        profile.value = data.profile;

        return data.profile;
      } catch (error) {
        // важно: сбрасываем состояние при ошибке
        sessionId.value = null;
        profile.value = null;

        console.error(error);
        throw error;
      }
    }

    function $reset() {
      clean();
    }

    return {
      init,

      // state
      sessionId,
      profile,

      // actions
      checkAccess,
      clean,
      getProfile,
      login,
      setSessionId,

      $reset,
    };
  },
  {
    persist: {
      key: 'auth-store',
      storage: localStorage,

      // 💡 сохраняем только сессию
      pick: ['sessionId'],
    },
  },
);
