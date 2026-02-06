import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSeeker } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.id,
      label: $t('resource.OpWorkJobSeeker.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJobSeeker.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJobSeeker.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobSeeker.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      label: $t('resource.OpWorkJobSeeker.currentPosition'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      label: $t('resource.OpWorkJobSeeker.currentCompany'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      label: $t('resource.OpWorkJobSeeker.summary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      label: $t('resource.OpWorkJobSeeker.expectedSalary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
      label: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
      label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
      label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      label: $t('resource.OpWorkJobSeeker.githubUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSeekerCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobSeeker.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      label: $t('resource.OpWorkJobSeeker.currentPosition'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      label: $t('resource.OpWorkJobSeeker.currentCompany'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      label: $t('resource.OpWorkJobSeeker.summary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      label: $t('resource.OpWorkJobSeeker.expectedSalary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
      label: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
      label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
      label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      label: $t('resource.OpWorkJobSeeker.githubUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSeekerViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.id,
      label: $t('resource.OpWorkJobSeeker.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobSeeker.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      label: $t('resource.OpWorkJobSeeker.currentPosition'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      label: $t('resource.OpWorkJobSeeker.currentCompany'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      label: $t('resource.OpWorkJobSeeker.summary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      label: $t('resource.OpWorkJobSeeker.expectedSalary'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
      label: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
      label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
      label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      label: $t('resource.OpWorkJobSeeker.githubUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJobSeeker.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJobSeeker.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSeekerFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobSeekerColumns<T = OpWorkJobSeeker>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      title: $t('resource.OpWorkJobSeeker.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      title: $t('resource.OpWorkJobSeeker.currentPosition'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      title: $t('resource.OpWorkJobSeeker.currentCompany'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      title: $t('resource.OpWorkJobSeeker.summary'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      title: $t('resource.OpWorkJobSeeker.expectedSalary'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
      title: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      title: $t('resource.OpWorkJobSeeker.preferredLocations'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      title: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      title: $t('resource.OpWorkJobSeeker.githubUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      title: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.updatedAt,
      title: $t('common.updatedAt'),
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
      width: 200,
    },
  ];
}
