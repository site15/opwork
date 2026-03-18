import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobTag } from '#/generated/client';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useOpWorkJobTagFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.name,
      label: $t('resource.OpWorkJobTag.name'),
      rules: 'required',

      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobTagScalarFieldEnum.color,
      label: $t('resource.OpWorkJobTag.color'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
  ];
}

export function useOpWorkJobTagColumns<T = OpWorkJobTag>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      title: $t('resource.OpWorkJobTag.name'),
      field: Prisma.OpWorkJobTagScalarFieldEnum.name,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJobTag.color'),
      field: Prisma.OpWorkJobTagScalarFieldEnum.color,
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
