import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkProject } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkProjectFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.title,
        label: $t('resource.OpWorkProject.title'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.description,
        label: $t('resource.OpWorkProject.description'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'IDEA', label: $t('resource.OpWorkProjectStatus.IDEA').split(' - ')[0], },
          { value: 'PLANNING', label: $t('resource.OpWorkProjectStatus.PLANNING').split(' - ')[0], },
          { value: 'DEVELOPMENT', label: $t('resource.OpWorkProjectStatus.DEVELOPMENT').split(' - ')[0], },
          { value: 'TESTING', label: $t('resource.OpWorkProjectStatus.TESTING').split(' - ')[0], },
          { value: 'LAUNCH_READY', label: $t('resource.OpWorkProjectStatus.LAUNCH_READY').split(' - ')[0], },
          { value: 'LIVE', label: $t('resource.OpWorkProjectStatus.LIVE').split(' - ')[0], },
          { value: 'MAINTENANCE', label: $t('resource.OpWorkProjectStatus.MAINTENANCE').split(' - ')[0], },
          { value: 'ON_HOLD', label: $t('resource.OpWorkProjectStatus.ON_HOLD').split(' - ')[0], },
          { value: 'CANCELLED', label: $t('resource.OpWorkProjectStatus.CANCELLED').split(' - ')[0], },
          { value: 'COMPLETED', label: $t('resource.OpWorkProjectStatus.COMPLETED').split(' - ')[0], },
          { value: 'ARCHIVED', label: $t('resource.OpWorkProjectStatus.ARCHIVED').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkProjectScalarFieldEnum.status,
        label: $t('resource.OpWorkProject.status'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'MVP', label: $t('resource.OpWorkProjectType.MVP').split(' - ')[0], },
          { value: 'STARTUP', label: $t('resource.OpWorkProjectType.STARTUP').split(' - ')[0], },
          { value: 'PRODUCT', label: $t('resource.OpWorkProjectType.PRODUCT').split(' - ')[0], },
          { value: 'SERVICE', label: $t('resource.OpWorkProjectType.SERVICE').split(' - ')[0], },
          { value: 'CONSULTING', label: $t('resource.OpWorkProjectType.CONSULTING').split(' - ')[0], },
          { value: 'AGENCY', label: $t('resource.OpWorkProjectType.AGENCY').split(' - ')[0], },
          { value: 'SAAS', label: $t('resource.OpWorkProjectType.SAAS').split(' - ')[0], },
          { value: 'ECOMMERCE', label: $t('resource.OpWorkProjectType.ECOMMERCE').split(' - ')[0], },
          { value: 'MOBILE_APP', label: $t('resource.OpWorkProjectType.MOBILE_APP').split(' - ')[0], },
          { value: 'WEB_APP', label: $t('resource.OpWorkProjectType.WEB_APP').split(' - ')[0], },
          { value: 'ENTERPRISE', label: $t('resource.OpWorkProjectType.ENTERPRISE').split(' - ')[0], },
          { value: 'NON_PROFIT', label: $t('resource.OpWorkProjectType.NON_PROFIT').split(' - ')[0], },
          { value: 'EDUCATION', label: $t('resource.OpWorkProjectType.EDUCATION').split(' - ')[0], },
          { value: 'HEALTHCARE', label: $t('resource.OpWorkProjectType.HEALTHCARE').split(' - ')[0], },
          { value: 'FINTECH', label: $t('resource.OpWorkProjectType.FINTECH').split(' - ')[0], },
          { value: 'GAMING', label: $t('resource.OpWorkProjectType.GAMING').split(' - ')[0], },
          { value: 'AI_ML', label: $t('resource.OpWorkProjectType.AI_ML').split(' - ')[0], },
          { value: 'BLOCKCHAIN', label: $t('resource.OpWorkProjectType.BLOCKCHAIN').split(' - ')[0], },
          { value: 'IOT', label: $t('resource.OpWorkProjectType.IOT').split(' - ')[0], },
          { value: 'MARKETING', label: $t('resource.OpWorkProjectType.MARKETING').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkProjectScalarFieldEnum.type,
        label: $t('resource.OpWorkProject.type'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl,
        label: $t('resource.OpWorkProject.githubRepoUrl'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.technologies,
        label: $t('resource.OpWorkProject.technologies'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.architecture,
        label: $t('resource.OpWorkProject.architecture'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription,
        label: $t('resource.OpWorkProject.plannedDatesDescription'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate,
        label: $t('resource.OpWorkProject.plannedStartDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate,
        label: $t('resource.OpWorkProject.plannedEndDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription,
        label: $t('resource.OpWorkProject.implementationDescription'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate,
        label: $t('resource.OpWorkProject.actualStartDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.developmentStart,
        label: $t('resource.OpWorkProject.developmentStart'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.testingStart,
        label: $t('resource.OpWorkProject.testingStart'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDescription,
        label: $t('resource.OpWorkProject.launchDescription'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDate,
        label: $t('resource.OpWorkProject.launchDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate,
        label: $t('resource.OpWorkProject.goLiveDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDescription,
        label: $t('resource.OpWorkProject.completionDescription'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate,
        label: $t('resource.OpWorkProject.actualEndDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDate,
        label: $t('resource.OpWorkProject.completionDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription,
        label: $t('resource.OpWorkProject.maintenanceDescription'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart,
        label: $t('resource.OpWorkProject.maintenanceStart'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd,
        label: $t('resource.OpWorkProject.maintenanceEnd'),
      
      
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
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 
      ];
    }

    export function useOpWorkProjectFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkProjectColumns < T = OpWorkProject> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkProject.title'),
        field: Prisma.OpWorkProjectScalarFieldEnum.title ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.description'),
        field: Prisma.OpWorkProjectScalarFieldEnum.description ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
            options: [
                        { value: 'IDEA', label: $t('resource.OpWorkProjectStatus.IDEA').split(' - ')[0], },
          { value: 'PLANNING', label: $t('resource.OpWorkProjectStatus.PLANNING').split(' - ')[0], },
          { value: 'DEVELOPMENT', label: $t('resource.OpWorkProjectStatus.DEVELOPMENT').split(' - ')[0], },
          { value: 'TESTING', label: $t('resource.OpWorkProjectStatus.TESTING').split(' - ')[0], },
          { value: 'LAUNCH_READY', label: $t('resource.OpWorkProjectStatus.LAUNCH_READY').split(' - ')[0], },
          { value: 'LIVE', label: $t('resource.OpWorkProjectStatus.LIVE').split(' - ')[0], },
          { value: 'MAINTENANCE', label: $t('resource.OpWorkProjectStatus.MAINTENANCE').split(' - ')[0], },
          { value: 'ON_HOLD', label: $t('resource.OpWorkProjectStatus.ON_HOLD').split(' - ')[0], },
          { value: 'CANCELLED', label: $t('resource.OpWorkProjectStatus.CANCELLED').split(' - ')[0], },
          { value: 'COMPLETED', label: $t('resource.OpWorkProjectStatus.COMPLETED').split(' - ')[0], },
          { value: 'ARCHIVED', label: $t('resource.OpWorkProjectStatus.ARCHIVED').split(' - ')[0], },
            ],
      },
        title: $t('resource.OpWorkProject.status'),
        field: Prisma.OpWorkProjectScalarFieldEnum.status ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
            options: [
                        { value: 'MVP', label: $t('resource.OpWorkProjectType.MVP').split(' - ')[0], },
          { value: 'STARTUP', label: $t('resource.OpWorkProjectType.STARTUP').split(' - ')[0], },
          { value: 'PRODUCT', label: $t('resource.OpWorkProjectType.PRODUCT').split(' - ')[0], },
          { value: 'SERVICE', label: $t('resource.OpWorkProjectType.SERVICE').split(' - ')[0], },
          { value: 'CONSULTING', label: $t('resource.OpWorkProjectType.CONSULTING').split(' - ')[0], },
          { value: 'AGENCY', label: $t('resource.OpWorkProjectType.AGENCY').split(' - ')[0], },
          { value: 'SAAS', label: $t('resource.OpWorkProjectType.SAAS').split(' - ')[0], },
          { value: 'ECOMMERCE', label: $t('resource.OpWorkProjectType.ECOMMERCE').split(' - ')[0], },
          { value: 'MOBILE_APP', label: $t('resource.OpWorkProjectType.MOBILE_APP').split(' - ')[0], },
          { value: 'WEB_APP', label: $t('resource.OpWorkProjectType.WEB_APP').split(' - ')[0], },
          { value: 'ENTERPRISE', label: $t('resource.OpWorkProjectType.ENTERPRISE').split(' - ')[0], },
          { value: 'NON_PROFIT', label: $t('resource.OpWorkProjectType.NON_PROFIT').split(' - ')[0], },
          { value: 'EDUCATION', label: $t('resource.OpWorkProjectType.EDUCATION').split(' - ')[0], },
          { value: 'HEALTHCARE', label: $t('resource.OpWorkProjectType.HEALTHCARE').split(' - ')[0], },
          { value: 'FINTECH', label: $t('resource.OpWorkProjectType.FINTECH').split(' - ')[0], },
          { value: 'GAMING', label: $t('resource.OpWorkProjectType.GAMING').split(' - ')[0], },
          { value: 'AI_ML', label: $t('resource.OpWorkProjectType.AI_ML').split(' - ')[0], },
          { value: 'BLOCKCHAIN', label: $t('resource.OpWorkProjectType.BLOCKCHAIN').split(' - ')[0], },
          { value: 'IOT', label: $t('resource.OpWorkProjectType.IOT').split(' - ')[0], },
          { value: 'MARKETING', label: $t('resource.OpWorkProjectType.MARKETING').split(' - ')[0], },
            ],
      },
        title: $t('resource.OpWorkProject.type'),
        field: Prisma.OpWorkProjectScalarFieldEnum.type ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.githubRepoUrl'),
        field: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.technologies'),
        field: Prisma.OpWorkProjectScalarFieldEnum.technologies ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.architecture'),
        field: Prisma.OpWorkProjectScalarFieldEnum.architecture ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.plannedDatesDescription'),
        field: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.plannedStartDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.plannedEndDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.implementationDescription'),
        field: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.actualStartDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.developmentStart'),
        field: Prisma.OpWorkProjectScalarFieldEnum.developmentStart ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.testingStart'),
        field: Prisma.OpWorkProjectScalarFieldEnum.testingStart ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.launchDescription'),
        field: Prisma.OpWorkProjectScalarFieldEnum.launchDescription ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.launchDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.launchDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.goLiveDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.completionDescription'),
        field: Prisma.OpWorkProjectScalarFieldEnum.completionDescription ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.actualEndDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.completionDate'),
        field: Prisma.OpWorkProjectScalarFieldEnum.completionDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.maintenanceDescription'),
        field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.maintenanceStart'),
        field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkProject.maintenanceEnd'),
        field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkProjectScalarFieldEnum.profileId ,
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
