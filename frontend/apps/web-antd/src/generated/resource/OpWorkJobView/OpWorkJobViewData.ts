import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJobView } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.id,
      label: $t('resource.OpWorkJobView.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobView.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobView.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      label: $t('resource.OpWorkJobView.viewedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      label: $t('resource.OpWorkJobView.ipAddress'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      label: $t('resource.OpWorkJobView.userAgent'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobView.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobView.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      label: $t('resource.OpWorkJobView.viewedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      label: $t('resource.OpWorkJobView.ipAddress'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      label: $t('resource.OpWorkJobView.userAgent'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.id,
      label: $t('resource.OpWorkJobView.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJobView.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      label: $t('resource.OpWorkJobView.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      label: $t('resource.OpWorkJobView.viewedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      label: $t('resource.OpWorkJobView.ipAddress'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      label: $t('resource.OpWorkJobView.userAgent'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobViewColumns<T = OpWorkJobView>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkJobViewScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobViewScalarFieldEnum.profileId,
      title: $t('resource.OpWorkJobView.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobViewScalarFieldEnum.jobId,
      title: $t('resource.OpWorkJobView.jobId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobViewScalarFieldEnum.viewedAt,
      title: $t('resource.OpWorkJobView.viewedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobViewScalarFieldEnum.ipAddress,
      title: $t('resource.OpWorkJobView.ipAddress'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobViewScalarFieldEnum.userAgent,
      title: $t('resource.OpWorkJobView.userAgent'),
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
