import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJob } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.title,
      label: $t('resource.OpWorkJob.title'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.description,
      label: $t('resource.OpWorkJob.description'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.requirements,
      label: $t('resource.OpWorkJob.requirements'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      label: $t('resource.OpWorkJob.responsibilities'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'FULL_TIME', label: $t('resource.OpWorkEmploymentType.FULL_TIME').split(' - ')[0], },
          { value: 'PART_TIME', label: $t('resource.OpWorkEmploymentType.PART_TIME').split(' - ')[0], },
          { value: 'CONTRACT', label: $t('resource.OpWorkEmploymentType.CONTRACT').split(' - ')[0], },
          { value: 'INTERNSHIP', label: $t('resource.OpWorkEmploymentType.INTERNSHIP').split(' - ')[0], },
          { value: 'REMOTE', label: $t('resource.OpWorkEmploymentType.REMOTE').split(' - ')[0], },
          { value: 'FREELANCE', label: $t('resource.OpWorkEmploymentType.FREELANCE').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employmentType,
      label: $t('resource.OpWorkJob.employmentType'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'INTERNSHIP', label: $t('resource.OpWorkExperienceLevel.INTERNSHIP').split(' - ')[0], },
          { value: 'ENTRY_LEVEL', label: $t('resource.OpWorkExperienceLevel.ENTRY_LEVEL').split(' - ')[0], },
          { value: 'JUNIOR', label: $t('resource.OpWorkExperienceLevel.JUNIOR').split(' - ')[0], },
          { value: 'MIDDLE', label: $t('resource.OpWorkExperienceLevel.MIDDLE').split(' - ')[0], },
          { value: 'SENIOR', label: $t('resource.OpWorkExperienceLevel.SENIOR').split(' - ')[0], },
          { value: 'LEAD', label: $t('resource.OpWorkExperienceLevel.LEAD').split(' - ')[0], },
          { value: 'EXPERT', label: $t('resource.OpWorkExperienceLevel.EXPERT').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.experienceLevel,
      label: $t('resource.OpWorkJob.experienceLevel'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.department,
      label: $t('resource.OpWorkJob.department'),
      
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      label: $t('resource.OpWorkJob.salaryMax'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      label: $t('resource.OpWorkJob.salaryCurrency'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.location,
      label: $t('resource.OpWorkJob.location'),
      
      
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
      fieldName: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      label: $t('resource.OpWorkJob.isRemote'),
      
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'DRAFT', label: $t('resource.OpWorkJobStatus.DRAFT').split(' - ')[0], },
          { value: 'ACTIVE', label: $t('resource.OpWorkJobStatus.ACTIVE').split(' - ')[0], },
          { value: 'PAUSED', label: $t('resource.OpWorkJobStatus.PAUSED').split(' - ')[0], },
          { value: 'CLOSED', label: $t('resource.OpWorkJobStatus.CLOSED').split(' - ')[0], },
          { value: 'ARCHIVED', label: $t('resource.OpWorkJobStatus.ARCHIVED').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkJobScalarFieldEnum.status,
      label: $t('resource.OpWorkJob.status'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DatePicker',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.name.OpWorkEmployer'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkJobColumns<T = OpWorkJob>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      title: $t('resource.OpWorkJob.title'),
      field: Prisma.OpWorkJobScalarFieldEnum.title,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.description'),
      field: Prisma.OpWorkJobScalarFieldEnum.description,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.requirements'),
      field: Prisma.OpWorkJobScalarFieldEnum.requirements,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.responsibilities'),
      field: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'FULL_TIME', label: $t('resource.OpWorkEmploymentType.FULL_TIME').split(' - ')[0], },
          { value: 'PART_TIME', label: $t('resource.OpWorkEmploymentType.PART_TIME').split(' - ')[0], },
          { value: 'CONTRACT', label: $t('resource.OpWorkEmploymentType.CONTRACT').split(' - ')[0], },
          { value: 'INTERNSHIP', label: $t('resource.OpWorkEmploymentType.INTERNSHIP').split(' - ')[0], },
          { value: 'REMOTE', label: $t('resource.OpWorkEmploymentType.REMOTE').split(' - ')[0], },
          { value: 'FREELANCE', label: $t('resource.OpWorkEmploymentType.FREELANCE').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkJob.employmentType'),
      field: Prisma.OpWorkJobScalarFieldEnum.employmentType,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'INTERNSHIP', label: $t('resource.OpWorkExperienceLevel.INTERNSHIP').split(' - ')[0], },
          { value: 'ENTRY_LEVEL', label: $t('resource.OpWorkExperienceLevel.ENTRY_LEVEL').split(' - ')[0], },
          { value: 'JUNIOR', label: $t('resource.OpWorkExperienceLevel.JUNIOR').split(' - ')[0], },
          { value: 'MIDDLE', label: $t('resource.OpWorkExperienceLevel.MIDDLE').split(' - ')[0], },
          { value: 'SENIOR', label: $t('resource.OpWorkExperienceLevel.SENIOR').split(' - ')[0], },
          { value: 'LEAD', label: $t('resource.OpWorkExperienceLevel.LEAD').split(' - ')[0], },
          { value: 'EXPERT', label: $t('resource.OpWorkExperienceLevel.EXPERT').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkJob.experienceLevel'),
      field: Prisma.OpWorkJobScalarFieldEnum.experienceLevel,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.department'),
      field: Prisma.OpWorkJobScalarFieldEnum.department,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.salaryMin'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.salaryMax'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.salaryCurrency'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.location'),
      field: Prisma.OpWorkJobScalarFieldEnum.location,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkJob.isRemote'),
      field: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'DRAFT', label: $t('resource.OpWorkJobStatus.DRAFT').split(' - ')[0], },
          { value: 'ACTIVE', label: $t('resource.OpWorkJobStatus.ACTIVE').split(' - ')[0], },
          { value: 'PAUSED', label: $t('resource.OpWorkJobStatus.PAUSED').split(' - ')[0], },
          { value: 'CLOSED', label: $t('resource.OpWorkJobStatus.CLOSED').split(' - ')[0], },
          { value: 'ARCHIVED', label: $t('resource.OpWorkJobStatus.ARCHIVED').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkJob.status'),
      field: Prisma.OpWorkJobScalarFieldEnum.status,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.viewsCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.applicationsCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.savesCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.publishedAt'),
      field: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.OpWorkJob.expiresAt'),
      field: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkEmployer'),
      field: Prisma.OpWorkJobScalarFieldEnum.employerId,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkJobScalarFieldEnum.profileId,
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
