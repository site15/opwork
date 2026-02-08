import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import { authUserControllerFindMany, type AuthApiKey } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';
import { notification } from 'ant-design-vue';

export function useAuthApiKeyFormSchema(): VbenFormSchema[] {
  return [
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
      component: 'ApiSelect',
      componentProps: (componentProps) => {
        console.log({ componentProps })
        return {
          api: async (options: any) => {
                  console.log({ options })
            return await authUserControllerFindMany({query:{perPage:100, searchText:''}}).then(async (result) => {
            if (result?.error) {              
              notification.error({
                message: $t('actions.common.findManyFailed'),
                description: result.error instanceof Error ? result.error.message : '',
                duration: 3000,
              });
              return [];
            }
            return result.data?.items.map(item=>({ label: item.id, value: item.id }))||[];
          });
          },
          filterOption: false,
          debounce: 300,
          showSearch: true,
        };
      },
      fieldName: Prisma.AuthApiKeyScalarFieldEnum.userId,
      label: $t('resource.name.AuthUser'),
      rules: 'required',

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
      title: $t('resource.AuthApiKey.apiKey'),
      field: Prisma.AuthApiKeyScalarFieldEnum.apiKey,
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
      title: $t('resource.name.AuthUser'),
      field: Prisma.AuthApiKeyScalarFieldEnum.userId,
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
