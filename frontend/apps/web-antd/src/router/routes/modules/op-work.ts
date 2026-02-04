import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-work',
      keepAlive: true,
      order: 1001,
      title: $t('page.resource.op-work'),
    },
    name: 'OpWork',
    path: '/op-work',
    children: [
      {
        meta: {
          title: $t('page.resource.OpWorkProfile'),
        },
        name: 'OpWorkProfile',
        path: '/op-work/profile',
        component: () =>
          import('#/generated/resource/AuthUser/AuthUserList.vue'),
      },
    ],
  },
];

export default routes;
