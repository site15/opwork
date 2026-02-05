import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-key',
      keepAlive: true,
      order: 1001,
      title: $t('page.resource.auth'),
    },
    name: 'Auth',
    path: '/auth',
    children: [
      {
        meta: {
          title: $t('page.resource.AuthUser'),
        },
        name: 'AuthUser',
        path: '/auth/user',
        component: () =>
          import('#/generated/resource/AuthUser/AuthUserList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.AuthApiKey'),
        },
        name: 'AuthApiKey',
        path: '/auth/api-key',
        component: () =>
          import('#/generated/resource/AuthApiKey/AuthApiKeyList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.AuthSession'),
        },
        name: 'AuthSession',
        path: '/auth/session',
        component: () =>
          import('#/generated/resource/AuthSession/AuthSessionList.vue'),
      },
    ],
  },
];

export default routes;
