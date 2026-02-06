import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AuthApiKey } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useAuthApiKeyFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.id,
      label: $t('resource.AuthApiKey.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.createdAt,
      label: $t('resource.AuthApiKey.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.updatedAt,
      label: $t('resource.AuthApiKey.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.userId,
      label: $t('resource.AuthApiKey.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.apiKey,
      label: $t('resource.AuthApiKey.apiKey'),
      
      
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
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.isActive,
      label: $t('resource.AuthApiKey.isActive'),
      
      
      labelWidth: 200
    },
  ];
}

export function useAuthApiKeyCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.userId,
      label: $t('resource.AuthApiKey.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.apiKey,
      label: $t('resource.AuthApiKey.apiKey'),
      
      
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
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.isActive,
      label: $t('resource.AuthApiKey.isActive'),
      
      
      labelWidth: 200
    },
  ];
}

export function useAuthApiKeyViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.id,
      label: $t('resource.AuthApiKey.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.userId,
      label: $t('resource.AuthApiKey.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.apiKey,
      label: $t('resource.AuthApiKey.apiKey'),
      
      
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
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.isActive,
      label: $t('resource.AuthApiKey.isActive'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.createdAt,
      label: $t('resource.AuthApiKey.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.updatedAt,
      label: $t('resource.AuthApiKey.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useAuthApiKeyFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useAuthApiKeyColumns<T = AuthApiKey>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.AuthApiKeyScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.AuthApiKeyScalarFieldEnum.userId,
      title: $t('resource.AuthApiKey.userId'),
      sortable: true
    },
    {
      field: Prisma.AuthApiKeyScalarFieldEnum.apiKey,
      title: $t('resource.AuthApiKey.apiKey'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.AuthApiKey.isActive'),
      field: Prisma.AuthApiKeyScalarFieldEnum.isActive,
      sortable: true
    },
    {
      field: Prisma.AuthApiKeyScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.AuthApiKeyScalarFieldEnum.updatedAt,
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
