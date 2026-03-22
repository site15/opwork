<script setup lang="ts">
import type { VbenFormSchema } from '#/adapter/form';

import { computed, h, ref } from 'vue';

import { ProfileBaseSetting, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useAppAuthStore } from '#/services/AuthService';

const authStore = useAppAuthStore();
const loading = ref(false);

const formSchema = computed((): VbenFormSchema[] => {
  return [
    // Разделитель секций
    {
      component: 'Divider',
      fieldName: '_contact_info_divider',
      hideLabel: true,
      formItemClass: 'col-span-full items-baseline',
      renderComponentContent: () => ({
        default: () => h('div', $t('profile.emailSettings')),
      }),
    },
    {
      fieldName: 'newEmail',
      label: $t('profile.newEmail'),
      component: 'Input',
      componentProps: {
        placeholder: $t('profile.newEmailTip'),
        type: 'email',
      },
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
      rules: z
        .string()
        .min(1, { message: $t('profile.emailRequired') })
        .email({ message: $t('profile.emailInvalidFormat') }),
    },
  ];
});

async function handleSubmit(values: Record<string, any>) {
  try {
    loading.value = true;
    await authStore.changeEmail({ newEmail: values.newEmail });
    message.success($t('profile.emailChangeSuccess'));
  } catch (error) {
    console.error('Email change error:', error);
    message.error(
      error instanceof Error ? error.message : $t('profile.emailChangeFailed'),
    );
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <ProfileBaseSetting
    class="w-1/3"
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
