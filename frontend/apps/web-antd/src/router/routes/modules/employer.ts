import type { RouteRecordRaw } from 'vue-router';

import type { TPermissions } from '#/router/guard';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'ResumeSearch',
    path: '/resume/search',
    component: () => import('#/views/resume/search/index.vue'),
    meta: {
      icon: 'lucide:search',
      title: $t('page.resume.search'),
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
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
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
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
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
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
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
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
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
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
      permissions: {
        type: ['EMPLOYER', 'SPECIALIST'],
      } satisfies TPermissions,
    },
  },
];

export default routes;
