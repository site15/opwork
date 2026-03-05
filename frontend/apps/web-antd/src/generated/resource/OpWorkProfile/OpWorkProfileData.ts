import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type AuthUser, authUserControllerFindMany, type OpWorkProfile } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkProfileScalarFieldEnum.type,
        label: $t('resource.OpWorkProfile.type'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkProfileScalarFieldEnum.userType,
        label: $t('resource.OpWorkProfile.userType'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
        label: $t('resource.OpWorkProfile.email'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
        label: $t('resource.OpWorkProfile.phone'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
        label: $t('resource.OpWorkProfile.website'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
        label: $t('resource.OpWorkProfile.location'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
        label: $t('resource.OpWorkProfile.avatarUrl'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
        label: $t('resource.OpWorkProfile.coverImage'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userId,
      label: $t('resource.name.AuthUser'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkProfileFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkProfileColumns < T = OpWorkProfile> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        cellRender: {
          name: 'CellEnum',
          props:{
            options: [
                        { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
            ],
          }
      },
        title: $t('resource.OpWorkProfile.type'),
        field: Prisma.OpWorkProfileScalarFieldEnum.type ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
          props:{
            options: [
                        { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
            ],
          }
      },
        title: $t('resource.OpWorkProfile.userType'),
        field: Prisma.OpWorkProfileScalarFieldEnum.userType ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.email'),
        field: Prisma.OpWorkProfileScalarFieldEnum.email ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.phone'),
        field: Prisma.OpWorkProfileScalarFieldEnum.phone ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.website'),
        field: Prisma.OpWorkProfileScalarFieldEnum.website ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.location'),
        field: Prisma.OpWorkProfileScalarFieldEnum.location ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.avatarUrl'),
        field: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProfile.coverImage'),
        field: Prisma.OpWorkProfileScalarFieldEnum.coverImage ,
        sortable: true
      }, 
    {
        title: $t('resource.name.AuthUser'),
        field: Prisma.OpWorkProfileScalarFieldEnum.userId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.AuthUser?.email || row[column.field] || '';
            }
          }
        },
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
