import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkApplication } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkApplicationFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.id,
      label: $t('resource.OpWorkApplication.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkApplication.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkApplication.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
      label: $t('resource.OpWorkApplication.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      label: $t('resource.OpWorkApplication.appliedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      label: $t('resource.OpWorkApplication.statusUpdatedAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkApplicationCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkApplication.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkApplication.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
      label: $t('resource.OpWorkApplication.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      label: $t('resource.OpWorkApplication.appliedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      label: $t('resource.OpWorkApplication.statusUpdatedAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkApplicationViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.id,
      label: $t('resource.OpWorkApplication.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkApplication.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      label: $t('resource.OpWorkApplication.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
      label: $t('resource.OpWorkApplication.jobId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      label: $t('resource.OpWorkApplication.appliedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      label: $t('resource.OpWorkApplication.statusUpdatedAt'),
      
      
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
      field: Prisma.OpWorkApplicationScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.jobSeekerId,
      title: $t('resource.OpWorkApplication.jobSeekerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.profileId,
      title: $t('resource.OpWorkApplication.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.jobId,
      title: $t('resource.OpWorkApplication.jobId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.coverLetter,
      title: $t('resource.OpWorkApplication.coverLetter'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.resumeUrl,
      title: $t('resource.OpWorkApplication.resumeUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.portfolioUrl,
      title: $t('resource.OpWorkApplication.portfolioUrl'),
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
      field: Prisma.OpWorkApplicationScalarFieldEnum.statusNotes,
      title: $t('resource.OpWorkApplication.statusNotes'),
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.appliedAt,
      title: $t('resource.OpWorkApplication.appliedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkApplicationScalarFieldEnum.statusUpdatedAt,
      title: $t('resource.OpWorkApplication.statusUpdatedAt'),
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
