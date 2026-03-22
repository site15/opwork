import type { AuthUser, UserType } from '#/generated/client';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { $t } from '#/locales';
import { useAppAuthStore } from '#/services/AuthService';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();
  const appAuthStore = useAppAuthStore();
  const appOpWorkProfileStore = useAppOpWorkProfileStore();

  const loginLoading = ref(false);

  async function authLogin(
    params: { email: string; password: string },
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let authUser: AuthUser | null = null;
    try {
      loginLoading.value = true;
      authUser = await appAuthStore.login(params);

      userStore.setUserInfo({
        avatar: '',
        realName: '',
        userId: authUser?.id || '',
        username: '',
      });
      accessStore.setAccessToken(params.email || '');

      onSuccess
        ? await onSuccess?.()
        : await router.push(preferences.app.defaultHomePath);

      if (authUser?.id) {
        notification.success({
          message: $t('authentication.loginSuccess'),
          description: `${$t('authentication.loginSuccessDesc')}:${authUser?.id}`,
          duration: 3000,
        });
      }
    } catch (error) {
      notification.error({
        message: error instanceof Error ? error.message : '',
        description: $t('authentication.loginFailedDesc'),
        duration: 3000,
      });
    } finally {
      loginLoading.value = false;
    }

    return {
      authUser,
    };
  }

  async function authRegister(
    params: { email: string; password: string; userType: UserType },
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let authUser: AuthUser | null = null;
    try {
      loginLoading.value = true;
      authUser = await appAuthStore.register(params);

      userStore.setUserInfo({
        avatar: '',
        realName: '',
        userId: authUser?.id || '',
        username: '',
      });
      accessStore.setAccessToken(params.email || '');

      onSuccess
        ? await onSuccess?.()
        : await router.push(preferences.app.defaultHomePath);

      if (authUser?.id) {
        notification.success({
          message: $t('authentication.registerSuccess'),
          description: `${$t('authentication.registerSuccessDesc')}:${authUser?.id}`,
          duration: 3000,
        });
      }
    } catch (error) {
      notification.error({
        message: error instanceof Error ? error.message : '',
        description: $t('authentication.registerFailedDesc'),
        duration: 3000,
      });
    } finally {
      loginLoading.value = false;
    }

    return {
      authUser,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      appAuthStore.clean();
      appOpWorkProfileStore.clean();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    console.log('fetchUserInfo');
    let authUser: AuthUser | null = null;
    authUser = await appAuthStore.getProfile();
    await appOpWorkProfileStore.getProfile();
    const userInfo = {
      avatar: '',
      realName: '',
      userId: authUser?.id || '',
      username: '',
    };
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    authRegister,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
