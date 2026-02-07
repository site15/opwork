import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AuthUser } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useAuthUserFormSchema(): VbenFormSchema[] {
  return [
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
      field: Prisma.AuthUserScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.anonymousId,
      title: $t('resource.AuthUser.anonymousId'),
      sortable: true
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      title: $t('resource.AuthUser.supabaseUserId'),
      sortable: true
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      title: $t('resource.AuthUser.supabaseUserData'),
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
      field: Prisma.AuthUserScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.updatedAt,
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
