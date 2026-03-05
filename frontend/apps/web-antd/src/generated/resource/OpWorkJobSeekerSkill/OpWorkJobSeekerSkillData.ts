import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJobSeeker, opWorkJobSeekerControllerFindMany, type OpWorkSkill, opWorkSkillControllerFindMany, type OpWorkJobSeekerSkill } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkJobSeekerSkillFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
        label: $t('resource.OpWorkJobSeekerSkill.level'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
        label: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
      
      
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
          fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.isPrimary,
        label: $t('resource.OpWorkJobSeekerSkill.isPrimary'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
        label: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
      
      
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
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkJobSeeker>({
        findMany: (searchText?: string) => opWorkJobSeekerControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.currentPosition || item.id,
      }),
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId,
      label: $t('resource.name.OpWorkJobSeeker'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkSkill>({
        findMany: (searchText?: string) => opWorkSkillControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.name || item.id,
      }),
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      label: $t('resource.name.OpWorkSkill'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkJobSeekerSkillFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkJobSeekerSkillColumns < T = OpWorkJobSeekerSkill> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkJobSeekerSkill.level'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkJobSeekerSkill.isPrimary'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.isPrimary ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.profileId ,
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
        title: $t('resource.name.OpWorkJobSeeker'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkJobSeeker?.currentPosition || row[column.field] || '';
            }
          }
        },
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkSkill'),
        field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkSkill?.name || row[column.field] || '';
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
