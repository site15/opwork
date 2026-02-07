import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobTag } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobTagFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobTag.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.name,
      label: $t('resource.OpWorkJobTag.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.color,
      label: $t('resource.OpWorkJobTag.color'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobTagFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobTagColumns<T = OpWorkJobTag>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkJobTagScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobTagScalarFieldEnum.jobId,
      title: $t('resource.OpWorkJobTag.jobId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobTagScalarFieldEnum.name,
      title: $t('resource.OpWorkJobTag.name'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobTagScalarFieldEnum.color,
      title: $t('resource.OpWorkJobTag.color'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobTagScalarFieldEnum.createdAt,
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
      width: 200,
    },
  ];
}
