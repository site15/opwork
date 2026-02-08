import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type AuthUser, authUserControllerFindMany, type AuthSession } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useAuthSessionFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'RadioGroup',
          componentProps: {
          buttonStyle: 'solid',
            options: [
              { label: $t('common.yes'), value: true },
              { label: $t('common.no'), value: false },
            ],
              optionType: 'button',
      },
        defaultValue: false,
          fieldName: Prisma.AuthSessionScalarFieldEnum.isActive,
        label: $t('resource.AuthSession.isActive'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<AuthUser>({
        findMany: (searchText?: string) => authUserControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.email || item.id,
      }),
      fieldName: Prisma.AuthSessionScalarFieldEnum.userId,
      label: $t('resource.name.AuthUser'),
      rules: 'required',
      
      controlClass: 'w-full',
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

    export function useAuthSessionColumns < T = AuthSession> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.AuthSession.isActive'),
        field: Prisma.AuthSessionScalarFieldEnum.isActive ,
        sortable: true
      }, 
    {
        title: $t('resource.name.AuthUser'),
        field: Prisma.AuthSessionScalarFieldEnum.userId ,
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
