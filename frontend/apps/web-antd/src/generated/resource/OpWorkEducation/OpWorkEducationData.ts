import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkEducation } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkEducationFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.id,
      label: $t('resource.OpWorkEducation.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkEducation.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkEducation.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.institution,
      label: $t('resource.OpWorkEducation.institution'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.endDate,
      label: $t('resource.OpWorkEducation.endDate'),
      
      
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
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkEducation.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.description,
      label: $t('resource.OpWorkEducation.description'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkEducationCreateFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkEducation.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.institution,
      label: $t('resource.OpWorkEducation.institution'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.endDate,
      label: $t('resource.OpWorkEducation.endDate'),
      
      
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
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkEducation.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.description,
      label: $t('resource.OpWorkEducation.description'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkEducationViewFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.id,
      label: $t('resource.OpWorkEducation.id'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId,
      label: $t('resource.OpWorkEducation.jobSeekerId'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.institution,
      label: $t('resource.OpWorkEducation.institution'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.endDate,
      label: $t('resource.OpWorkEducation.endDate'),
      
      
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
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.isCurrent,
      label: $t('resource.OpWorkEducation.isCurrent'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.description,
      label: $t('resource.OpWorkEducation.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.createdAt,
      label: $t('resource.OpWorkEducation.createdAt'),
      rules: 'required',
      disabled: true,
      labelWidth: 200
    },
  ];
}

export function useOpWorkEducationFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkEducationColumns<T = OpWorkEducation>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkEducationScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId,
      title: $t('resource.OpWorkEducation.jobSeekerId'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.institution,
      title: $t('resource.OpWorkEducation.institution'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      title: $t('resource.OpWorkEducation.fieldOfStudy'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      title: $t('resource.OpWorkEducation.startDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.endDate,
      title: $t('resource.OpWorkEducation.endDate'),
      formatter: 'formatDateTime',
      sortable: true
    },
    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.OpWorkEducation.isCurrent'),
      field: Prisma.OpWorkEducationScalarFieldEnum.isCurrent,
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.description,
      title: $t('resource.OpWorkEducation.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEducationScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
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
