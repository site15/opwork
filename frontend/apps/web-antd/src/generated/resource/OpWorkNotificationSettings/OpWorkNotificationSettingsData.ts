import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkNotificationSettings } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkNotificationSettingsFormSchema(): VbenFormSchema[] {
      return [
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
          fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates,
        label: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
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
          fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts,
        label: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
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
          fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter,
        label: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
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
          fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates,
        label: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
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
          fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts,
        label: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.jobAlertFrequency,
        label: $t('resource.OpWorkNotificationSettings.jobAlertFrequency'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkProfile>({
        findMany: (searchText?: string) => opWorkProfileControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.title || item.id,
      }),
      fieldName: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      controlClass: 'w-full',
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

    export function useOpWorkNotificationSettingsColumns < T = OpWorkNotificationSettings> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkNotificationSettings.emailApplicationUpdates'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailApplicationUpdates ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkNotificationSettings.emailJobAlerts'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailJobAlerts ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkNotificationSettings.emailNewsletter'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.emailNewsletter ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkNotificationSettings.pushApplicationUpdates'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushApplicationUpdates ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkNotificationSettings.pushJobAlerts'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.pushJobAlerts ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
            options: [
                        { value: 'MINUTELY', label: $t('resource.OpWorkFrequency.MINUTELY').split(' - ')[0], },
          { value: 'HOURLY', label: $t('resource.OpWorkFrequency.HOURLY').split(' - ')[0], },
          { value: 'DAILY', label: $t('resource.OpWorkFrequency.DAILY').split(' - ')[0], },
          { value: 'WEEKLY', label: $t('resource.OpWorkFrequency.WEEKLY').split(' - ')[0], },
          { value: 'MONTHLY', label: $t('resource.OpWorkFrequency.MONTHLY').split(' - ')[0], },
          { value: 'ON_DEMAND', label: $t('resource.OpWorkFrequency.ON_DEMAND').split(' - ')[0], },
            ],
      },
        title: $t('resource.OpWorkNotificationSettings.jobAlertFrequency'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.jobAlertFrequency ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkNotificationSettingsScalarFieldEnum.profileId ,
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
