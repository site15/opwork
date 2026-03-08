import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      label: $t('resource.OpWorkJobSeeker.currentPosition'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      label: $t('resource.OpWorkJobSeeker.currentCompany'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      label: $t('resource.OpWorkJobSeeker.summary'),

      controlClass: 'w-full',
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      label: $t('resource.OpWorkJobSeeker.expectedSalary'),

      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      defaultValue: 'USD',

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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
      label: $t('resource.OpWorkJobSeeker.isOpenToWork'),

      controlClass: 'w-full',
      labelWidth: 200,
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
      label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),

      controlClass: 'w-full',
      labelWidth: 200,
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
      label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkJobSeeker.linkedinUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      label: $t('resource.OpWorkJobSeeker.githubUrl'),

      controlClass: 'w-full',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkJobSeeker.portfolioUrl'),

      controlClass: 'w-full',
    },
  ];
}
