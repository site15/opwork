import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:briefcase-business',
      order: -1,
      title: $t('page.vacancy.title'),
    },
    name: 'Vacancy',
    path: '/vacancy',
    children: [
      {
        name: 'Search',
        path: '/vacancy/search',
        component: () => import('#/views/vacancy/search/index.vue'),
        meta: {
          icon: 'lucide:search',
          title: $t('page.vacancy.search'),
        },
      },
      {
        name: 'Vacancies',
        path: '/vacancy/list',
        component: () => import('#/views/vacancy/list/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:briefcase-business',
          title: $t('page.vacancy.list'),
        },
      },
    ],
  },
];

export default routes;
