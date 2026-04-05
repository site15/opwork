import type { VbenFormSchema } from '#/adapter/form';
import type { OpWorkApplicationStatus } from '#/generated/client';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export type ResumeSearchFilterFormType = {
  searchText: string;
  status: OpWorkApplicationStatus;
};

export function useResumeSearchFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.filter.searchText'),
      controlClass: 'w-full',
      labelClass: 'text-right',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            value: 'PENDING',
            label: $t('resource.OpWorkApplicationStatus.PENDING').split(
              ' - ',
            )[0],
          },
          {
            value: 'REVIEWED',
            label: $t('resource.OpWorkApplicationStatus.REVIEWED').split(
              ' - ',
            )[0],
          },
          {
            value: 'SHORTLISTED',
            label: $t('resource.OpWorkApplicationStatus.SHORTLISTED').split(
              ' - ',
            )[0],
          },
          {
            value: 'INTERVIEW',
            label: $t('resource.OpWorkApplicationStatus.INTERVIEW').split(
              ' - ',
            )[0],
          },
          {
            value: 'OFFER',
            label: $t('resource.OpWorkApplicationStatus.OFFER').split(' - ')[0],
          },
          {
            value: 'REJECTED',
            label: $t('resource.OpWorkApplicationStatus.REJECTED').split(
              ' - ',
            )[0],
          },
          {
            value: 'WITHDRAWN',
            label: $t('resource.OpWorkApplicationStatus.WITHDRAWN').split(
              ' - ',
            )[0],
          },
        ],
        showSearch: true,
      },
      fieldName: Prisma.OpWorkApplicationScalarFieldEnum.status,
      label: $t('resource.OpWorkApplication.status'),

      controlClass: 'w-full',
      labelWidth: 200,
    },
  ];
}
