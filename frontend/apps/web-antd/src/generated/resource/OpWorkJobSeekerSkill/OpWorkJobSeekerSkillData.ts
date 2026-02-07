import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSeekerSkill } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSeekerSkillFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkJobSeekerSkill.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      label: $t('resource.OpWorkJobSeekerSkill.skillId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
      label: $t('resource.OpWorkJobSeekerSkill.level'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
      label: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
      
      
      labelWidth: 200
    },
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
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.isPrimary,
      label: $t('resource.OpWorkJobSeekerSkill.isPrimary'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
      label: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
      
      
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

export function useOpWorkJobSeekerSkillColumns<T = OpWorkJobSeekerSkill>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId,
      title: $t('resource.OpWorkJobSeekerSkill.jobSeekerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      title: $t('resource.OpWorkJobSeekerSkill.skillId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
      title: $t('resource.OpWorkJobSeekerSkill.level'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
      title: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSeekerSkill.isPrimary'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.isPrimary,
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
      title: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.createdAt,
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
