<script setup lang="ts">
import type { VbenFormSchema } from '#/adapter/form';

import { computed, h, ref } from 'vue';

import { ProfilePasswordSetting, z } from '@vben/common-ui';
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
        default: () => h('div', $t('profile.passwordSettings')),
      }),
    },
    {
      fieldName: 'oldPassword',
      label: $t('profile.currentPassword'),
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('profile.currentPasswordTip'),
      },
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
      rules: z.string().min(1, { message: $t('profile.passwordRequired') }),
    },
    {
      fieldName: 'newPassword',
      label: $t('profile.newPassword'),
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('profile.newPasswordTip'),
      },
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
      rules: z.string().min(6, { message: $t('profile.passwordMinLength') }),
    },
    {
      fieldName: 'confirmPassword',
      label: $t('profile.confirmPassword'),
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('profile.confirmPasswordTip'),
      },
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
      dependencies: {
        rules(values) {
          const { newPassword } = values;
          return z
            .string({ required_error: $t('profile.confirmPasswordRequired') })
            .min(1, { message: $t('profile.confirmPasswordRequired') })
            .refine((value) => value === newPassword, {
              message: $t('profile.passwordMismatch'),
            });
        },
        triggerFields: ['newPassword'],
      },
    },
  ];
});

async function handleSubmit(values: Record<string, any>) {
  try {
    loading.value = true;
    await authStore.changePassword({
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    message.success($t('profile.passwordChangeSuccess'));
  } catch (error) {
    console.error('Password change error:', error);
    message.error(
      error instanceof Error
        ? error.message
        : $t('profile.passwordChangeFailed'),
    );
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <ProfilePasswordSetting
    class="w-1/3"
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
