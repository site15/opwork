<script setup lang="ts">
import { ref } from 'vue';

import { Profile } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';

import ProfileBase from './base-setting.vue';

const userStore = useUserStore();

const tabsValue = ref<string>('basic');

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
    :user-info="userStore.userInfo"
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
