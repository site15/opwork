<script setup lang="ts">
import { computed, ref } from 'vue';

import { Profile } from '@vben/common-ui';
import { preferences } from '@vben/preferences';

import { $t } from '#/locales';
import { useAppAuthStore } from '#/services/AuthService';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';

import ProfileBase from './base-setting.vue';
import ProfileEmailSetting from './email-setting.vue';
import ProfilePasswordSetting from './password-setting.vue';

const appOpWorkProfileStore = useAppOpWorkProfileStore();
const appAuthStore = useAppAuthStore();

const tabsValue = ref<string>('basic');

// 🔥 используем аватар из OpWork профиля, иначе из userStore
const userInfo = computed(() => ({
  email:
    appAuthStore.profile?.email ?? appOpWorkProfileStore.profile?.email ?? '',
  avatar:
    appOpWorkProfileStore.profile?.avatarUrl ?? preferences.app.defaultAvatar,
}));

const tabs = ref([
  {
    label: $t('profile.basicSettings'),
    value: 'basic',
  },
  {
    label: $t('profile.emailAndPasswordSettings'),
    value: 'email-password',
  },
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
      <div v-if="tabsValue === 'email-password'" class="flex flex-col gap-4">
        <ProfileEmailSetting />
        <ProfilePasswordSetting />
      </div>
    </template>
  </Profile>
</template>
