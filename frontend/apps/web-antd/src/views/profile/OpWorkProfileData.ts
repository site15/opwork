import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
  return [
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),
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
  ];
}
