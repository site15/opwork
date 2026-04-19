import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSeekerSkill, OpWorkSkill } from '#/generated/client';

import { getComponentProps } from '#/adapter/get-component-props';
import { opWorkSkillControllerFindMany } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobSeekerSkillFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'skillName',
      label: $t('resource.name.NewOpWorkSkill'),
      controlClass: 'w-full',
      labelClass: 'text-right',
      labelWidth: 200,
    },
    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkSkill>({
        findMany: (searchText?: string) =>
          opWorkSkillControllerFindMany({
            query: {
              perPage: 100,
              ...(searchText ? { searchText } : {}),
            },
          }),
        getLabel: (item) => item.name || item.id,
      }),
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      label: $t('resource.name.OpWorkSkill'),

      controlClass: 'w-full',
      labelClass: 'text-right',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'BEGINNER',
            label: $t('resource.OpWorkSkillLevel.BEGINNER').split(' - ')[0],
          },
          {
            value: 'ELEMENTARY',
            label: $t('resource.OpWorkSkillLevel.ELEMENTARY').split(' - ')[0],
          },
          {
            value: 'INTERMEDIATE',
            label: $t('resource.OpWorkSkillLevel.INTERMEDIATE').split(' - ')[0],
          },
          {
            value: 'ADVANCED',
            label: $t('resource.OpWorkSkillLevel.ADVANCED').split(' - ')[0],
          },
          {
            value: 'EXPERT',
            label: $t('resource.OpWorkSkillLevel.EXPERT').split(' - ')[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
      label: $t('resource.OpWorkJobSeekerSkill.level'),

      controlClass: 'w-full',
      labelClass: 'text-right',
      labelWidth: 200,
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
      label: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),

      controlClass: 'w-full',
      labelClass: 'text-right',
      labelWidth: 200,
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
      labelClass: 'text-right',
      labelWidth: 200,
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
      label: $t('resource.OpWorkJobSeekerSkill.lastUsed'),

      controlClass: 'w-full',
      labelClass: 'text-right',
      labelWidth: 200,
    },
  ];
}

export function useOpWorkJobSeekerSkillColumns<T = OpWorkJobSeekerSkill>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      cellRender: {
        name: 'CellEnum',
        props: {
          options: [
            {
              value: 'BEGINNER',
              label: $t('resource.OpWorkSkillLevel.BEGINNER').split(' - ')[0],
            },
            {
              value: 'ELEMENTARY',
              label: $t('resource.OpWorkSkillLevel.ELEMENTARY').split(' - ')[0],
            },
            {
              value: 'INTERMEDIATE',
              label: $t('resource.OpWorkSkillLevel.INTERMEDIATE').split(
                ' - ',
              )[0],
            },
            {
              value: 'ADVANCED',
              label: $t('resource.OpWorkSkillLevel.ADVANCED').split(' - ')[0],
            },
            {
              value: 'EXPERT',
              label: $t('resource.OpWorkSkillLevel.EXPERT').split(' - ')[0],
            },
          ],
        },
      },
      title: $t('resource.OpWorkJobSeekerSkill.level'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.level,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJobSeekerSkill.yearsOfExp'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.yearsOfExp,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellTag',
      },
      title: $t('resource.OpWorkJobSeekerSkill.isPrimary'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.isPrimary,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJobSeekerSkill.lastUsed'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.lastUsed,
      formatter: 'formatDateTime',
      sortable: true,
    },
    {
      title: $t('resource.name.OpWorkSkill'),
      field: Prisma.OpWorkJobSeekerSkillScalarFieldEnum.skillId,
      cellRender: {
        name: 'CellRender',
        props: {
          render: (row: any, column: any) => {
            return row.OpWorkSkill?.name || row[column.field] || '';
          },
        },
      },
      sortable: true,
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
