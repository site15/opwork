import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AuthSession } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useAuthSessionFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthSessionScalarFieldEnum.id,
      label: $t('resource.AuthSession.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthSessionScalarFieldEnum.createdAt,
      label: $t('resource.AuthSession.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthSessionScalarFieldEnum.updatedAt,
      label: $t('resource.AuthSession.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthSessionScalarFieldEnum.userId,
      label: $t('resource.AuthSession.userId'),
      rules: 'required',
      
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
      fieldName: Prisma.AuthSessionScalarFieldEnum.isActive,
      label: $t('resource.AuthSession.isActive'),
      
      
      labelWidth: 200
    },
  ];
}

export function useAuthSessionCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthSessionScalarFieldEnum.userId,
      label: $t('resource.AuthSession.userId'),
      rules: 'required',
      
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
      fieldName: Prisma.AuthSessionScalarFieldEnum.isActive,
      label: $t('resource.AuthSession.isActive'),
      
      
      labelWidth: 200
    },
  ];
}

export function useAuthSessionViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthSessionScalarFieldEnum.id,
      label: $t('resource.AuthSession.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthSessionScalarFieldEnum.userId,
      label: $t('resource.AuthSession.userId'),
      rules: 'required',
      
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
      fieldName: Prisma.AuthSessionScalarFieldEnum.isActive,
      label: $t('resource.AuthSession.isActive'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthSessionScalarFieldEnum.createdAt,
      label: $t('resource.AuthSession.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.AuthSessionScalarFieldEnum.updatedAt,
      label: $t('resource.AuthSession.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useAuthSessionFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useAuthSessionColumns<T = AuthSession>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.AuthSessionScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.AuthSessionScalarFieldEnum.userId,
      title: $t('resource.AuthSession.userId'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.AuthSession.isActive'),
      field: Prisma.AuthSessionScalarFieldEnum.isActive,
      sortable: true
    },
    {
      field: Prisma.AuthSessionScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.AuthSessionScalarFieldEnum.updatedAt,
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
