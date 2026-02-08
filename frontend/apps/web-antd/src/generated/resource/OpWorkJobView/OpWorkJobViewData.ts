import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobView } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      label: $t('resource.OpWorkJobView.viewedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      label: $t('resource.OpWorkJobView.ipAddress'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      label: $t('resource.OpWorkJobView.userAgent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobViewColumns<T = OpWorkJobView>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      title: $t('resource.OpWorkJobView.viewedAt'),
      field: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobView.ipAddress'),
      field: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobView.userAgent'),
      field: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJob'),
      field: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
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
