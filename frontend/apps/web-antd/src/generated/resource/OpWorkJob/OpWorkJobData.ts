import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJob } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.id,
      label: $t('resource.OpWorkJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJob.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJob.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.title,
      label: $t('resource.OpWorkJob.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.description,
      label: $t('resource.OpWorkJob.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.requirements,
      label: $t('resource.OpWorkJob.requirements'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      label: $t('resource.OpWorkJob.responsibilities'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.department,
      label: $t('resource.OpWorkJob.department'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      label: $t('resource.OpWorkJob.salaryMax'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJob.salaryCurrency'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.location,
      label: $t('resource.OpWorkJob.location'),
      
      
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
      fieldName: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      label: $t('resource.OpWorkJob.isRemote'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.title,
      label: $t('resource.OpWorkJob.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.description,
      label: $t('resource.OpWorkJob.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.requirements,
      label: $t('resource.OpWorkJob.requirements'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      label: $t('resource.OpWorkJob.responsibilities'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.department,
      label: $t('resource.OpWorkJob.department'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      label: $t('resource.OpWorkJob.salaryMax'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJob.salaryCurrency'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.location,
      label: $t('resource.OpWorkJob.location'),
      
      
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
      fieldName: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      label: $t('resource.OpWorkJob.isRemote'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.id,
      label: $t('resource.OpWorkJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.title,
      label: $t('resource.OpWorkJob.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.description,
      label: $t('resource.OpWorkJob.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.requirements,
      label: $t('resource.OpWorkJob.requirements'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      label: $t('resource.OpWorkJob.responsibilities'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.department,
      label: $t('resource.OpWorkJob.department'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      label: $t('resource.OpWorkJob.salaryMax'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJob.salaryCurrency'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.location,
      label: $t('resource.OpWorkJob.location'),
      
      
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
      fieldName: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      label: $t('resource.OpWorkJob.isRemote'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJob.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJob.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobColumns<T = OpWorkJob>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkJobScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.employerId,
      title: $t('resource.OpWorkJob.employerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.profileId,
      title: $t('resource.OpWorkJob.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.title,
      title: $t('resource.OpWorkJob.title'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.description,
      title: $t('resource.OpWorkJob.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.requirements,
      title: $t('resource.OpWorkJob.requirements'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      title: $t('resource.OpWorkJob.responsibilities'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.department,
      title: $t('resource.OpWorkJob.department'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      title: $t('resource.OpWorkJob.salaryMin'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      title: $t('resource.OpWorkJob.salaryMax'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      title: $t('resource.OpWorkJob.salaryCurrency'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.location,
      title: $t('resource.OpWorkJob.location'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJob.isRemote'),
      field: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      title: $t('resource.OpWorkJob.viewsCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      title: $t('resource.OpWorkJob.applicationsCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      title: $t('resource.OpWorkJob.savesCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      title: $t('resource.OpWorkJob.publishedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      title: $t('resource.OpWorkJob.expiresAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
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
      width: 130,
    },
  ];
}
