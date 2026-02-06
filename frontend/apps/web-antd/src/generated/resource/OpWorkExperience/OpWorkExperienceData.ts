import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkExperience } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkExperienceFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.id,
      label: $t('resource.OpWorkExperience.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkExperience.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkExperience.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.company,
      label: $t('resource.OpWorkExperience.company'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.position,
      label: $t('resource.OpWorkExperience.position'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.description,
      label: $t('resource.OpWorkExperience.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      label: $t('resource.OpWorkExperience.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      label: $t('resource.OpWorkExperience.endDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkExperience.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.location,
      label: $t('resource.OpWorkExperience.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'FULL_TIME', value: $t('resource.OpWorkEmploymentType.FULL_TIME'), },
          { label: 'PART_TIME', value: $t('resource.OpWorkEmploymentType.PART_TIME'), },
          { label: 'CONTRACT', value: $t('resource.OpWorkEmploymentType.CONTRACT'), },
          { label: 'INTERNSHIP', value: $t('resource.OpWorkEmploymentType.INTERNSHIP'), },
          { label: 'REMOTE', value: $t('resource.OpWorkEmploymentType.REMOTE'), },
          { label: 'FREELANCE', value: $t('resource.OpWorkEmploymentType.FREELANCE'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkExperience.employmentType'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkExperienceCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkExperience.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.company,
      label: $t('resource.OpWorkExperience.company'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.position,
      label: $t('resource.OpWorkExperience.position'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.description,
      label: $t('resource.OpWorkExperience.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      label: $t('resource.OpWorkExperience.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      label: $t('resource.OpWorkExperience.endDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkExperience.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.location,
      label: $t('resource.OpWorkExperience.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'FULL_TIME', value: $t('resource.OpWorkEmploymentType.FULL_TIME'), },
          { label: 'PART_TIME', value: $t('resource.OpWorkEmploymentType.PART_TIME'), },
          { label: 'CONTRACT', value: $t('resource.OpWorkEmploymentType.CONTRACT'), },
          { label: 'INTERNSHIP', value: $t('resource.OpWorkEmploymentType.INTERNSHIP'), },
          { label: 'REMOTE', value: $t('resource.OpWorkEmploymentType.REMOTE'), },
          { label: 'FREELANCE', value: $t('resource.OpWorkEmploymentType.FREELANCE'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkExperience.employmentType'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkExperienceViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.id,
      label: $t('resource.OpWorkExperience.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkExperience.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.company,
      label: $t('resource.OpWorkExperience.company'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.position,
      label: $t('resource.OpWorkExperience.position'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.description,
      label: $t('resource.OpWorkExperience.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      label: $t('resource.OpWorkExperience.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      label: $t('resource.OpWorkExperience.endDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkExperience.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.location,
      label: $t('resource.OpWorkExperience.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'FULL_TIME', value: $t('resource.OpWorkEmploymentType.FULL_TIME'), },
          { label: 'PART_TIME', value: $t('resource.OpWorkEmploymentType.PART_TIME'), },
          { label: 'CONTRACT', value: $t('resource.OpWorkEmploymentType.CONTRACT'), },
          { label: 'INTERNSHIP', value: $t('resource.OpWorkEmploymentType.INTERNSHIP'), },
          { label: 'REMOTE', value: $t('resource.OpWorkEmploymentType.REMOTE'), },
          { label: 'FREELANCE', value: $t('resource.OpWorkEmploymentType.FREELANCE'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkExperience.employmentType'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkExperienceScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkExperience.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
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
      field: Prisma.OpWorkExperienceScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.jobSeekerId,
      title: $t('resource.OpWorkExperience.jobSeekerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.company,
      title: $t('resource.OpWorkExperience.company'),
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.position,
      title: $t('resource.OpWorkExperience.position'),
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.description,
      title: $t('resource.OpWorkExperience.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.startDate,
      title: $t('resource.OpWorkExperience.startDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.endDate,
      title: $t('resource.OpWorkExperience.endDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkExperience.isCurrent'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.isCurrent,
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.location,
      title: $t('resource.OpWorkExperience.location'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
                    { label: 'FULL_TIME', value: $t('resource.OpWorkEmploymentType.FULL_TIME'), },
          { label: 'PART_TIME', value: $t('resource.OpWorkEmploymentType.PART_TIME'), },
          { label: 'CONTRACT', value: $t('resource.OpWorkEmploymentType.CONTRACT'), },
          { label: 'INTERNSHIP', value: $t('resource.OpWorkEmploymentType.INTERNSHIP'), },
          { label: 'REMOTE', value: $t('resource.OpWorkEmploymentType.REMOTE'), },
          { label: 'FREELANCE', value: $t('resource.OpWorkEmploymentType.FREELANCE'), },
        ],
      },
      title: $t('resource.OpWorkExperience.employmentType'),
      field: Prisma.OpWorkExperienceScalarFieldEnum.employmentType,
      sortable: true
    },
    {
      field: Prisma.OpWorkExperienceScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
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
      width: 130,
    },
  ];
}
