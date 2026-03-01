import type { VbenFormSchema } from '#/adapter/form';
import type { OpWorkEmployer } from '#/generated/client';

import { getComponentProps } from '#/adapter/get-component-props';
import { employerControllerGetProfiles } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.title,
      label: $t('resource.OpWorkJob.title'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.description,
      label: $t('resource.OpWorkJob.description'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.requirements,
      label: $t('resource.OpWorkJob.requirements'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      label: $t('resource.OpWorkJob.responsibilities'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'FULL_TIME',
            label: $t('resource.OpWorkEmploymentType.FULL_TIME').split(
              ' - ',
            )[0],
          },
          {
            value: 'PART_TIME',
            label: $t('resource.OpWorkEmploymentType.PART_TIME').split(
              ' - ',
            )[0],
          },
          {
            value: 'CONTRACT',
            label: $t('resource.OpWorkEmploymentType.CONTRACT').split(' - ')[0],
          },
          {
            value: 'INTERNSHIP',
            label: $t('resource.OpWorkEmploymentType.INTERNSHIP').split(
              ' - ',
            )[0],
          },
          {
            value: 'REMOTE',
            label: $t('resource.OpWorkEmploymentType.REMOTE').split(' - ')[0],
          },
          {
            value: 'FREELANCE',
            label: $t('resource.OpWorkEmploymentType.FREELANCE').split(
              ' - ',
            )[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkJob.employmentType'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'INTERNSHIP',
            label: $t('resource.OpWorkExperienceLevel.INTERNSHIP').split(
              ' - ',
            )[0],
          },
          {
            value: 'ENTRY_LEVEL',
            label: $t('resource.OpWorkExperienceLevel.ENTRY_LEVEL').split(
              ' - ',
            )[0],
          },
          {
            value: 'JUNIOR',
            label: $t('resource.OpWorkExperienceLevel.JUNIOR').split(' - ')[0],
          },
          {
            value: 'MIDDLE',
            label: $t('resource.OpWorkExperienceLevel.MIDDLE').split(' - ')[0],
          },
          {
            value: 'SENIOR',
            label: $t('resource.OpWorkExperienceLevel.SENIOR').split(' - ')[0],
          },
          {
            value: 'LEAD',
            label: $t('resource.OpWorkExperienceLevel.LEAD').split(' - ')[0],
          },
          {
            value: 'EXPERT',
            label: $t('resource.OpWorkExperienceLevel.EXPERT').split(' - ')[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.experienceLevel,
      label: $t('resource.OpWorkJob.experienceLevel'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.department,
      label: $t('resource.OpWorkJob.department'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      label: $t('resource.OpWorkJob.salaryMax'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJob.salaryCurrency'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.location,
      label: $t('resource.OpWorkJob.location'),

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
      fieldName: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      label: $t('resource.OpWorkJob.isRemote'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'DRAFT',
            label: $t('resource.OpWorkJobStatus.DRAFT').split(' - ')[0],
          },
          {
            value: 'ACTIVE',
            label: $t('resource.OpWorkJobStatus.ACTIVE').split(' - ')[0],
          },
          {
            value: 'PAUSED',
            label: $t('resource.OpWorkJobStatus.PAUSED').split(' - ')[0],
          },
          {
            value: 'CLOSED',
            label: $t('resource.OpWorkJobStatus.CLOSED').split(' - ')[0],
          },
          {
            value: 'ARCHIVED',
            label: $t('resource.OpWorkJobStatus.ARCHIVED').split(' - ')[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.status,
      label: $t('resource.OpWorkJob.status'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),

      controlClass: 'w-full',
      labelWidth: 200,
    },

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkEmployer>({
        findMany: () =>
          employerControllerGetProfiles().then(async (res) => ({
            items: res.data || [],
            error: undefined,
          })),
        getLabel: (item) => item.companyName || item.id,
      }),
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.name.OpWorkEmployer'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
  ];
}
