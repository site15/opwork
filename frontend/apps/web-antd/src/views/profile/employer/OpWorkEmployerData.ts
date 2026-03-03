import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkEmployerFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyName,
      label: $t('resource.OpWorkEmployer.companyName'),
      rules: 'required',

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.industry,
      label: $t('resource.OpWorkEmployer.industry'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.description,
      label: $t('resource.OpWorkEmployer.description'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.mission,
      label: $t('resource.OpWorkEmployer.mission'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.culture,
      label: $t('resource.OpWorkEmployer.culture'),

      controlClass: 'w-full',
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.foundedYear,
      label: $t('resource.OpWorkEmployer.foundedYear'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.headquarters,
      label: $t('resource.OpWorkEmployer.headquarters'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.logoUrl,
      label: $t('resource.OpWorkEmployer.logoUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.coverImageUrl,
      label: $t('resource.OpWorkEmployer.coverImageUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyEmail,
      label: $t('resource.OpWorkEmployer.companyEmail'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyPhone,
      label: $t('resource.OpWorkEmployer.companyPhone'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyWebsite,
      label: $t('resource.OpWorkEmployer.companyWebsite'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkEmployer.linkedinUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.twitterUrl,
      label: $t('resource.OpWorkEmployer.twitterUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.facebookUrl,
      label: $t('resource.OpWorkEmployer.facebookUrl'),

      controlClass: 'w-full',
    },
  ];
}
