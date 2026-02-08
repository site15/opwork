import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkNotification } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkNotificationFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'APPLICATION_RECEIVED', label: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED').split(' - ')[0], },
          { value: 'APPLICATION_SHORTLISTED', label: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED').split(' - ')[0], },
          { value: 'INTERVIEW_SCHEDULED', label: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED').split(' - ')[0], },
          { value: 'JOB_OFFER', label: $t('resource.OpWorkNotificationType.JOB_OFFER').split(' - ')[0], },
          { value: 'JOB_MATCH', label: $t('resource.OpWorkNotificationType.JOB_MATCH').split(' - ')[0], },
          { value: 'JOB_STATUS_CHANGED', label: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED').split(' - ')[0], },
          { value: 'NEW_PROJECT', label: $t('resource.OpWorkNotificationType.NEW_PROJECT').split(' - ')[0], },
          { value: 'MESSAGE_RECEIVED', label: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED').split(' - ')[0], },
          { value: 'REMINDER', label: $t('resource.OpWorkNotificationType.REMINDER').split(' - ')[0], },
          { value: 'SYSTEM_ALERT', label: $t('resource.OpWorkNotificationType.SYSTEM_ALERT').split(' - ')[0], },
          { value: 'PROFILE_UPDATE', label: $t('resource.OpWorkNotificationType.PROFILE_UPDATE').split(' - ')[0], },
          { value: 'NETWORK_ACTIVITY', label: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.type,
      label: $t('resource.OpWorkNotification.type'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.title,
      label: $t('resource.OpWorkNotification.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.message,
      label: $t('resource.OpWorkNotification.message'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.data,
      label: $t('resource.OpWorkNotification.data'),
      
      
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
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.isRead,
      label: $t('resource.OpWorkNotification.isRead'),
      
      
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
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.isArchived,
      label: $t('resource.OpWorkNotification.isArchived'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.readAt,
      label: $t('resource.OpWorkNotification.readAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkNotificationColumns<T = OpWorkNotification>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'APPLICATION_RECEIVED', label: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED').split(' - ')[0], },
          { value: 'APPLICATION_SHORTLISTED', label: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED').split(' - ')[0], },
          { value: 'INTERVIEW_SCHEDULED', label: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED').split(' - ')[0], },
          { value: 'JOB_OFFER', label: $t('resource.OpWorkNotificationType.JOB_OFFER').split(' - ')[0], },
          { value: 'JOB_MATCH', label: $t('resource.OpWorkNotificationType.JOB_MATCH').split(' - ')[0], },
          { value: 'JOB_STATUS_CHANGED', label: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED').split(' - ')[0], },
          { value: 'NEW_PROJECT', label: $t('resource.OpWorkNotificationType.NEW_PROJECT').split(' - ')[0], },
          { value: 'MESSAGE_RECEIVED', label: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED').split(' - ')[0], },
          { value: 'REMINDER', label: $t('resource.OpWorkNotificationType.REMINDER').split(' - ')[0], },
          { value: 'SYSTEM_ALERT', label: $t('resource.OpWorkNotificationType.SYSTEM_ALERT').split(' - ')[0], },
          { value: 'PROFILE_UPDATE', label: $t('resource.OpWorkNotificationType.PROFILE_UPDATE').split(' - ')[0], },
          { value: 'NETWORK_ACTIVITY', label: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkNotification.type'),
      field: Prisma.OpWorkNotificationScalarFieldEnum.type,
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.title,
      title: $t('resource.OpWorkNotification.title'),
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.message,
      title: $t('resource.OpWorkNotification.message'),
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.data,
      title: $t('resource.OpWorkNotification.data'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotification.isRead'),
      field: Prisma.OpWorkNotificationScalarFieldEnum.isRead,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkNotification.isArchived'),
      field: Prisma.OpWorkNotificationScalarFieldEnum.isArchived,
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.readAt,
      title: $t('resource.OpWorkNotification.readAt'),
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
