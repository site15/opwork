import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJob, opWorkJobControllerFindMany, type OpWorkJobView } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkJobViewFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
        label: $t('resource.OpWorkJobView.viewedAt'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
        label: $t('resource.OpWorkJobView.ipAddress'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
        label: $t('resource.OpWorkJobView.userAgent'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkProfile>({
        findMany: (searchText?: string) => opWorkProfileControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.email || item.id,
      }),
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkJob>({
        findMany: (searchText?: string) => opWorkJobControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.title || item.id,
      }),
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkJobViewFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkJobViewColumns < T = OpWorkJobView> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkJobView.viewedAt'),
        field: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobView.ipAddress'),
        field: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobView.userAgent'),
        field: Prisma.OpWorkJobViewScalarFieldEnum.userAgent ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkJobViewScalarFieldEnum.profileId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkProfile?.email || row[column.field] || '';
            }
          }
        },
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkJob'),
        field: Prisma.OpWorkJobViewScalarFieldEnum.jobId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkJob?.title || row[column.field] || '';
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
