import type { VbenFormSchema } from '#/adapter/form';

import { h } from 'vue';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

/**
 * Формирует схему формы профиля OpWork с группировкой по тематическим разделам
 * на основе схемы Prisma (строки 753-779)
 */
export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
  return [
    // ========================================================================
    // КОНТАКТНАЯ ИНФОРМАЦИЯ (строки 753-768 схемы Prisma)
    // ========================================================================
    // Разделитель секций
    {
      component: 'Divider',
      fieldName: '_contact_info_divider',
      hideLabel: true,
      formItemClass: 'col-span-full items-baseline',
      renderComponentContent: () => ({
        default: () => h('div', $t('profile.contactInfo')),
      }),
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
      label: $t('resource.OpWorkProfile.phone'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
      label: $t('resource.OpWorkProfile.website'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },

    // ========================================================================
    // МЕДИА (строки 770-779 схемы Prisma)
    // ========================================================================

    // Разделитель секций
    {
      component: 'Divider',
      fieldName: '_media_divider',
      hideLabel: true,
      formItemClass: 'col-span-full items-baseline',
      renderComponentContent: () => ({
        default: () => h('div', $t('profile.media')),
      }),
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      label: $t('resource.OpWorkProfile.avatarUrl'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      label: $t('resource.OpWorkProfile.coverImage'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
  ];
}
