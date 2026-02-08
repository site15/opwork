import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSeekerSkill } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSeekerSkillFormSchema(): VbenFormSchema[] {
  return [
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
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId,
      label: $t('resource.name.OpWorkJobSeeker'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      label: $t('resource.name.OpWorkSkill'),
      rules: 'required',
      
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
      title: $t('resource.OpWorkJobSeekerSkill.level'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
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
      title: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJobSeeker'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.jobSeekerId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkSkill'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
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
