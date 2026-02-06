import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSearchHistory } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSearchHistoryFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.id,
      label: $t('resource.OpWorkSearchHistory.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSearchHistory.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      label: $t('resource.OpWorkSearchHistory.resultsCount'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      label: $t('resource.OpWorkSearchHistory.searchedAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSearchHistoryCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSearchHistory.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      label: $t('resource.OpWorkSearchHistory.resultsCount'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      label: $t('resource.OpWorkSearchHistory.searchedAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSearchHistoryViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.id,
      label: $t('resource.OpWorkSearchHistory.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSearchHistory.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      label: $t('resource.OpWorkSearchHistory.resultsCount'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      label: $t('resource.OpWorkSearchHistory.searchedAt'),
      
      
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
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      title: $t('resource.OpWorkSearchHistory.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.query,
      title: $t('resource.OpWorkSearchHistory.query'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.filters,
      title: $t('resource.OpWorkSearchHistory.filters'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
      title: $t('resource.OpWorkSearchHistory.resultsCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
      title: $t('resource.OpWorkSearchHistory.searchedAt'),
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
