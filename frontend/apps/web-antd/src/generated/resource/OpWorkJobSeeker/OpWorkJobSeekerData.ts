import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJobSeeker } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkJobSeekerFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition,
        label: $t('resource.OpWorkJobSeeker.currentPosition'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany,
        label: $t('resource.OpWorkJobSeeker.currentCompany'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.summary,
        label: $t('resource.OpWorkJobSeeker.summary'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary,
        label: $t('resource.OpWorkJobSeeker.expectedSalary'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency,
        label: $t('resource.OpWorkJobSeeker.salaryCurrency'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
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
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork,
        label: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
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
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote,
        label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
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
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation,
        label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations,
        label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl,
        label: $t('resource.OpWorkJobSeeker.linkedinUrl'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl,
        label: $t('resource.OpWorkJobSeeker.githubUrl'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl,
        label: $t('resource.OpWorkJobSeeker.portfolioUrl'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkJobSeekerFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkJobSeekerColumns < T = OpWorkJobSeeker> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkJobSeeker.currentPosition'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentPosition ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.currentCompany'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.currentCompany ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.summary'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.summary ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.expectedSalary'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.expectedSalary ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.salaryCurrency'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.salaryCurrency ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkJobSeeker.isOpenToWork'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToWork ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRemote ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.isOpenToRelocation ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.preferredLocations'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.preferredLocations ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.linkedinUrl'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.linkedinUrl ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.githubUrl'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.githubUrl ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeeker.portfolioUrl'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.portfolioUrl ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkJobSeekerScalarFieldEnum.profileId ,
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
