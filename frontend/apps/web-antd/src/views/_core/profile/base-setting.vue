<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { ProfileBaseSetting } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  profileControllerGetProfile,
  profileControllerSetProfile,
} from '#/generated/client';

import { useOpWorkProfileFormSchema } from './OpWorkProfileData';

const profileBaseSettingRef = ref();

const submit = async () => {
  //
  const { valid: profileValid } = await profileBaseSettingRef.value
    .getFormApi()
    .validate();
  if (!profileValid) return;
  const profileValues = await profileBaseSettingRef.value
    .getFormApi()
    .getValues();

  profileControllerSetProfile({
    body: {
      avatarUrl: profileValues.avatarUrl,
      coverImage: profileValues.coverImage,
      email: profileValues.email,
      location: profileValues.location,
      phone: profileValues.phone,
      website: profileValues.website,
    },
  })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      return data;
    })
    .then(() => {
      notification.success({
        message: $t('actions.common.updateSuccess'),
        description: $t('resume.detail.updateSuccessDescription'),
        duration: 3000,
      });
    })
    .catch((error) => {
      notification.error({
        message: $t('actions.common.updateFailed'),
        description: error instanceof Error ? error.message : '',
        duration: 3000,
      });
    });
};

const loadProfile = () => {
  profileControllerGetProfile()
    .then(async (response) => {
      if (response.error) {
        throw new Error((response.error as any)?.message || 'Unknown error');
      }
      const values = {
        ...response.data,
        createdAt: response.data?.createdAt
          ? dayjs(response.data.createdAt)
          : undefined,
        updatedAt: response.data?.updatedAt
          ? dayjs(response.data.updatedAt)
          : undefined,
      };
      profileBaseSettingRef.value.getFormApi().setValues(values);
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
      profileBaseSettingRef.value.getFormApi().setValues({});
    });
};

onMounted(async () => {
  loadProfile();
});
</script>
<template>
  <ProfileBaseSetting
    ref="profileBaseSettingRef"
    :form-schema="useOpWorkProfileFormSchema()"
    @submit="submit"
  />
</template>
