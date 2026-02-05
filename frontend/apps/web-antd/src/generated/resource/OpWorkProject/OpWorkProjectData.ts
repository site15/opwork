import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkProject } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkProjectFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.id,
      label: $t('resource.OpWorkProject.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkProject.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkProject.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.profileId,
      label: $t('resource.OpWorkProject.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.title,
      label: $t('resource.OpWorkProject.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.description,
      label: $t('resource.OpWorkProject.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl,
      label: $t('resource.OpWorkProject.githubRepoUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.technologies,
      label: $t('resource.OpWorkProject.technologies'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.architecture,
      label: $t('resource.OpWorkProject.architecture'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription,
      label: $t('resource.OpWorkProject.plannedDatesDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate,
      label: $t('resource.OpWorkProject.plannedStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate,
      label: $t('resource.OpWorkProject.plannedEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription,
      label: $t('resource.OpWorkProject.implementationDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate,
      label: $t('resource.OpWorkProject.actualStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.developmentStart,
      label: $t('resource.OpWorkProject.developmentStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.testingStart,
      label: $t('resource.OpWorkProject.testingStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDescription,
      label: $t('resource.OpWorkProject.launchDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDate,
      label: $t('resource.OpWorkProject.launchDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate,
      label: $t('resource.OpWorkProject.goLiveDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDescription,
      label: $t('resource.OpWorkProject.completionDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate,
      label: $t('resource.OpWorkProject.actualEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDate,
      label: $t('resource.OpWorkProject.completionDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription,
      label: $t('resource.OpWorkProject.maintenanceDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart,
      label: $t('resource.OpWorkProject.maintenanceStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd,
      label: $t('resource.OpWorkProject.maintenanceEnd'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkProjectCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.profileId,
      label: $t('resource.OpWorkProject.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.title,
      label: $t('resource.OpWorkProject.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.description,
      label: $t('resource.OpWorkProject.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl,
      label: $t('resource.OpWorkProject.githubRepoUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.technologies,
      label: $t('resource.OpWorkProject.technologies'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.architecture,
      label: $t('resource.OpWorkProject.architecture'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription,
      label: $t('resource.OpWorkProject.plannedDatesDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate,
      label: $t('resource.OpWorkProject.plannedStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate,
      label: $t('resource.OpWorkProject.plannedEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription,
      label: $t('resource.OpWorkProject.implementationDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate,
      label: $t('resource.OpWorkProject.actualStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.developmentStart,
      label: $t('resource.OpWorkProject.developmentStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.testingStart,
      label: $t('resource.OpWorkProject.testingStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDescription,
      label: $t('resource.OpWorkProject.launchDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDate,
      label: $t('resource.OpWorkProject.launchDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate,
      label: $t('resource.OpWorkProject.goLiveDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDescription,
      label: $t('resource.OpWorkProject.completionDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate,
      label: $t('resource.OpWorkProject.actualEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDate,
      label: $t('resource.OpWorkProject.completionDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription,
      label: $t('resource.OpWorkProject.maintenanceDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart,
      label: $t('resource.OpWorkProject.maintenanceStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd,
      label: $t('resource.OpWorkProject.maintenanceEnd'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkProjectViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.id,
      label: $t('resource.OpWorkProject.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.profileId,
      label: $t('resource.OpWorkProject.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.title,
      label: $t('resource.OpWorkProject.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.description,
      label: $t('resource.OpWorkProject.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl,
      label: $t('resource.OpWorkProject.githubRepoUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.technologies,
      label: $t('resource.OpWorkProject.technologies'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.architecture,
      label: $t('resource.OpWorkProject.architecture'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription,
      label: $t('resource.OpWorkProject.plannedDatesDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate,
      label: $t('resource.OpWorkProject.plannedStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate,
      label: $t('resource.OpWorkProject.plannedEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription,
      label: $t('resource.OpWorkProject.implementationDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate,
      label: $t('resource.OpWorkProject.actualStartDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.developmentStart,
      label: $t('resource.OpWorkProject.developmentStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.testingStart,
      label: $t('resource.OpWorkProject.testingStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDescription,
      label: $t('resource.OpWorkProject.launchDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.launchDate,
      label: $t('resource.OpWorkProject.launchDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate,
      label: $t('resource.OpWorkProject.goLiveDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDescription,
      label: $t('resource.OpWorkProject.completionDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate,
      label: $t('resource.OpWorkProject.actualEndDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.completionDate,
      label: $t('resource.OpWorkProject.completionDate'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription,
      label: $t('resource.OpWorkProject.maintenanceDescription'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart,
      label: $t('resource.OpWorkProject.maintenanceStart'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd,
      label: $t('resource.OpWorkProject.maintenanceEnd'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkProject.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProjectScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkProject.updatedAt'),
      rules: 'required',
      disabled: true,
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

export function useOpWorkProjectColumns<T = OpWorkProject>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkProjectScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.profileId,
      title: $t('resource.OpWorkProject.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.title,
      title: $t('resource.OpWorkProject.title'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.description,
      title: $t('resource.OpWorkProject.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.githubRepoUrl,
      title: $t('resource.OpWorkProject.githubRepoUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.technologies,
      title: $t('resource.OpWorkProject.technologies'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.architecture,
      title: $t('resource.OpWorkProject.architecture'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.plannedDatesDescription,
      title: $t('resource.OpWorkProject.plannedDatesDescription'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.plannedStartDate,
      title: $t('resource.OpWorkProject.plannedStartDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.plannedEndDate,
      title: $t('resource.OpWorkProject.plannedEndDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.implementationDescription,
      title: $t('resource.OpWorkProject.implementationDescription'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.actualStartDate,
      title: $t('resource.OpWorkProject.actualStartDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.developmentStart,
      title: $t('resource.OpWorkProject.developmentStart'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.testingStart,
      title: $t('resource.OpWorkProject.testingStart'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.launchDescription,
      title: $t('resource.OpWorkProject.launchDescription'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.launchDate,
      title: $t('resource.OpWorkProject.launchDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.goLiveDate,
      title: $t('resource.OpWorkProject.goLiveDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.completionDescription,
      title: $t('resource.OpWorkProject.completionDescription'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.actualEndDate,
      title: $t('resource.OpWorkProject.actualEndDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.completionDate,
      title: $t('resource.OpWorkProject.completionDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceDescription,
      title: $t('resource.OpWorkProject.maintenanceDescription'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceStart,
      title: $t('resource.OpWorkProject.maintenanceStart'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.maintenanceEnd,
      title: $t('resource.OpWorkProject.maintenanceEnd'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProjectScalarFieldEnum.updatedAt,
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
