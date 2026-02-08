import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJob, opWorkJobControllerFindMany, type OpWorkSavedJob } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkSavedJobFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt,
        label: $t('resource.OpWorkSavedJob.savedAt'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.notes,
        label: $t('resource.OpWorkSavedJob.notes'),
      
      
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
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.profileId,
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
      fieldName: Prisma.OpWorkSavedJobScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkSavedJobFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkSavedJobColumns < T = OpWorkSavedJob> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkSavedJob.savedAt'),
        field: Prisma.OpWorkSavedJobScalarFieldEnum.savedAt ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkSavedJob.notes'),
        field: Prisma.OpWorkSavedJobScalarFieldEnum.notes ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkSavedJobScalarFieldEnum.profileId ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkJob'),
        field: Prisma.OpWorkSavedJobScalarFieldEnum.jobId ,
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
