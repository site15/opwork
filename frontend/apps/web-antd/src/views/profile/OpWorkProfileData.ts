import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
  return [
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
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),

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
  ];
}
