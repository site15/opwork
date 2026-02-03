import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-apps',
      keepAlive: true,
      order: 1001,
      title: $t('page.resource.title'),
    },
    name: 'Resources',
    path: '/resource',
    children: [
      {
        meta: {
          title: $t('page.resource.AuthUser'),
        },
        name: 'AuthUser',
        path: '/resource/auth-user',
        component: () =>
          import('#/generated/resource/AuthUser/AuthUserList.vue'),
      },
    ],
  },
];

export default routes;
