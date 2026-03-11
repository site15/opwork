import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkExperience } from '#/generated/client';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkExperienceFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.company,
      label: $t('resource.OpWorkExperience.company'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.position,
      label: $t('resource.OpWorkExperience.position'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.description,
      label: $t('resource.OpWorkExperience.description'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      label: $t('resource.OpWorkExperience.startDate'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      label: $t('resource.OpWorkExperience.endDate'),

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
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkExperience.isCurrent'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.location,
      label: $t('resource.OpWorkExperience.location'),

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
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkExperience.employmentType'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
  ];
}

export function useOpWorkExperienceFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkExperienceColumns<T = OpWorkExperience>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      title: $t('resource.OpWorkExperience.company'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.company,
    },
    {
      title: $t('resource.OpWorkExperience.position'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.position,
    },
    {
      title: $t('resource.OpWorkExperience.description'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.description,
    },
    {
      title: $t('resource.OpWorkExperience.startDate'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      formatter: 'formatDateTime',
    },
    {
      title: $t('resource.OpWorkExperience.endDate'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      formatter: 'formatDateTime',
    },
    {
      cellRender: {
        name: 'CellTag',
      },
      title: $t('resource.OpWorkExperience.isCurrent'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
    },
    {
      title: $t('resource.OpWorkExperience.location'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.location,
    },
    {
      cellRender: {
        name: 'CellEnum',
        props: {
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
              label: $t('resource.OpWorkEmploymentType.CONTRACT').split(
                ' - ',
              )[0],
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
        },
      },
      title: $t('resource.OpWorkExperience.employmentType'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'id',
          nameTitle: $t('common.id'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 200,
    },
  ];
}
