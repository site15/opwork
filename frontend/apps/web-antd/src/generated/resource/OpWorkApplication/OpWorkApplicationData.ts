import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkApplication } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkApplicationFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Textarea',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.coverLetter,
      label: $t('resource.OpWorkApplication.coverLetter'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.resumeUrl,
      label: $t('resource.OpWorkApplication.resumeUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.portfolioUrl,
      label: $t('resource.OpWorkApplication.portfolioUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'PENDING', label: $t('resource.OpWorkApplicationStatus.PENDING').split(' - ')[0], },
          { value: 'REVIEWED', label: $t('resource.OpWorkApplicationStatus.REVIEWED').split(' - ')[0], },
          { value: 'SHORTLISTED', label: $t('resource.OpWorkApplicationStatus.SHORTLISTED').split(' - ')[0], },
          { value: 'INTERVIEW', label: $t('resource.OpWorkApplicationStatus.INTERVIEW').split(' - ')[0], },
          { value: 'OFFER', label: $t('resource.OpWorkApplicationStatus.OFFER').split(' - ')[0], },
          { value: 'REJECTED', label: $t('resource.OpWorkApplicationStatus.REJECTED').split(' - ')[0], },
          { value: 'WITHDRAWN', label: $t('resource.OpWorkApplicationStatus.WITHDRAWN').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.status,
      label: $t('resource.OpWorkApplication.status'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.statusNotes,
      label: $t('resource.OpWorkApplication.statusNotes'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      label: $t('resource.OpWorkApplication.appliedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      label: $t('resource.OpWorkApplication.statusUpdatedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      label: $t('resource.name.OpWorkJobSeeker'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
      label: $t('resource.name.OpWorkJob'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkApplicationFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkApplicationColumns<T = OpWorkApplication>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      title: $t('resource.OpWorkApplication.coverLetter'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.coverLetter,
      sortable: true
    },
    {
      title: $t('resource.OpWorkApplication.resumeUrl'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.resumeUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkApplication.portfolioUrl'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.portfolioUrl,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'PENDING', label: $t('resource.OpWorkApplicationStatus.PENDING').split(' - ')[0], },
          { value: 'REVIEWED', label: $t('resource.OpWorkApplicationStatus.REVIEWED').split(' - ')[0], },
          { value: 'SHORTLISTED', label: $t('resource.OpWorkApplicationStatus.SHORTLISTED').split(' - ')[0], },
          { value: 'INTERVIEW', label: $t('resource.OpWorkApplicationStatus.INTERVIEW').split(' - ')[0], },
          { value: 'OFFER', label: $t('resource.OpWorkApplicationStatus.OFFER').split(' - ')[0], },
          { value: 'REJECTED', label: $t('resource.OpWorkApplicationStatus.REJECTED').split(' - ')[0], },
          { value: 'WITHDRAWN', label: $t('resource.OpWorkApplicationStatus.WITHDRAWN').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkApplication.status'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.status,
      sortable: true
    },
    {
      title: $t('resource.OpWorkApplication.statusNotes'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.statusNotes,
      sortable: true
    },
    {
      title: $t('resource.OpWorkApplication.appliedAt'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.OpWorkApplication.statusUpdatedAt'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJobSeeker'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkJob'),
      field: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
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
