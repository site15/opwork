import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:file-user',
      order: -1,
      title: $t('page.resume.title'),
    },
    name: 'Resume',
    path: '/resume',
    children: [
      {
        name: 'ResumeSearch',
        path: '/resume/search',
        component: () => import('#/views/resume/search/index.vue'),
        meta: {
          icon: 'lucide:search',
          title: $t('page.resume.search'),
        },
      },
      {
        name: 'ResumeList',
        path: '/resume/list',
        component: () => import('#/views/resume/list/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:file-user',
          title: $t('page.resume.list'),
        },
      },
    ],
  },
];

export default routes;
