import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJob, opWorkJobControllerFindMany, type OpWorkJobTag } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkJobTagFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkJobTagScalarFieldEnum.name,
        label: $t('resource.OpWorkJobTag.name'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobTagScalarFieldEnum.color,
        label: $t('resource.OpWorkJobTag.color'),
      
      
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
        getLabel: (item) => item.title || item.id,
      }),
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
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
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkJobTagFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkJobTagColumns < T = OpWorkJobTag> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkJobTag.name'),
        field: Prisma.OpWorkJobTagScalarFieldEnum.name ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobTag.color'),
        field: Prisma.OpWorkJobTagScalarFieldEnum.color ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkJobTagScalarFieldEnum.profileId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkProfile?.title || row[column.field] || '';
            }
          }
        },
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkJob'),
        field: Prisma.OpWorkJobTagScalarFieldEnum.jobId ,
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
