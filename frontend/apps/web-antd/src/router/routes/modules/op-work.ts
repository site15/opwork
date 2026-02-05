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
          import('#/generated/resource/OpWorkProfile/OpWorkProfileList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJobSeeker'),
        },
        name: 'OpWorkJobSeeker',
        path: '/op-work/job-seeker',
        component: () =>
          import('#/generated/resource/OpWorkJobSeeker/OpWorkJobSeekerList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkExperience'),
        },
        name: 'OpWorkExperience',
        path: '/op-work/experience',
        component: () =>
          import('#/generated/resource/OpWorkExperience/OpWorkExperienceList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkEducation'),
        },
        name: 'OpWorkEducation',
        path: '/op-work/education',
        component: () =>
          import('#/generated/resource/OpWorkEducation/OpWorkEducationList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkEmployer'),
        },
        name: 'OpWorkEmployer',
        path: '/op-work/employer',
        component: () =>
          import('#/generated/resource/OpWorkEmployer/OpWorkEmployerList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkProject'),
        },
        name: 'OpWorkProject',
        path: '/op-work/project',
        component: () =>
          import('#/generated/resource/OpWorkProject/OpWorkProjectList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJob'),
        },
        name: 'OpWorkJob',
        path: '/op-work/job',
        component: () =>
          import('#/generated/resource/OpWorkJob/OpWorkJobList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkApplication'),
        },
        name: 'OpWorkApplication',
        path: '/op-work/application',
        component: () =>
          import('#/generated/resource/OpWorkApplication/OpWorkApplicationList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkSavedJob'),
        },
        name: 'OpWorkSavedJob',
        path: '/op-work/saved-job',
        component: () =>
          import('#/generated/resource/OpWorkSavedJob/OpWorkSavedJobList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkSkill'),
        },
        name: 'OpWorkSkill',
        path: '/op-work/skill',
        component: () =>
          import('#/generated/resource/OpWorkSkill/OpWorkSkillList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJobSeekerSkill'),
        },
        name: 'OpWorkJobSeekerSkill',
        path: '/op-work/job-seeker-skill',
        component: () =>
          import('#/generated/resource/OpWorkJobSeekerSkill/OpWorkJobSeekerSkillList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJobSkill'),
        },
        name: 'OpWorkJobSkill',
        path: '/op-work/job-skill',
        component: () =>
          import('#/generated/resource/OpWorkJobSkill/OpWorkJobSkillList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkNotification'),
        },
        name: 'OpWorkNotification',
        path: '/op-work/notification',
        component: () =>
          import('#/generated/resource/OpWorkNotification/OpWorkNotificationList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkNotificationSettings'),
        },
        name: 'OpWorkNotificationSettings',
        path: '/op-work/notification-settings',
        component: () =>
          import('#/generated/resource/OpWorkNotificationSettings/OpWorkNotificationSettingsList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkSearchHistory'),
        },
        name: 'OpWorkSearchHistory',
        path: '/op-work/search-history',
        component: () =>
          import('#/generated/resource/OpWorkSearchHistory/OpWorkSearchHistoryList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJobView'),
        },
        name: 'OpWorkJobView',
        path: '/op-work/job-view',
        component: () =>
          import('#/generated/resource/OpWorkJobView/OpWorkJobViewList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkSavedSearch'),
        },
        name: 'OpWorkSavedSearch',
        path: '/op-work/saved-search',
        component: () =>
          import('#/generated/resource/OpWorkSavedSearch/OpWorkSavedSearchList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkSkillSynonym'),
        },
        name: 'OpWorkSkillSynonym',
        path: '/op-work/skill-synonym',
        component: () =>
          import('#/generated/resource/OpWorkSkillSynonym/OpWorkSkillSynonymList.vue'),
      },
      {
        meta: {
          title: $t('page.resource.OpWorkJobTag'),
        },
        name: 'OpWorkJobTag',
        path: '/op-work/job-tag',
        component: () =>
          import('#/generated/resource/OpWorkJobTag/OpWorkJobTagList.vue'),
      },
    ],
  },
];

export default routes;
