import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSavedSearch } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSavedSearchFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.id,
      label: $t('resource.OpWorkSavedSearch.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSavedSearch.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkSavedSearch.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedSearch.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.name,
      label: $t('resource.OpWorkSavedSearch.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.query,
      label: $t('resource.OpWorkSavedSearch.query'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.filters,
      label: $t('resource.OpWorkSavedSearch.filters'),
      
      
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
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.isActive,
      label: $t('resource.OpWorkSavedSearch.isActive'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.frequency,
      label: $t('resource.OpWorkSavedSearch.frequency'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.lastSentAt,
      label: $t('resource.OpWorkSavedSearch.lastSentAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedSearchCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedSearch.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.name,
      label: $t('resource.OpWorkSavedSearch.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.query,
      label: $t('resource.OpWorkSavedSearch.query'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.filters,
      label: $t('resource.OpWorkSavedSearch.filters'),
      
      
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
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.isActive,
      label: $t('resource.OpWorkSavedSearch.isActive'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.frequency,
      label: $t('resource.OpWorkSavedSearch.frequency'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.lastSentAt,
      label: $t('resource.OpWorkSavedSearch.lastSentAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedSearchViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.id,
      label: $t('resource.OpWorkSavedSearch.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.profileId,
      label: $t('resource.OpWorkSavedSearch.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.name,
      label: $t('resource.OpWorkSavedSearch.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.query,
      label: $t('resource.OpWorkSavedSearch.query'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.filters,
      label: $t('resource.OpWorkSavedSearch.filters'),
      
      
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
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.isActive,
      label: $t('resource.OpWorkSavedSearch.isActive'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.frequency,
      label: $t('resource.OpWorkSavedSearch.frequency'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.lastSentAt,
      label: $t('resource.OpWorkSavedSearch.lastSentAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSavedSearch.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSavedSearchScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkSavedSearch.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkSavedSearchFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkSavedSearchColumns<T = OpWorkSavedSearch>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.profileId,
      title: $t('resource.OpWorkSavedSearch.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.name,
      title: $t('resource.OpWorkSavedSearch.name'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.query,
      title: $t('resource.OpWorkSavedSearch.query'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.filters,
      title: $t('resource.OpWorkSavedSearch.filters'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkSavedSearch.isActive'),
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.isActive,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkSavedSearch.frequency'),
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.frequency,
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.lastSentAt,
      title: $t('resource.OpWorkSavedSearch.lastSentAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkSavedSearchScalarFieldEnum.updatedAt,
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
