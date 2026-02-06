import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkNotification } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkNotificationFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.id,
      label: $t('resource.OpWorkNotification.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkNotification.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.userId,
      label: $t('resource.OpWorkNotification.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotification.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'APPLICATION_RECEIVED', value: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED'), },
          { label: 'APPLICATION_SHORTLISTED', value: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED'), },
          { label: 'INTERVIEW_SCHEDULED', value: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED'), },
          { label: 'JOB_OFFER', value: $t('resource.OpWorkNotificationType.JOB_OFFER'), },
          { label: 'JOB_MATCH', value: $t('resource.OpWorkNotificationType.JOB_MATCH'), },
          { label: 'JOB_STATUS_CHANGED', value: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED'), },
          { label: 'NEW_PROJECT', value: $t('resource.OpWorkNotificationType.NEW_PROJECT'), },
          { label: 'MESSAGE_RECEIVED', value: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED'), },
          { label: 'REMINDER', value: $t('resource.OpWorkNotificationType.REMINDER'), },
          { label: 'SYSTEM_ALERT', value: $t('resource.OpWorkNotificationType.SYSTEM_ALERT'), },
          { label: 'PROFILE_UPDATE', value: $t('resource.OpWorkNotificationType.PROFILE_UPDATE'), },
          { label: 'NETWORK_ACTIVITY', value: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY'), },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.readAt,
      label: $t('resource.OpWorkNotification.readAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.userId,
      label: $t('resource.OpWorkNotification.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotification.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'APPLICATION_RECEIVED', value: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED'), },
          { label: 'APPLICATION_SHORTLISTED', value: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED'), },
          { label: 'INTERVIEW_SCHEDULED', value: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED'), },
          { label: 'JOB_OFFER', value: $t('resource.OpWorkNotificationType.JOB_OFFER'), },
          { label: 'JOB_MATCH', value: $t('resource.OpWorkNotificationType.JOB_MATCH'), },
          { label: 'JOB_STATUS_CHANGED', value: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED'), },
          { label: 'NEW_PROJECT', value: $t('resource.OpWorkNotificationType.NEW_PROJECT'), },
          { label: 'MESSAGE_RECEIVED', value: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED'), },
          { label: 'REMINDER', value: $t('resource.OpWorkNotificationType.REMINDER'), },
          { label: 'SYSTEM_ALERT', value: $t('resource.OpWorkNotificationType.SYSTEM_ALERT'), },
          { label: 'PROFILE_UPDATE', value: $t('resource.OpWorkNotificationType.PROFILE_UPDATE'), },
          { label: 'NETWORK_ACTIVITY', value: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY'), },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.readAt,
      label: $t('resource.OpWorkNotification.readAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkNotificationViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.id,
      label: $t('resource.OpWorkNotification.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.userId,
      label: $t('resource.OpWorkNotification.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkNotification.profileId'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { label: 'APPLICATION_RECEIVED', value: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED'), },
          { label: 'APPLICATION_SHORTLISTED', value: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED'), },
          { label: 'INTERVIEW_SCHEDULED', value: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED'), },
          { label: 'JOB_OFFER', value: $t('resource.OpWorkNotificationType.JOB_OFFER'), },
          { label: 'JOB_MATCH', value: $t('resource.OpWorkNotificationType.JOB_MATCH'), },
          { label: 'JOB_STATUS_CHANGED', value: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED'), },
          { label: 'NEW_PROJECT', value: $t('resource.OpWorkNotificationType.NEW_PROJECT'), },
          { label: 'MESSAGE_RECEIVED', value: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED'), },
          { label: 'REMINDER', value: $t('resource.OpWorkNotificationType.REMINDER'), },
          { label: 'SYSTEM_ALERT', value: $t('resource.OpWorkNotificationType.SYSTEM_ALERT'), },
          { label: 'PROFILE_UPDATE', value: $t('resource.OpWorkNotificationType.PROFILE_UPDATE'), },
          { label: 'NETWORK_ACTIVITY', value: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY'), },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkNotificationScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkNotification.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
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
      field: Prisma.OpWorkNotificationScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.userId,
      title: $t('resource.OpWorkNotification.userId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkNotificationScalarFieldEnum.profileId,
      title: $t('resource.OpWorkNotification.profileId'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
                    { label: 'APPLICATION_RECEIVED', value: $t('resource.OpWorkNotificationType.APPLICATION_RECEIVED'), },
          { label: 'APPLICATION_SHORTLISTED', value: $t('resource.OpWorkNotificationType.APPLICATION_SHORTLISTED'), },
          { label: 'INTERVIEW_SCHEDULED', value: $t('resource.OpWorkNotificationType.INTERVIEW_SCHEDULED'), },
          { label: 'JOB_OFFER', value: $t('resource.OpWorkNotificationType.JOB_OFFER'), },
          { label: 'JOB_MATCH', value: $t('resource.OpWorkNotificationType.JOB_MATCH'), },
          { label: 'JOB_STATUS_CHANGED', value: $t('resource.OpWorkNotificationType.JOB_STATUS_CHANGED'), },
          { label: 'NEW_PROJECT', value: $t('resource.OpWorkNotificationType.NEW_PROJECT'), },
          { label: 'MESSAGE_RECEIVED', value: $t('resource.OpWorkNotificationType.MESSAGE_RECEIVED'), },
          { label: 'REMINDER', value: $t('resource.OpWorkNotificationType.REMINDER'), },
          { label: 'SYSTEM_ALERT', value: $t('resource.OpWorkNotificationType.SYSTEM_ALERT'), },
          { label: 'PROFILE_UPDATE', value: $t('resource.OpWorkNotificationType.PROFILE_UPDATE'), },
          { label: 'NETWORK_ACTIVITY', value: $t('resource.OpWorkNotificationType.NETWORK_ACTIVITY'), },
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
      field: Prisma.OpWorkNotificationScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
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
      width: 130,
    },
  ];
}
