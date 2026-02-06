import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSkill } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSkillFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.id,
      label: $t('resource.OpWorkSkill.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSkill.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.name,
      label: $t('resource.OpWorkSkill.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.description,
      label: $t('resource.OpWorkSkill.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'PROGRAMMING_LANGUAGE', value: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE'), },
          { label: 'FRAMEWORK', value: $t('resource.OpWorkSkillType.FRAMEWORK'), },
          { label: 'DATABASE', value: $t('resource.OpWorkSkillType.DATABASE'), },
          { label: 'TOOL', value: $t('resource.OpWorkSkillType.TOOL'), },
          { label: 'PLATFORM', value: $t('resource.OpWorkSkillType.PLATFORM'), },
          { label: 'LANGUAGE', value: $t('resource.OpWorkSkillType.LANGUAGE'), },
          { label: 'SOFT_SKILL', value: $t('resource.OpWorkSkillType.SOFT_SKILL'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.type,
      label: $t('resource.OpWorkSkill.type'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.category,
      label: $t('resource.OpWorkSkill.category'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.icon,
      label: $t('resource.OpWorkSkill.icon'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.popularity,
      label: $t('resource.OpWorkSkill.popularity'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSkillCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.name,
      label: $t('resource.OpWorkSkill.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.description,
      label: $t('resource.OpWorkSkill.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'PROGRAMMING_LANGUAGE', value: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE'), },
          { label: 'FRAMEWORK', value: $t('resource.OpWorkSkillType.FRAMEWORK'), },
          { label: 'DATABASE', value: $t('resource.OpWorkSkillType.DATABASE'), },
          { label: 'TOOL', value: $t('resource.OpWorkSkillType.TOOL'), },
          { label: 'PLATFORM', value: $t('resource.OpWorkSkillType.PLATFORM'), },
          { label: 'LANGUAGE', value: $t('resource.OpWorkSkillType.LANGUAGE'), },
          { label: 'SOFT_SKILL', value: $t('resource.OpWorkSkillType.SOFT_SKILL'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.type,
      label: $t('resource.OpWorkSkill.type'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.category,
      label: $t('resource.OpWorkSkill.category'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.icon,
      label: $t('resource.OpWorkSkill.icon'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.popularity,
      label: $t('resource.OpWorkSkill.popularity'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSkillViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.id,
      label: $t('resource.OpWorkSkill.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.name,
      label: $t('resource.OpWorkSkill.name'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.description,
      label: $t('resource.OpWorkSkill.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'PROGRAMMING_LANGUAGE', value: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE'), },
          { label: 'FRAMEWORK', value: $t('resource.OpWorkSkillType.FRAMEWORK'), },
          { label: 'DATABASE', value: $t('resource.OpWorkSkillType.DATABASE'), },
          { label: 'TOOL', value: $t('resource.OpWorkSkillType.TOOL'), },
          { label: 'PLATFORM', value: $t('resource.OpWorkSkillType.PLATFORM'), },
          { label: 'LANGUAGE', value: $t('resource.OpWorkSkillType.LANGUAGE'), },
          { label: 'SOFT_SKILL', value: $t('resource.OpWorkSkillType.SOFT_SKILL'), },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.type,
      label: $t('resource.OpWorkSkill.type'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.category,
      label: $t('resource.OpWorkSkill.category'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.icon,
      label: $t('resource.OpWorkSkill.icon'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.popularity,
      label: $t('resource.OpWorkSkill.popularity'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSkillScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSkill.createdAt'),
      rules: 'required',
      disabled: true,
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

export function useOpWorkSkillColumns<T = OpWorkSkill>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkSkillScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.name,
      title: $t('resource.OpWorkSkill.name'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.description,
      title: $t('resource.OpWorkSkill.description'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
                    { label: 'PROGRAMMING_LANGUAGE', value: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE'), },
          { label: 'FRAMEWORK', value: $t('resource.OpWorkSkillType.FRAMEWORK'), },
          { label: 'DATABASE', value: $t('resource.OpWorkSkillType.DATABASE'), },
          { label: 'TOOL', value: $t('resource.OpWorkSkillType.TOOL'), },
          { label: 'PLATFORM', value: $t('resource.OpWorkSkillType.PLATFORM'), },
          { label: 'LANGUAGE', value: $t('resource.OpWorkSkillType.LANGUAGE'), },
          { label: 'SOFT_SKILL', value: $t('resource.OpWorkSkillType.SOFT_SKILL'), },
        ],
      },
      title: $t('resource.OpWorkSkill.type'),
      field: Prisma.OpWorkSkillScalarFieldEnum.type,
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.category,
      title: $t('resource.OpWorkSkill.category'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.icon,
      title: $t('resource.OpWorkSkill.icon'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.popularity,
      title: $t('resource.OpWorkSkill.popularity'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
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
      width: 130,
    },
  ];
}
