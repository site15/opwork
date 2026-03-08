import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      label: $t('resource.OpWorkJobSeeker.currentPosition'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      label: $t('resource.OpWorkJobSeeker.currentCompany'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      label: $t('resource.OpWorkJobSeeker.summary'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      label: $t('resource.OpWorkJobSeeker.expectedSalary'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      defaultValue: 'USD',
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
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
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
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
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
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
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      label: $t('resource.OpWorkJobSeeker.githubUrl'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
  ];
}
