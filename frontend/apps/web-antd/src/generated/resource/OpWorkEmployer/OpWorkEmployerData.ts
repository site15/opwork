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
    {
      component: 'Input',
      fieldName: Prisma.OpWorkEmployerScalarFieldEnum.profileId,
      label: $t('resource.name.OpWorkProfile'),
      rules: 'required',
      
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
      title: $t('resource.OpWorkEmployer.companyName'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyName,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.industry'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.industry,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.description'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.description,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.mission'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.mission,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.culture'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.culture,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.foundedYear'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.foundedYear,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.headquarters'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.headquarters,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.logoUrl'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.logoUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.coverImageUrl'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.coverImageUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.companyEmail'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyEmail,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.companyPhone'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyPhone,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.companyWebsite'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.companyWebsite,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.linkedinUrl'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.linkedinUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.twitterUrl'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.twitterUrl,
      sortable: true
    },
    {
      title: $t('resource.OpWorkEmployer.facebookUrl'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.facebookUrl,
      sortable: true
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkEmployerScalarFieldEnum.profileId,
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
