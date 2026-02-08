import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkEmployer } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function useOpWorkEmployerFormSchema(): VbenFormSchema[] {
  return [
        {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyName,
      label: $t('resource.OpWorkEmployer.companyName'),
      rules: 'required',
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.industry,
      label: $t('resource.OpWorkEmployer.industry'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.description,
      label: $t('resource.OpWorkEmployer.description'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.mission,
      label: $t('resource.OpWorkEmployer.mission'),
      
      
      labelWidth: 200
    },
    {
      component: 'Textarea',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.culture,
      label: $t('resource.OpWorkEmployer.culture'),
      
      
      labelWidth: 200
    },
    {
      component: 'InputNumber',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.foundedYear,
      label: $t('resource.OpWorkEmployer.foundedYear'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.headquarters,
      label: $t('resource.OpWorkEmployer.headquarters'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.logoUrl,
      label: $t('resource.OpWorkEmployer.logoUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.coverImageUrl,
      label: $t('resource.OpWorkEmployer.coverImageUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyEmail,
      label: $t('resource.OpWorkEmployer.companyEmail'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyPhone,
      label: $t('resource.OpWorkEmployer.companyPhone'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.companyWebsite,
      label: $t('resource.OpWorkEmployer.companyWebsite'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.linkedinUrl,
      label: $t('resource.OpWorkEmployer.linkedinUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.twitterUrl,
      label: $t('resource.OpWorkEmployer.twitterUrl'),
      
      
      labelWidth: 200
    },
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.facebookUrl,
      label: $t('resource.OpWorkEmployer.facebookUrl'),
      
      
      labelWidth: 200
    },
  ];
}

export function useOpWorkEmployerFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function useOpWorkEmployerColumns<T = OpWorkEmployer>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyName,
      title: $t('resource.OpWorkEmployer.companyName'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.industry,
      title: $t('resource.OpWorkEmployer.industry'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.description,
      title: $t('resource.OpWorkEmployer.description'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.mission,
      title: $t('resource.OpWorkEmployer.mission'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.culture,
      title: $t('resource.OpWorkEmployer.culture'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.foundedYear,
      title: $t('resource.OpWorkEmployer.foundedYear'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.headquarters,
      title: $t('resource.OpWorkEmployer.headquarters'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.logoUrl,
      title: $t('resource.OpWorkEmployer.logoUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.coverImageUrl,
      title: $t('resource.OpWorkEmployer.coverImageUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyEmail,
      title: $t('resource.OpWorkEmployer.companyEmail'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyPhone,
      title: $t('resource.OpWorkEmployer.companyPhone'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyWebsite,
      title: $t('resource.OpWorkEmployer.companyWebsite'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.linkedinUrl,
      title: $t('resource.OpWorkEmployer.linkedinUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.twitterUrl,
      title: $t('resource.OpWorkEmployer.twitterUrl'),
      sortable: true
    },
    {
      field: Prisma.OpWorkEmployerScalarFieldEnum.facebookUrl,
      title: $t('resource.OpWorkEmployer.facebookUrl'),
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
