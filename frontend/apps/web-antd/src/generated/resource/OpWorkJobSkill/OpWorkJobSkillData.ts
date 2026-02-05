import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSkill } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobSkillFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.id,
      label: $t('resource.OpWorkJobSkill.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJobSkill.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobSkill.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      label: $t('resource.OpWorkJobSkill.skillId'),
      rules: 'required',
      
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      label: $t('resource.OpWorkJobSkill.isRequired'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      label: $t('resource.OpWorkJobSkill.importance'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      label: $t('resource.OpWorkJobSkill.minLevel'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSkillCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobSkill.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      label: $t('resource.OpWorkJobSkill.skillId'),
      rules: 'required',
      
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      label: $t('resource.OpWorkJobSkill.isRequired'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      label: $t('resource.OpWorkJobSkill.importance'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      label: $t('resource.OpWorkJobSkill.minLevel'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobSkillViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.id,
      label: $t('resource.OpWorkJobSkill.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobSkill.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      label: $t('resource.OpWorkJobSkill.skillId'),
      rules: 'required',
      
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      label: $t('resource.OpWorkJobSkill.isRequired'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      label: $t('resource.OpWorkJobSkill.importance'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      label: $t('resource.OpWorkJobSkill.minLevel'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJobSkill.createdAt'),
      rules: 'required',
      disabled: true,
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
      field: Prisma.OpWorkJobSkillScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSkillScalarFieldEnum.jobId,
      title: $t('resource.OpWorkJobSkill.jobId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      title: $t('resource.OpWorkJobSkill.skillId'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJobSkill.isRequired'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      title: $t('resource.OpWorkJobSkill.importance'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      title: $t('resource.OpWorkJobSkill.minLevel'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobSkillScalarFieldEnum.createdAt,
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
