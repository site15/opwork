import type { RouteRecordRaw } from 'vue-router';

import type { TPermissions } from '#/router/guard';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'ResumeSearch',
    path: '/vacancy/resume-search',
    component: () => import('#/views/vacancy/resume-search/index.vue'),
    meta: {
      icon: 'lucide:search',
      title: $t('page.vacancy.resume-search'),
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
    },
  },
  {
    name: 'VacancyMy',
    path: '/vacancy/list',
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
    name: 'VacancyApplications',
    path: '/vacancy/applications',
    component: () => import('#/views/vacancy/applications/index.vue'),
    meta: {
      affixTab: true,
      icon: 'lucide:circle-dot',
      title: $t('page.vacancy.applications'),
      permissions: {
        type: ['EMPLOYER'],
      } satisfies TPermissions,
    },
  },
  {
    name: 'VacancyApplicationDetail',
    path: '/vacancy/applications/:id',
    component: () => import('#/views/vacancy/applications/detail/index.vue'),
    meta: {
      hideInMenu: true,
      icon: 'lucide:file-user',
      title: $t('page.resume.detail'),
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
