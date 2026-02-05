import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkNotificationSettings } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkNotificationSettingsFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.id,
      label: $t('resource.OpWorkNotificationSettings.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkNotificationSettings.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotificationSettings.profileId'),
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter,
      label: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationSettingsCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotificationSettings.profileId'),
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter,
      label: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationSettingsViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.id,
      label: $t('resource.OpWorkNotificationSettings.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotificationSettings.profileId'),
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter,
      label: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates,
      label: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
      
      
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
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts,
      label: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkNotificationSettings.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationSettingsFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkNotificationSettingsColumns<T = OpWorkNotificationSettings>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId,
      title: $t('resource.OpWorkNotificationSettings.profileId'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts,
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.updatedAt,
      title: $t('common.updatedAt'),
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
