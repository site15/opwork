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
                    { label: 'HIGH_SCHOOL', value: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL'), },
          { label: 'ASSOCIATE', value: $t('resource.OpWorkEducationDegree.ASSOCIATE'), },
          { label: 'BACHELOR', value: $t('resource.OpWorkEducationDegree.BACHELOR'), },
          { label: 'MASTER', value: $t('resource.OpWorkEducationDegree.MASTER'), },
          { label: 'DOCTORATE', value: $t('resource.OpWorkEducationDegree.DOCTORATE'), },
          { label: 'CERTIFICATE', value: $t('resource.OpWorkEducationDegree.CERTIFICATE'), },
          { label: 'DIPLOMA', value: $t('resource.OpWorkEducationDegree.DIPLOMA'), },
          { label: 'POSTGRADUATE', value: $t('resource.OpWorkEducationDegree.POSTGRADUATE'), },
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
                    { label: 'A_PLUS', value: $t('resource.OpWorkGrade.A_PLUS'), },
          { label: 'A', value: $t('resource.OpWorkGrade.A'), },
          { label: 'A_MINUS', value: $t('resource.OpWorkGrade.A_MINUS'), },
          { label: 'B_PLUS', value: $t('resource.OpWorkGrade.B_PLUS'), },
          { label: 'B', value: $t('resource.OpWorkGrade.B'), },
          { label: 'B_MINUS', value: $t('resource.OpWorkGrade.B_MINUS'), },
          { label: 'C_PLUS', value: $t('resource.OpWorkGrade.C_PLUS'), },
          { label: 'C', value: $t('resource.OpWorkGrade.C'), },
          { label: 'C_MINUS', value: $t('resource.OpWorkGrade.C_MINUS'), },
          { label: 'D_PLUS', value: $t('resource.OpWorkGrade.D_PLUS'), },
          { label: 'D', value: $t('resource.OpWorkGrade.D'), },
          { label: 'D_MINUS', value: $t('resource.OpWorkGrade.D_MINUS'), },
          { label: 'F', value: $t('resource.OpWorkGrade.F'), },
          { label: 'PASS', value: $t('resource.OpWorkGrade.PASS'), },
          { label: 'FAIL', value: $t('resource.OpWorkGrade.FAIL'), },
          { label: 'INCOMPLETE', value: $t('resource.OpWorkGrade.INCOMPLETE'), },
          { label: 'AUDIT', value: $t('resource.OpWorkGrade.AUDIT'), },
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
                    { label: 'HIGH_SCHOOL', value: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL'), },
          { label: 'ASSOCIATE', value: $t('resource.OpWorkEducationDegree.ASSOCIATE'), },
          { label: 'BACHELOR', value: $t('resource.OpWorkEducationDegree.BACHELOR'), },
          { label: 'MASTER', value: $t('resource.OpWorkEducationDegree.MASTER'), },
          { label: 'DOCTORATE', value: $t('resource.OpWorkEducationDegree.DOCTORATE'), },
          { label: 'CERTIFICATE', value: $t('resource.OpWorkEducationDegree.CERTIFICATE'), },
          { label: 'DIPLOMA', value: $t('resource.OpWorkEducationDegree.DIPLOMA'), },
          { label: 'POSTGRADUATE', value: $t('resource.OpWorkEducationDegree.POSTGRADUATE'), },
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
                    { label: 'A_PLUS', value: $t('resource.OpWorkGrade.A_PLUS'), },
          { label: 'A', value: $t('resource.OpWorkGrade.A'), },
          { label: 'A_MINUS', value: $t('resource.OpWorkGrade.A_MINUS'), },
          { label: 'B_PLUS', value: $t('resource.OpWorkGrade.B_PLUS'), },
          { label: 'B', value: $t('resource.OpWorkGrade.B'), },
          { label: 'B_MINUS', value: $t('resource.OpWorkGrade.B_MINUS'), },
          { label: 'C_PLUS', value: $t('resource.OpWorkGrade.C_PLUS'), },
          { label: 'C', value: $t('resource.OpWorkGrade.C'), },
          { label: 'C_MINUS', value: $t('resource.OpWorkGrade.C_MINUS'), },
          { label: 'D_PLUS', value: $t('resource.OpWorkGrade.D_PLUS'), },
          { label: 'D', value: $t('resource.OpWorkGrade.D'), },
          { label: 'D_MINUS', value: $t('resource.OpWorkGrade.D_MINUS'), },
          { label: 'F', value: $t('resource.OpWorkGrade.F'), },
          { label: 'PASS', value: $t('resource.OpWorkGrade.PASS'), },
          { label: 'FAIL', value: $t('resource.OpWorkGrade.FAIL'), },
          { label: 'INCOMPLETE', value: $t('resource.OpWorkGrade.INCOMPLETE'), },
          { label: 'AUDIT', value: $t('resource.OpWorkGrade.AUDIT'), },
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
                    { label: 'HIGH_SCHOOL', value: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL'), },
          { label: 'ASSOCIATE', value: $t('resource.OpWorkEducationDegree.ASSOCIATE'), },
          { label: 'BACHELOR', value: $t('resource.OpWorkEducationDegree.BACHELOR'), },
          { label: 'MASTER', value: $t('resource.OpWorkEducationDegree.MASTER'), },
          { label: 'DOCTORATE', value: $t('resource.OpWorkEducationDegree.DOCTORATE'), },
          { label: 'CERTIFICATE', value: $t('resource.OpWorkEducationDegree.CERTIFICATE'), },
          { label: 'DIPLOMA', value: $t('resource.OpWorkEducationDegree.DIPLOMA'), },
          { label: 'POSTGRADUATE', value: $t('resource.OpWorkEducationDegree.POSTGRADUATE'), },
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
                    { label: 'A_PLUS', value: $t('resource.OpWorkGrade.A_PLUS'), },
          { label: 'A', value: $t('resource.OpWorkGrade.A'), },
          { label: 'A_MINUS', value: $t('resource.OpWorkGrade.A_MINUS'), },
          { label: 'B_PLUS', value: $t('resource.OpWorkGrade.B_PLUS'), },
          { label: 'B', value: $t('resource.OpWorkGrade.B'), },
          { label: 'B_MINUS', value: $t('resource.OpWorkGrade.B_MINUS'), },
          { label: 'C_PLUS', value: $t('resource.OpWorkGrade.C_PLUS'), },
          { label: 'C', value: $t('resource.OpWorkGrade.C'), },
          { label: 'C_MINUS', value: $t('resource.OpWorkGrade.C_MINUS'), },
          { label: 'D_PLUS', value: $t('resource.OpWorkGrade.D_PLUS'), },
          { label: 'D', value: $t('resource.OpWorkGrade.D'), },
          { label: 'D_MINUS', value: $t('resource.OpWorkGrade.D_MINUS'), },
          { label: 'F', value: $t('resource.OpWorkGrade.F'), },
          { label: 'PASS', value: $t('resource.OpWorkGrade.PASS'), },
          { label: 'FAIL', value: $t('resource.OpWorkGrade.FAIL'), },
          { label: 'INCOMPLETE', value: $t('resource.OpWorkGrade.INCOMPLETE'), },
          { label: 'AUDIT', value: $t('resource.OpWorkGrade.AUDIT'), },
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
                    { label: 'HIGH_SCHOOL', value: $t('resource.OpWorkEducationDegree.HIGH_SCHOOL'), },
          { label: 'ASSOCIATE', value: $t('resource.OpWorkEducationDegree.ASSOCIATE'), },
          { label: 'BACHELOR', value: $t('resource.OpWorkEducationDegree.BACHELOR'), },
          { label: 'MASTER', value: $t('resource.OpWorkEducationDegree.MASTER'), },
          { label: 'DOCTORATE', value: $t('resource.OpWorkEducationDegree.DOCTORATE'), },
          { label: 'CERTIFICATE', value: $t('resource.OpWorkEducationDegree.CERTIFICATE'), },
          { label: 'DIPLOMA', value: $t('resource.OpWorkEducationDegree.DIPLOMA'), },
          { label: 'POSTGRADUATE', value: $t('resource.OpWorkEducationDegree.POSTGRADUATE'), },
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
                    { label: 'A_PLUS', value: $t('resource.OpWorkGrade.A_PLUS'), },
          { label: 'A', value: $t('resource.OpWorkGrade.A'), },
          { label: 'A_MINUS', value: $t('resource.OpWorkGrade.A_MINUS'), },
          { label: 'B_PLUS', value: $t('resource.OpWorkGrade.B_PLUS'), },
          { label: 'B', value: $t('resource.OpWorkGrade.B'), },
          { label: 'B_MINUS', value: $t('resource.OpWorkGrade.B_MINUS'), },
          { label: 'C_PLUS', value: $t('resource.OpWorkGrade.C_PLUS'), },
          { label: 'C', value: $t('resource.OpWorkGrade.C'), },
          { label: 'C_MINUS', value: $t('resource.OpWorkGrade.C_MINUS'), },
          { label: 'D_PLUS', value: $t('resource.OpWorkGrade.D_PLUS'), },
          { label: 'D', value: $t('resource.OpWorkGrade.D'), },
          { label: 'D_MINUS', value: $t('resource.OpWorkGrade.D_MINUS'), },
          { label: 'F', value: $t('resource.OpWorkGrade.F'), },
          { label: 'PASS', value: $t('resource.OpWorkGrade.PASS'), },
          { label: 'FAIL', value: $t('resource.OpWorkGrade.FAIL'), },
          { label: 'INCOMPLETE', value: $t('resource.OpWorkGrade.INCOMPLETE'), },
          { label: 'AUDIT', value: $t('resource.OpWorkGrade.AUDIT'), },
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
      width: 130,
    },
  ];
}
