<script setup lang="ts">
import { computed, ref } from 'vue';

import { Profile } from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { $t } from '#/locales';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';

import ProfileBase from './base-setting.vue';

const userStore = useUserStore();
const appOpWorkProfileStore = useAppOpWorkProfileStore();

const tabsValue = ref<string>('basic');

// 🔥 используем аватар из OpWork профиля, иначе из userStore
const userInfo = computed(() => ({
  email:
    appOpWorkProfileStore.profile?.email ?? userStore.userInfo?.email ?? '',
  avatar:
    appOpWorkProfileStore.profile?.avatarUrl ??
    userStore.userInfo?.avatar ??
    preferences.app.defaultAvatar,
}));

const tabs = ref([
  {
    label: $t('Basic Settings'),
    value: 'basic',
  } /* ,
  {
    label: $t('Security Settings'),
    value: 'security',
  },
  {
    label: $t('Password Modification'),
    value: 'password',
  },
  {
    label: $t('New Message Reminder'),
    value: 'notice',
  },*/,
]);
</script>
<template>
  <Profile
    v-model:model-value="tabsValue"
    :title="$t('Personal Center')"
    :user-info="userInfo"
    :tabs="tabs"
  >
    <template #content>
      <ProfileBase v-if="tabsValue === 'basic'" />
      <!--
      <ProfileSecuritySetting v-if="tabsValue === 'security'" />
      <ProfilePasswordSetting v-if="tabsValue === 'password'" />
      <ProfileNotificationSetting v-if="tabsValue === 'notice'" />
      -->
    </template>
  </Profile>
</template>
