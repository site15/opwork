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
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      label: $t('resource.AuthUser.supabaseUserId'),
      rules: 'required',
    },
    {
      component: 'Textarea',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      label: $t('resource.AuthUser.supabaseUserData'),
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
    }
  ];
}

export function useAuthUserFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.anonymousId,
      label: $t('resource.AuthUser.anonymousId'),
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      label: $t('resource.AuthUser.supabaseUserId'),
    },
    {
      component: 'Input',
      fieldName: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      label: $t('resource.AuthUser.supabaseUserData'),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        allowClear: true,
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
    },
    {
      component: 'RangePicker',
      fieldName: Prisma.AuthUserScalarFieldEnum.createdAt,
      label: $t('resource.AuthUser.createdAt'),
    },
  ];
}

export function useAuthUserColumns<T = AuthUser>(
  onActionClick: OnActionClickFn<T>,
  onIsActiveChange?: (newValue: boolean, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: Prisma.AuthUserScalarFieldEnum.id,
      title: $t('resource.AuthUser.id'),
      width: 200,
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.anonymousId,
      title: $t('resource.AuthUser.anonymousId'),
      width: 200,
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserId,
      title: $t('resource.AuthUser.supabaseUserId'),
      width: 200,
    },
    {
      field: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      title: $t('resource.AuthUser.supabaseUserData'),
      width: 200,
    },
    {
      cellRender: {
        attrs: { beforeChange: onIsActiveChange },
        name: onIsActiveChange ? 'CellSwitch' : 'CellTag',
      },
      title: $t('resource.AuthUser.isActive'),
      field: Prisma.AuthUserScalarFieldEnum.isActive,
      width: 100,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'id',
          nameTitle: $t('resource.AuthUser.id'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('resource.AuthUser.operation'),
      width: 130,
    },
  ];
}
