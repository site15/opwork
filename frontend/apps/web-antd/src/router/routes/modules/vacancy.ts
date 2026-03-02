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
        name: 'VacancySearch',
        path: '/vacancy/search',
        component: () => import('#/views/vacancy/search/index.vue'),
        meta: {
          icon: 'lucide:search',
          title: $t('page.vacancy.search'),
        },
      },
      {
        name: 'VacancyMy',
        path: '/vacancy/my',
        component: () => import('#/views/vacancy/my/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:briefcase-business',
          title: $t('page.vacancy.my'),
        },
      },
      {
        name: 'EmployerProfile',
        path: '/profile/employer',
        component: () => import('#/views/profile/employer/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:square-user-round',
          title: $t('page.profile.employer'),
        },
      },
      {
        name: 'VacancyCreate',
        path: '/vacancy/create',
        component: () => import('#/views/vacancy/create-or-update/index.vue'),
        meta: {
          hideInMenu: true,
          icon: 'lucide:briefcase-business',
          title: $t('page.vacancy.create'),
        },
      },
      {
        name: 'VacancyEdit',
        path: '/vacancy/:id/edit',
        component: () => import('#/views/vacancy/create-or-update/index.vue'),
        meta: {
          hideInMenu: true,
          icon: 'lucide:briefcase-business',
          title: $t('page.vacancy.edit'),
        },
      },
      {
        name: 'VacancyDetail',
        path: '/vacancy/:id',
        component: () => import('#/views/vacancy/detail/index.vue'),
        meta: {
          hideInMenu: true,
          icon: 'lucide:briefcase-business',
          title: $t('page.vacancy.detail'),
        },
      },
    ],
  },
];

export default routes;
