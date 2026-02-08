import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AuthUser } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useAuthUserFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.email,
      label: $t('resource.AuthUser.email'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.anonymousId,
      label: $t('resource.AuthUser.anonymousId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      label: $t('resource.AuthUser.supabaseUserId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      label: $t('resource.AuthUser.supabaseUserData'),
      
      
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
      fieldName: Prisma.AuthUserScalarFieldEnum.isActive,
      label: $t('resource.AuthUser.isActive'),
      
      
      labelWidth: 200
    },
  ];
}

export function useAuthUserFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useAuthUserColumns<T = AuthUser>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      title: $t('resource.AuthUser.email'),
      field: Prisma.AuthUserScalarFieldEnum.email,
      sortable: true
    },
    {
      title: $t('resource.AuthUser.anonymousId'),
      field: Prisma.AuthUserScalarFieldEnum.anonymousId,
      sortable: true
    },
    {
      title: $t('resource.AuthUser.supabaseUserId'),
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      sortable: true
    },
    {
      title: $t('resource.AuthUser.supabaseUserData'),
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.AuthUser.isActive'),
      field: Prisma.AuthUserScalarFieldEnum.isActive,
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
