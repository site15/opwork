import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSkill } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSkillFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      label: $t('resource.OpWorkJobSkill.isRequired'),
      
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      label: $t('resource.OpWorkJobSkill.importance'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      label: $t('resource.OpWorkJobSkill.minLevel'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      label: $t('resource.name.OpWorkSkill'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSkillFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobSkillColumns<T = OpWorkJobSkill>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSkill.isRequired'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSkill.importance'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSkill.minLevel'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJob'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkSkill'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
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
