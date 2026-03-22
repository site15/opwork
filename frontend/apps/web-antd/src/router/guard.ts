import type { Router, RouteRecordRaw } from 'vue-router';

import type { RouteMeta } from '@vben/types';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

export type TPermissions = {
  type?: ('EMPLOYER' | 'SPECIALIST')[];
  userTypes?: ('ADMIN' | 'EMPLOYER' | 'JOB_SEEKER')[];
};

export function setupProfileWatcher(router: Router) {
  const accessStore = useAccessStore();
  const appOpWorkProfileStore = useAppOpWorkProfileStore();

  const accessGuard = (
    menuItem: RouteMeta & { permissions?: TPermissions },
  ) => {
    const profile = appOpWorkProfileStore.profile;
    if (
      !profile ||
      (!menuItem.permissions?.userTypes && !menuItem.permissions?.type)
    ) {
      return true;
    }

    if (profile.type === 'EMPLOYER' || profile.type === 'SPECIALIST') {
      return (
        !!menuItem.permissions.type?.includes(profile.type) ||
        !!menuItem.permissions.userTypes?.includes(profile.userType)
      );
    }

    return false;
  };

  const filterMenus = (items: RouteRecordRaw[]): RouteRecordRaw[] => {
    const result = items.flatMap((item) => {
      if (item.children) {
        item.children = filterMenus(item.children);
      }
      if (item.meta && !accessGuard(item.meta)) {
        return [];
      }
      return [item];
    });
    return result;
  };

  // Экспортируем для использования в других модулях
  (router as any).filterMenus = filterMenus;

  // 🔥 генерируем маршруты после инициализации профилей
  async function generateRoutes(source: string) {
    console.log(
      `🔥 [${source}] generating routes, profile=`,
      appOpWorkProfileStore.profile,
    );

    // ❗ важно: сначала удалить старые маршруты
    accessStore.accessRoutes.forEach((route) => {
      if (route.name) {
        router.removeRoute(route.name);
      }
    });

    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: [],
      router,
      routes: filterMenus(accessRoutes),
    });
    console.log(`✅ [${source}] generated ${accessibleMenus.length} menus`);
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
  }

  // подписка на изменение профиля для перегенерации маршрутов
  appOpWorkProfileStore.$subscribe(async (mutation) => {
    console.log('💡 $subscribe triggered', mutation);
    console.log(
      '   profileId from localStorage:',
      appOpWorkProfileStore.profileId,
    );
    console.log('   profile from server:', appOpWorkProfileStore.profile);

    // ❗ важно: генерируем маршруты только если профиль был загружен с сервера
    // а не восстановлен из localStorage
    if (appOpWorkProfileStore.profile && appOpWorkProfileStore.profile.id) {
      await generateRoutes('$subscribe');
    } else {
      console.log('⚠️ skipping - profile not loaded yet');
    }
  });

  // 🔥 важно: если профиль уже загружен (из localStorage или сервера),
  // $subscribe не сработает, поэтому генерируем маршруты вручную
  if (appOpWorkProfileStore.profile && appOpWorkProfileStore.profile.id) {
    console.log('🚀 manual route generation after setupProfileWatcher');
    generateRoutes('manual');
  }
}

/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  // 记录已经加载的页面
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // 页面加载进度条
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // 记录页面是否加载,如果已经加载，后续的页面切换动画等效果不在重复执行

    loadedPaths.add(to.path);

    // 关闭页面加载进度条
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // 基本路由，这些路由不需要进入权限拦截
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    // accessToken 检查
    if (!accessStore.accessToken) {
      // 明确声明忽略权限访问权限，则可以访问
      if (to.meta.ignoreAccess) {
        return true;
      }

      // 没有访问权限，跳转登录页面
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // 如不需要，直接删除 query
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // 携带当前跳转的页面，登录后重新跳转该页面
          replace: true,
        };
      }
      return to;
    }

    // 是否已经生成过动态路由
    if (accessStore.isAccessChecked) {
      return true;
    }

    // 生成路由表
    // 当前登录用户拥有的角色标识列表
    // const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    // const userRoles = userInfo?.roles ?? [];
    await authStore.fetchUserInfo();

    // 🔥 важно: НЕ генерируем маршруты здесь!
    // Они уже сгенерированы в $subscribe после загрузки getProfile()
    console.log('✅ routes already generated by $subscribe');

    // 保存菜单信息和路由信息
    // accessStore.setAccessMenus(accessibleMenus);
    // accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === preferences.app.defaultHomePath
        ? /* userInfo?.homePath || */ preferences.app.defaultHomePath
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router);
  /** 权限访问 */
  setupAccessGuard(router);
}

export { createRouterGuard };
