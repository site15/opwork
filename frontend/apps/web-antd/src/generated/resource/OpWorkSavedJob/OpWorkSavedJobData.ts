import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSavedJob } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSavedJobFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.id,
      label: $t('resource.OpWorkSavedJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      label: $t('resource.OpWorkSavedJob.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
      label: $t('resource.OpWorkSavedJob.savedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
      label: $t('resource.OpWorkSavedJob.notes'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedJobCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      label: $t('resource.OpWorkSavedJob.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
      label: $t('resource.OpWorkSavedJob.savedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
      label: $t('resource.OpWorkSavedJob.notes'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedJobViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.id,
      label: $t('resource.OpWorkSavedJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      label: $t('resource.OpWorkSavedJob.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
      label: $t('resource.OpWorkSavedJob.savedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
      label: $t('resource.OpWorkSavedJob.notes'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedJobFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkSavedJobColumns<T = OpWorkSavedJob>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkSavedJobScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      title: $t('resource.OpWorkSavedJob.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      title: $t('resource.OpWorkSavedJob.jobId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
      title: $t('resource.OpWorkSavedJob.savedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
      title: $t('resource.OpWorkSavedJob.notes'),
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
