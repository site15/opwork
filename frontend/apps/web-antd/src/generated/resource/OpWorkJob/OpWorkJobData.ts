import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkJob } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkJobFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.id,
      label: $t('resource.OpWorkJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJob.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJob.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkJobViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.id,
      label: $t('resource.OpWorkJob.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.employerId,
      label: $t('resource.OpWorkJob.employerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.profileId,
      label: $t('resource.OpWorkJob.profileId'),
      rules: 'required',
      
      labelWidth: 200
    },
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      label: $t('resource.OpWorkJob.salaryMin'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
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
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      label: $t('resource.OpWorkJob.viewsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      label: $t('resource.OpWorkJob.applicationsCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      label: $t('resource.OpWorkJob.savesCount'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      label: $t('resource.OpWorkJob.publishedAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      label: $t('resource.OpWorkJob.expiresAt'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkJob.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkJob.updatedAt'),
      rules: 'required',
      disabled: true,
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
      field: Prisma.OpWorkJobScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.employerId,
      title: $t('resource.OpWorkJob.employerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.profileId,
      title: $t('resource.OpWorkJob.profileId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.title,
      title: $t('resource.OpWorkJob.title'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.description,
      title: $t('resource.OpWorkJob.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.requirements,
      title: $t('resource.OpWorkJob.requirements'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      title: $t('resource.OpWorkJob.responsibilities'),
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
      field: Prisma.OpWorkJobScalarFieldEnum.department,
      title: $t('resource.OpWorkJob.department'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      title: $t('resource.OpWorkJob.salaryMin'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      title: $t('resource.OpWorkJob.salaryMax'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      title: $t('resource.OpWorkJob.salaryCurrency'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.location,
      title: $t('resource.OpWorkJob.location'),
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
      field: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      title: $t('resource.OpWorkJob.viewsCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      title: $t('resource.OpWorkJob.applicationsCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      title: $t('resource.OpWorkJob.savesCount'),
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      title: $t('resource.OpWorkJob.publishedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      title: $t('resource.OpWorkJob.expiresAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkJobScalarFieldEnum.updatedAt,
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
