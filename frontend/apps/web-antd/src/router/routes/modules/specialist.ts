import type { RouteRecordRaw } from 'vue-router';

import type { TPermissions } from '#/router/guard';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'VacancySearch',
    path: '/vacancy/search',
    component: () => import('#/views/vacancy/search/index.vue'),
    meta: {
      icon: 'lucide:search',
      title: $t('page.vacancy.search'),
      permissions: {
        type: ['SPECIALIST'],
      } satisfies TPermissions,
    },
  },
  {
    name: 'SpecialistProfile',
    path: '/profile/specialist',
    component: () => import('#/views/profile/specialist/index.vue'),
    meta: {
      affixTab: true,
      icon: 'lucide:square-user-round',
      title: $t('page.profile.specialist'),
      permissions: {
        type: ['SPECIALIST'],
      } satisfies TPermissions,
    },
  },
  {
    name: 'ResumeDetail',
    path: '/resume/:id',
    component: () => import('#/views/resume/detail/index.vue'),
    meta: {
      hideInMenu: true,
      icon: 'lucide:briefcase-business',
      title: $t('page.resume.detail'),
      permissions: {
        type: ['SPECIALIST'],
      } satisfies TPermissions,
    },
  },
];

export default routes;
