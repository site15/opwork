import type { VbenFormSchema } from '#/adapter/form';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.firstName,
      label: $t('resource.OpWorkJobSeeker.firstName'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.lastName,
      label: $t('resource.OpWorkJobSeeker.lastName'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.middleName,
      label: $t('resource.OpWorkJobSeeker.middleName'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.birthDate,
      label: $t('resource.OpWorkJobSeeker.birthDate'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'MALE',
            label: $t('resource.OpWorkJobSeekerGender.MALE').split(' - ')[0],
          },
          {
            value: 'FEMALE',
            label: $t('resource.OpWorkJobSeekerGender.FEMALE').split(' - ')[0],
          },
          {
            value: 'OTHER',
            label: $t('resource.OpWorkJobSeekerGender.OTHER').split(' - ')[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.gender,
      label: $t('resource.OpWorkJobSeeker.gender'),
      labelWidth: 200,
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
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
