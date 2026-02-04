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
    ],
  },
];

export default routes;
