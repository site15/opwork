import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkProfile } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkProfileFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.id,
      label: $t('resource.OpWorkProfile.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkProfile.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkProfile.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userId,
      label: $t('resource.OpWorkProfile.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.type,
      label: $t('resource.OpWorkProfile.type'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userType,
      label: $t('resource.OpWorkProfile.userType'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.title,
      label: $t('resource.OpWorkProfile.title'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.description,
      label: $t('resource.OpWorkProfile.description'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isActive,
      label: $t('resource.OpWorkProfile.isActive'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isEmailVerified,
      label: $t('resource.OpWorkProfile.isEmailVerified'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
      label: $t('resource.OpWorkProfile.phone'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
      label: $t('resource.OpWorkProfile.website'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      label: $t('resource.OpWorkProfile.avatarUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      label: $t('resource.OpWorkProfile.coverImage'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkProfileCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userId,
      label: $t('resource.OpWorkProfile.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.type,
      label: $t('resource.OpWorkProfile.type'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userType,
      label: $t('resource.OpWorkProfile.userType'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.title,
      label: $t('resource.OpWorkProfile.title'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.description,
      label: $t('resource.OpWorkProfile.description'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isActive,
      label: $t('resource.OpWorkProfile.isActive'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isEmailVerified,
      label: $t('resource.OpWorkProfile.isEmailVerified'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
      label: $t('resource.OpWorkProfile.phone'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
      label: $t('resource.OpWorkProfile.website'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      label: $t('resource.OpWorkProfile.avatarUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      label: $t('resource.OpWorkProfile.coverImage'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkProfileViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.id,
      label: $t('resource.OpWorkProfile.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userId,
      label: $t('resource.OpWorkProfile.userId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.type,
      label: $t('resource.OpWorkProfile.type'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.userType,
      label: $t('resource.OpWorkProfile.userType'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.title,
      label: $t('resource.OpWorkProfile.title'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.description,
      label: $t('resource.OpWorkProfile.description'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isActive,
      label: $t('resource.OpWorkProfile.isActive'),
      
      
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
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.isEmailVerified,
      label: $t('resource.OpWorkProfile.isEmailVerified'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.email,
      label: $t('resource.OpWorkProfile.email'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.phone,
      label: $t('resource.OpWorkProfile.phone'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.website,
      label: $t('resource.OpWorkProfile.website'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.location,
      label: $t('resource.OpWorkProfile.location'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      label: $t('resource.OpWorkProfile.avatarUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      label: $t('resource.OpWorkProfile.coverImage'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkProfile.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkProfileScalarFieldEnum.updatedAt,
      label: $t('resource.OpWorkProfile.updatedAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkProfileFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkProfileColumns<T = OpWorkProfile>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkProfileScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.userId,
      title: $t('resource.OpWorkProfile.userId'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'PROJECT', label: $t('resource.OpWorkProfileType.PROJECT').split(' - ')[0], },
          { value: 'SPECIALIST', label: $t('resource.OpWorkProfileType.SPECIALIST').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkProfileType.EMPLOYER').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkProfile.type'),
      field: Prisma.OpWorkProfileScalarFieldEnum.type,
      sortable: true
    },
    {
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'JOB_SEEKER', label: $t('resource.OpWorkUserType.JOB_SEEKER').split(' - ')[0], },
          { value: 'EMPLOYER', label: $t('resource.OpWorkUserType.EMPLOYER').split(' - ')[0], },
          { value: 'ADMIN', label: $t('resource.OpWorkUserType.ADMIN').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkProfile.userType'),
      field: Prisma.OpWorkProfileScalarFieldEnum.userType,
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.title,
      title: $t('resource.OpWorkProfile.title'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.description,
      title: $t('resource.OpWorkProfile.description'),
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkProfile.isActive'),
      field: Prisma.OpWorkProfileScalarFieldEnum.isActive,
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkProfile.isEmailVerified'),
      field: Prisma.OpWorkProfileScalarFieldEnum.isEmailVerified,
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.email,
      title: $t('resource.OpWorkProfile.email'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.phone,
      title: $t('resource.OpWorkProfile.phone'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.website,
      title: $t('resource.OpWorkProfile.website'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.location,
      title: $t('resource.OpWorkProfile.location'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.avatarUrl,
      title: $t('resource.OpWorkProfile.avatarUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.coverImage,
      title: $t('resource.OpWorkProfile.coverImage'),
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkProfileScalarFieldEnum.updatedAt,
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
      width: 200,
    },
  ];
}
