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
          title: $t('demos.antd'),
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
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
        component: () =>
          import('#/generated/resource/AuthUser/AuthUserList.vue'),
      },
    ],
  },
];

export default routes;
