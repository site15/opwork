import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSavedJob } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSavedJobFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'DatePicker',
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
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
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
      title: $t('resource.OpWorkSavedJob.savedAt'),
      field: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.OpWorkSavedJob.notes'),
      field: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJob'),
      field: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
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
