import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSeeker } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
  return [
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
      component: 'InputNumber',
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
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
      title: $t('resource.OpWorkJobSeeker.currentPosition'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.currentCompany'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.summary'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.expectedSalary'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
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
      title: $t('resource.OpWorkJobSeeker.preferredLocations'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.githubUrl'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
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
