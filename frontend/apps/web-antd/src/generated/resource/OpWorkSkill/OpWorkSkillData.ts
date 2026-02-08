import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  {  type OpWorkSkill } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkSkillFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.name,
        label: $t('resource.OpWorkSkill.name'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.description,
        label: $t('resource.OpWorkSkill.description'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'PROGRAMMING_LANGUAGE', label: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE').split(' - ')[0], },
          { value: 'FRAMEWORK', label: $t('resource.OpWorkSkillType.FRAMEWORK').split(' - ')[0], },
          { value: 'DATABASE', label: $t('resource.OpWorkSkillType.DATABASE').split(' - ')[0], },
          { value: 'TOOL', label: $t('resource.OpWorkSkillType.TOOL').split(' - ')[0], },
          { value: 'PLATFORM', label: $t('resource.OpWorkSkillType.PLATFORM').split(' - ')[0], },
          { value: 'LANGUAGE', label: $t('resource.OpWorkSkillType.LANGUAGE').split(' - ')[0], },
          { value: 'SOFT_SKILL', label: $t('resource.OpWorkSkillType.SOFT_SKILL').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkSkillScalarFieldEnum.type,
        label: $t('resource.OpWorkSkill.type'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.category,
        label: $t('resource.OpWorkSkill.category'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.icon,
        label: $t('resource.OpWorkSkill.icon'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.popularity,
        label: $t('resource.OpWorkSkill.popularity'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
      ];
    }

    export function useOpWorkSkillFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkSkillColumns < T = OpWorkSkill> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkSkill.name'),
        field: Prisma.OpWorkSkillScalarFieldEnum.name ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.description'),
        field: Prisma.OpWorkSkillScalarFieldEnum.description ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
          props:{
            options: [
                        { value: 'PROGRAMMING_LANGUAGE', label: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE').split(' - ')[0], },
          { value: 'FRAMEWORK', label: $t('resource.OpWorkSkillType.FRAMEWORK').split(' - ')[0], },
          { value: 'DATABASE', label: $t('resource.OpWorkSkillType.DATABASE').split(' - ')[0], },
          { value: 'TOOL', label: $t('resource.OpWorkSkillType.TOOL').split(' - ')[0], },
          { value: 'PLATFORM', label: $t('resource.OpWorkSkillType.PLATFORM').split(' - ')[0], },
          { value: 'LANGUAGE', label: $t('resource.OpWorkSkillType.LANGUAGE').split(' - ')[0], },
          { value: 'SOFT_SKILL', label: $t('resource.OpWorkSkillType.SOFT_SKILL').split(' - ')[0], },
            ],
          }
      },
        title: $t('resource.OpWorkSkill.type'),
        field: Prisma.OpWorkSkillScalarFieldEnum.type ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.category'),
        field: Prisma.OpWorkSkillScalarFieldEnum.category ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.icon'),
        field: Prisma.OpWorkSkillScalarFieldEnum.icon ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.popularity'),
        field: Prisma.OpWorkSkillScalarFieldEnum.popularity ,
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
