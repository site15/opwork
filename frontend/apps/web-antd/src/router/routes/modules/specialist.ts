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
        name: 'VacancySearch',
        path: '/vacancy/search',
        component: () => import('#/views/vacancy/search/index.vue'),
        meta: {
          icon: 'lucide:search',
          title: $t('page.vacancy.search'),
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
        },
      },
    ],
  },
];

export default routes;
