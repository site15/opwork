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
      component: 'DateTime',
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'HIGH_SCHOOL', label: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL').split(' - ')[0], },
          { value: 'ASSOCIATE', label: $t('resource.OpWorkEducationDegree.ASSOCIATE').split(' - ')[0], },
          { value: 'BACHELOR', label: $t('resource.OpWorkEducationDegree.BACHELOR').split(' - ')[0], },
          { value: 'MASTER', label: $t('resource.OpWorkEducationDegree.MASTER').split(' - ')[0], },
          { value: 'DOCTORATE', label: $t('resource.OpWorkEducationDegree.DOCTORATE').split(' - ')[0], },
          { value: 'CERTIFICATE', label: $t('resource.OpWorkEducationDegree.CERTIFICATE').split(' - ')[0], },
          { value: 'DIPLOMA', label: $t('resource.OpWorkEducationDegree.DIPLOMA').split(' - ')[0], },
          { value: 'POSTGRADUATE', label: $t('resource.OpWorkEducationDegree.POSTGRADUATE').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.degree,
      label: $t('resource.OpWorkEducation.degree'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'A_PLUS', label: $t('resource.OpWorkGrade.A_PLUS').split(' - ')[0], },
          { value: 'A', label: $t('resource.OpWorkGrade.A').split(' - ')[0], },
          { value: 'A_MINUS', label: $t('resource.OpWorkGrade.A_MINUS').split(' - ')[0], },
          { value: 'B_PLUS', label: $t('resource.OpWorkGrade.B_PLUS').split(' - ')[0], },
          { value: 'B', label: $t('resource.OpWorkGrade.B').split(' - ')[0], },
          { value: 'B_MINUS', label: $t('resource.OpWorkGrade.B_MINUS').split(' - ')[0], },
          { value: 'C_PLUS', label: $t('resource.OpWorkGrade.C_PLUS').split(' - ')[0], },
          { value: 'C', label: $t('resource.OpWorkGrade.C').split(' - ')[0], },
          { value: 'C_MINUS', label: $t('resource.OpWorkGrade.C_MINUS').split(' - ')[0], },
          { value: 'D_PLUS', label: $t('resource.OpWorkGrade.D_PLUS').split(' - ')[0], },
          { value: 'D', label: $t('resource.OpWorkGrade.D').split(' - ')[0], },
          { value: 'D_MINUS', label: $t('resource.OpWorkGrade.D_MINUS').split(' - ')[0], },
          { value: 'F', label: $t('resource.OpWorkGrade.F').split(' - ')[0], },
          { value: 'PASS', label: $t('resource.OpWorkGrade.PASS').split(' - ')[0], },
          { value: 'FAIL', label: $t('resource.OpWorkGrade.FAIL').split(' - ')[0], },
          { value: 'INCOMPLETE', label: $t('resource.OpWorkGrade.INCOMPLETE').split(' - ')[0], },
          { value: 'AUDIT', label: $t('resource.OpWorkGrade.AUDIT').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.grade,
      label: $t('resource.OpWorkEducation.grade'),
      
      
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'HIGH_SCHOOL', label: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL').split(' - ')[0], },
          { value: 'ASSOCIATE', label: $t('resource.OpWorkEducationDegree.ASSOCIATE').split(' - ')[0], },
          { value: 'BACHELOR', label: $t('resource.OpWorkEducationDegree.BACHELOR').split(' - ')[0], },
          { value: 'MASTER', label: $t('resource.OpWorkEducationDegree.MASTER').split(' - ')[0], },
          { value: 'DOCTORATE', label: $t('resource.OpWorkEducationDegree.DOCTORATE').split(' - ')[0], },
          { value: 'CERTIFICATE', label: $t('resource.OpWorkEducationDegree.CERTIFICATE').split(' - ')[0], },
          { value: 'DIPLOMA', label: $t('resource.OpWorkEducationDegree.DIPLOMA').split(' - ')[0], },
          { value: 'POSTGRADUATE', label: $t('resource.OpWorkEducationDegree.POSTGRADUATE').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.degree,
      label: $t('resource.OpWorkEducation.degree'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'A_PLUS', label: $t('resource.OpWorkGrade.A_PLUS').split(' - ')[0], },
          { value: 'A', label: $t('resource.OpWorkGrade.A').split(' - ')[0], },
          { value: 'A_MINUS', label: $t('resource.OpWorkGrade.A_MINUS').split(' - ')[0], },
          { value: 'B_PLUS', label: $t('resource.OpWorkGrade.B_PLUS').split(' - ')[0], },
          { value: 'B', label: $t('resource.OpWorkGrade.B').split(' - ')[0], },
          { value: 'B_MINUS', label: $t('resource.OpWorkGrade.B_MINUS').split(' - ')[0], },
          { value: 'C_PLUS', label: $t('resource.OpWorkGrade.C_PLUS').split(' - ')[0], },
          { value: 'C', label: $t('resource.OpWorkGrade.C').split(' - ')[0], },
          { value: 'C_MINUS', label: $t('resource.OpWorkGrade.C_MINUS').split(' - ')[0], },
          { value: 'D_PLUS', label: $t('resource.OpWorkGrade.D_PLUS').split(' - ')[0], },
          { value: 'D', label: $t('resource.OpWorkGrade.D').split(' - ')[0], },
          { value: 'D_MINUS', label: $t('resource.OpWorkGrade.D_MINUS').split(' - ')[0], },
          { value: 'F', label: $t('resource.OpWorkGrade.F').split(' - ')[0], },
          { value: 'PASS', label: $t('resource.OpWorkGrade.PASS').split(' - ')[0], },
          { value: 'FAIL', label: $t('resource.OpWorkGrade.FAIL').split(' - ')[0], },
          { value: 'INCOMPLETE', label: $t('resource.OpWorkGrade.INCOMPLETE').split(' - ')[0], },
          { value: 'AUDIT', label: $t('resource.OpWorkGrade.AUDIT').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.grade,
      label: $t('resource.OpWorkEducation.grade'),
      
      
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'HIGH_SCHOOL', label: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL').split(' - ')[0], },
          { value: 'ASSOCIATE', label: $t('resource.OpWorkEducationDegree.ASSOCIATE').split(' - ')[0], },
          { value: 'BACHELOR', label: $t('resource.OpWorkEducationDegree.BACHELOR').split(' - ')[0], },
          { value: 'MASTER', label: $t('resource.OpWorkEducationDegree.MASTER').split(' - ')[0], },
          { value: 'DOCTORATE', label: $t('resource.OpWorkEducationDegree.DOCTORATE').split(' - ')[0], },
          { value: 'CERTIFICATE', label: $t('resource.OpWorkEducationDegree.CERTIFICATE').split(' - ')[0], },
          { value: 'DIPLOMA', label: $t('resource.OpWorkEducationDegree.DIPLOMA').split(' - ')[0], },
          { value: 'POSTGRADUATE', label: $t('resource.OpWorkEducationDegree.POSTGRADUATE').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.degree,
      label: $t('resource.OpWorkEducation.degree'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
      label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
      label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
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
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
                    { value: 'A_PLUS', label: $t('resource.OpWorkGrade.A_PLUS').split(' - ')[0], },
          { value: 'A', label: $t('resource.OpWorkGrade.A').split(' - ')[0], },
          { value: 'A_MINUS', label: $t('resource.OpWorkGrade.A_MINUS').split(' - ')[0], },
          { value: 'B_PLUS', label: $t('resource.OpWorkGrade.B_PLUS').split(' - ')[0], },
          { value: 'B', label: $t('resource.OpWorkGrade.B').split(' - ')[0], },
          { value: 'B_MINUS', label: $t('resource.OpWorkGrade.B_MINUS').split(' - ')[0], },
          { value: 'C_PLUS', label: $t('resource.OpWorkGrade.C_PLUS').split(' - ')[0], },
          { value: 'C', label: $t('resource.OpWorkGrade.C').split(' - ')[0], },
          { value: 'C_MINUS', label: $t('resource.OpWorkGrade.C_MINUS').split(' - ')[0], },
          { value: 'D_PLUS', label: $t('resource.OpWorkGrade.D_PLUS').split(' - ')[0], },
          { value: 'D', label: $t('resource.OpWorkGrade.D').split(' - ')[0], },
          { value: 'D_MINUS', label: $t('resource.OpWorkGrade.D_MINUS').split(' - ')[0], },
          { value: 'F', label: $t('resource.OpWorkGrade.F').split(' - ')[0], },
          { value: 'PASS', label: $t('resource.OpWorkGrade.PASS').split(' - ')[0], },
          { value: 'FAIL', label: $t('resource.OpWorkGrade.FAIL').split(' - ')[0], },
          { value: 'INCOMPLETE', label: $t('resource.OpWorkGrade.INCOMPLETE').split(' - ')[0], },
          { value: 'AUDIT', label: $t('resource.OpWorkGrade.AUDIT').split(' - ')[0], },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.grade,
      label: $t('resource.OpWorkEducation.grade'),
      
      
      labelWidth: 200
    },
    {
      component: 'DateTime',
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
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'HIGH_SCHOOL', label: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL').split(' - ')[0], },
          { value: 'ASSOCIATE', label: $t('resource.OpWorkEducationDegree.ASSOCIATE').split(' - ')[0], },
          { value: 'BACHELOR', label: $t('resource.OpWorkEducationDegree.BACHELOR').split(' - ')[0], },
          { value: 'MASTER', label: $t('resource.OpWorkEducationDegree.MASTER').split(' - ')[0], },
          { value: 'DOCTORATE', label: $t('resource.OpWorkEducationDegree.DOCTORATE').split(' - ')[0], },
          { value: 'CERTIFICATE', label: $t('resource.OpWorkEducationDegree.CERTIFICATE').split(' - ')[0], },
          { value: 'DIPLOMA', label: $t('resource.OpWorkEducationDegree.DIPLOMA').split(' - ')[0], },
          { value: 'POSTGRADUATE', label: $t('resource.OpWorkEducationDegree.POSTGRADUATE').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkEducation.degree'),
      field: Prisma.OpWorkEducationScalarFieldEnum.degree,
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
      cellRender: {
        name:'CellEnum',
        options: [
          { value: 'A_PLUS', label: $t('resource.OpWorkGrade.A_PLUS').split(' - ')[0], },
          { value: 'A', label: $t('resource.OpWorkGrade.A').split(' - ')[0], },
          { value: 'A_MINUS', label: $t('resource.OpWorkGrade.A_MINUS').split(' - ')[0], },
          { value: 'B_PLUS', label: $t('resource.OpWorkGrade.B_PLUS').split(' - ')[0], },
          { value: 'B', label: $t('resource.OpWorkGrade.B').split(' - ')[0], },
          { value: 'B_MINUS', label: $t('resource.OpWorkGrade.B_MINUS').split(' - ')[0], },
          { value: 'C_PLUS', label: $t('resource.OpWorkGrade.C_PLUS').split(' - ')[0], },
          { value: 'C', label: $t('resource.OpWorkGrade.C').split(' - ')[0], },
          { value: 'C_MINUS', label: $t('resource.OpWorkGrade.C_MINUS').split(' - ')[0], },
          { value: 'D_PLUS', label: $t('resource.OpWorkGrade.D_PLUS').split(' - ')[0], },
          { value: 'D', label: $t('resource.OpWorkGrade.D').split(' - ')[0], },
          { value: 'D_MINUS', label: $t('resource.OpWorkGrade.D_MINUS').split(' - ')[0], },
          { value: 'F', label: $t('resource.OpWorkGrade.F').split(' - ')[0], },
          { value: 'PASS', label: $t('resource.OpWorkGrade.PASS').split(' - ')[0], },
          { value: 'FAIL', label: $t('resource.OpWorkGrade.FAIL').split(' - ')[0], },
          { value: 'INCOMPLETE', label: $t('resource.OpWorkGrade.INCOMPLETE').split(' - ')[0], },
          { value: 'AUDIT', label: $t('resource.OpWorkGrade.AUDIT').split(' - ')[0], },
        ],
      },
      title: $t('resource.OpWorkEducation.grade'),
      field: Prisma.OpWorkEducationScalarFieldEnum.grade,
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
      width: 200,
    },
  ];
}
