import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  { type OpWorkProfile, opWorkProfileControllerFindMany, type OpWorkJobSeeker, opWorkJobSeekerControllerFindMany, type OpWorkEducation } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkEducationFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.institution,
        label: $t('resource.OpWorkEducation.institution'),
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
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy,
        label: $t('resource.OpWorkEducation.fieldOfStudy'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.startDate,
        label: $t('resource.OpWorkEducation.startDate'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'DatePicker',
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.endDate,
        label: $t('resource.OpWorkEducation.endDate'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'RadioGroup',
          componentProps: {
          buttonStyle: 'solid',
            options: [
              { label: $t('common.yes'), value: true },
              { label: $t('common.no'), value: false },
            ],
              optionType: 'button',
      },
        defaultValue: false,
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.isCurrent,
        label: $t('resource.OpWorkEducation.isCurrent'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkEducationScalarFieldEnum.description,
        label: $t('resource.OpWorkEducation.description'),
      
      
        controlClass: 'w-full',
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
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
      controlClass: 'w-full',
      labelWidth: 200
    }, 

    {
      component: 'ApiSelect',
      ...getComponentProps<OpWorkJobSeeker>({
        findMany: (searchText?: string) => opWorkJobSeekerControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.currentPosition || item.id,
      }),
      fieldName: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId,
      label: $t('resource.name.OpWorkJobSeeker'),
      rules: 'required',
      
      controlClass: 'w-full',
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

    export function useOpWorkEducationColumns < T = OpWorkEducation> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkEducation.institution'),
        field: Prisma.OpWorkEducationScalarFieldEnum.institution ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
          props:{
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
          }
      },
        title: $t('resource.OpWorkEducation.degree'),
        field: Prisma.OpWorkEducationScalarFieldEnum.degree ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkEducation.fieldOfStudy'),
        field: Prisma.OpWorkEducationScalarFieldEnum.fieldOfStudy ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkEducation.startDate'),
        field: Prisma.OpWorkEducationScalarFieldEnum.startDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        title: $t('resource.OpWorkEducation.endDate'),
        field: Prisma.OpWorkEducationScalarFieldEnum.endDate ,
        formatter: 'formatDateTime',
          sortable: true
      }, 
    {
        cellRender: {
          name: 'CellTag',
      },
        title: $t('resource.OpWorkEducation.isCurrent'),
        field: Prisma.OpWorkEducationScalarFieldEnum.isCurrent ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkEducation.description'),
        field: Prisma.OpWorkEducationScalarFieldEnum.description ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
          props:{
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
          }
      },
        title: $t('resource.OpWorkEducation.grade'),
        field: Prisma.OpWorkEducationScalarFieldEnum.grade ,
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkProfile'),
        field: Prisma.OpWorkEducationScalarFieldEnum.profileId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkProfile?.title || row[column.field] || '';
            }
          }
        },
        sortable: true
      }, 
    {
        title: $t('resource.name.OpWorkJobSeeker'),
        field: Prisma.OpWorkEducationScalarFieldEnum.jobSeekerId ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.OpWorkJobSeeker?.currentPosition || row[column.field] || '';
            }
          }
        },
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
