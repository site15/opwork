import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.title,
      label: $t('resource.OpWorkProfile.title'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.description,
      label: $t('resource.OpWorkProfile.description'),

      controlClass: 'w-full',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isActive,
      label: $t('resource.OpWorkProfile.isActive'),

      controlClass: 'w-full',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isEmailVerified,
      label: $t('resource.OpWorkProfile.isEmailVerified'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
      label: $t('resource.OpWorkProfile.phone'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
      label: $t('resource.OpWorkProfile.website'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      label: $t('resource.OpWorkProfile.avatarUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      label: $t('resource.OpWorkProfile.coverImage'),

      controlClass: 'w-full',
    },
  ];
}
