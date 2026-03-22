<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { ProfileBaseSetting } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import { profileControllerSetProfile } from '#/generated/client';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';

import { useOpWorkProfileFormSchema } from './OpWorkProfileData';

const appOpWorkProfileStore = useAppOpWorkProfileStore();
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
    .then(async (data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      // 🔥 важно: обновляем данные в сторе после успешного обновления
      await appOpWorkProfileStore.getProfile();
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
  // 🔥 используем данные из useAppOpWorkProfileStore
  const profileData = appOpWorkProfileStore.profile;

  if (!profileData) {
    console.warn('No profile data in store, attempting to fetch from server');
    // Если данных нет в сторе, пробуем загрузить с сервера
    appOpWorkProfileStore
      .getProfile()
      .then((fetchedProfile) => {
        const values = {
          ...fetchedProfile,
          createdAt: fetchedProfile?.createdAt
            ? dayjs(fetchedProfile.createdAt)
            : undefined,
          updatedAt: fetchedProfile?.updatedAt
            ? dayjs(fetchedProfile.updatedAt)
            : undefined,
        };
        profileBaseSettingRef.value.getFormApi().setValues(values);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        profileBaseSettingRef.value.getFormApi().setValues({});
      });
    return;
  }

  const values = {
    ...profileData,
    createdAt: profileData?.createdAt
      ? dayjs(profileData.createdAt)
      : undefined,
    updatedAt: profileData?.updatedAt
      ? dayjs(profileData.updatedAt)
      : undefined,
  };
  profileBaseSettingRef.value.getFormApi().setValues(values);
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
