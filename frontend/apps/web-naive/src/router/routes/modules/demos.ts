import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.naive'),
        },
        name: 'NaiveDemos',
        path: '/demos/naive',
        component: () => import('#/views/demos/naive/index.vue'),
      },
      {
        meta: {
          title: $t('demos.table'),
        },
        name: 'Table',
        path: '/demos/table',
        component: () => import('#/views/demos/table/index.vue'),
      },
      {
        meta: {
          title: $t('demos.form'),
        },
        name: 'Form',
        path: '/demos/form',
        component: () => import('#/views/demos/form/basic.vue'),
      },
    ],
  },
  {
    meta: {
      icon: 'ic:baseline-apps',
      keepAlive: true,
      order: 1001,
      title: $t('crud.title'),
    },
    name: 'Crud',
    path: '/crud',
    children: [
      {
        meta: {
          title: $t('demos.table.AuthUser'),
        },
        name: 'AuthUser',
        path: '/crud/auth-user',
        component: () => import('#/generated/resource/AuthUser.vue'),
      },
    ],
  },
];

export default routes;
