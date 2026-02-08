import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSearchHistory } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSearchHistoryFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.query,
      label: $t('resource.OpWorkSearchHistory.query'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.filters,
      label: $t('resource.OpWorkSearchHistory.filters'),
      
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      label: $t('resource.OpWorkSearchHistory.resultsCount'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      label: $t('resource.OpWorkSearchHistory.searchedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSearchHistoryFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkSearchHistoryColumns<T = OpWorkSearchHistory>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      title: $t('resource.OpWorkSearchHistory.query'),
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.query,
      sortable: true
    },
    {
      title: $t('resource.OpWorkSearchHistory.filters'),
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.filters,
      sortable: true
    },
    {
      title: $t('resource.OpWorkSearchHistory.resultsCount'),
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      sortable: true
    },
    {
      title: $t('resource.OpWorkSearchHistory.searchedAt'),
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
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
