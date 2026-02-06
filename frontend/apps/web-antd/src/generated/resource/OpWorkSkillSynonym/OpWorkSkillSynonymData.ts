import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkSkillSynonym } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkSkillSynonymFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.id,
      label: $t('resource.OpWorkSkillSynonym.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSkillSynonym.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.skillId,
      label: $t('resource.OpWorkSkillSynonym.skillId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.synonym,
      label: $t('resource.OpWorkSkillSynonym.synonym'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSkillSynonymCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.skillId,
      label: $t('resource.OpWorkSkillSynonym.skillId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.synonym,
      label: $t('resource.OpWorkSkillSynonym.synonym'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkSkillSynonymViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.id,
      label: $t('resource.OpWorkSkillSynonym.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.skillId,
      label: $t('resource.OpWorkSkillSynonym.skillId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.synonym,
      label: $t('resource.OpWorkSkillSynonym.synonym'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkSkillSynonymScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkSkillSynonym.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkSkillSynonymFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkSkillSynonymColumns<T = OpWorkSkillSynonym>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkSkillSynonymScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillSynonymScalarFieldEnum.skillId,
      title: $t('resource.OpWorkSkillSynonym.skillId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillSynonymScalarFieldEnum.synonym,
      title: $t('resource.OpWorkSkillSynonym.synonym'),
      sortable: true
    },
    {
      field: Prisma.OpWorkSkillSynonymScalarFieldEnum.createdAt,
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
      width: 200,
    },
  ];
}
