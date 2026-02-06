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
          { value: 'PROGRAMMING_LANGUAGE', label: $t('resource.OpWorkSkillType.PROGRAMMING_LANGUAGE').split(' - ')[0], },
          { value: 'FRAMEWORK', label: $t('resource.OpWorkSkillType.FRAMEWORK').split(' - ')[0], },
          { value: 'DATABASE', label: $t('resource.OpWorkSkillType.DATABASE').split(' - ')[0], },
          { value: 'TOOL', label: $t('resource.OpWorkSkillType.TOOL').split(' - ')[0], },
          { value: 'PLATFORM', label: $t('resource.OpWorkSkillType.PLATFORM').split(' - ')[0], },
          { value: 'LANGUAGE', label: $t('resource.OpWorkSkillType.LANGUAGE').split(' - ')[0], },
          { value: 'SOFT_SKILL', label: $t('resource.OpWorkSkillType.SOFT_SKILL').split(' - ')[0], },
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
