import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkSearchHistory } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkSearchHistoryFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Textarea',
          fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.query,
        label: $t('resource.OpWorkSearchHistory.query'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.filters,
        label: $t('resource.OpWorkSearchHistory.filters'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount,
        label: $t('resource.OpWorkSearchHistory.resultsCount'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt,
        label: $t('resource.OpWorkSearchHistory.searchedAt'),
      
      
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
      fieldName: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkSearchHistoryFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkSearchHistoryColumns < T = OpWorkSearchHistory> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkSearchHistory.query'),
        field: Prisma.OpWorkSearchHistoryScalarFieldEnum.query ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSearchHistory.filters'),
        field: Prisma.OpWorkSearchHistoryScalarFieldEnum.filters ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSearchHistory.resultsCount'),
        field: Prisma.OpWorkSearchHistoryScalarFieldEnum.resultsCount ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSearchHistory.searchedAt'),
        field: Prisma.OpWorkSearchHistoryScalarFieldEnum.searchedAt ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkSearchHistoryScalarFieldEnum.profileId ,
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
