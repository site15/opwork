import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobSkill, OpWorkSkill } from '#/generated/client';

import { getComponentProps } from '#/adapter/get-component-props';
import { opWorkSkillControllerFindMany } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobSkillFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'skillName',
      label: $t('resource.name.NewOpWorkSkill'),
      controlClass: 'w-full',
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
      label: $t('resource.name.OpWorkSkill'),
      rules: 'required',

      controlClass: 'w-full',
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      label: $t('resource.OpWorkJobSkill.isRequired'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'LOW',
            label: $t('resource.OpWorkSkillImportance.LOW').split(' - ')[0],
          },
          {
            value: 'BELOW_MEDIUM',
            label: $t('resource.OpWorkSkillImportance.BELOW_MEDIUM').split(
              ' - ',
            )[0],
          },
          {
            value: 'MEDIUM',
            label: $t('resource.OpWorkSkillImportance.MEDIUM').split(' - ')[0],
          },
          {
            value: 'HIGH',
            label: $t('resource.OpWorkSkillImportance.HIGH').split(' - ')[0],
          },
          {
            value: 'CRITICAL',
            label: $t('resource.OpWorkSkillImportance.CRITICAL').split(
              ' - ',
            )[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      label: $t('resource.OpWorkJobSkill.importance'),

      controlClass: 'w-full',
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
      fieldName: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      label: $t('resource.OpWorkJobSkill.minLevel'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
  ];
}

export function useOpWorkJobSkillColumns<T = OpWorkJobSkill>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      cellRender: {
        name: 'CellTag',
      },
      title: $t('resource.OpWorkJobSkill.isRequired'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.isRequired,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellEnum',
        props: {
          options: [
            {
              value: 'LOW',
              label: $t('resource.OpWorkSkillImportance.LOW').split(' - ')[0],
            },
            {
              value: 'BELOW_MEDIUM',
              label: $t('resource.OpWorkSkillImportance.BELOW_MEDIUM').split(
                ' - ',
              )[0],
            },
            {
              value: 'MEDIUM',
              label: $t('resource.OpWorkSkillImportance.MEDIUM').split(
                ' - ',
              )[0],
            },
            {
              value: 'HIGH',
              label: $t('resource.OpWorkSkillImportance.HIGH').split(' - ')[0],
            },
            {
              value: 'CRITICAL',
              label: $t('resource.OpWorkSkillImportance.CRITICAL').split(
                ' - ',
              )[0],
            },
          ],
        },
      },
      title: $t('resource.OpWorkJobSkill.importance'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.importance,
      sortable: true,
    },
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
      title: $t('resource.OpWorkJobSkill.minLevel'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.minLevel,
      sortable: true,
    },
    {
      title: $t('resource.name.OpWorkSkill'),
      field: Prisma.OpWorkJobSkillScalarFieldEnum.skillId,
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
