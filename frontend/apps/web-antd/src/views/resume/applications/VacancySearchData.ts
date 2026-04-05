import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpWorkApplicationStatus, OpWorkJob } from '#/generated/client';

import { Prisma } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export type VacancySearchFilterFormType = {
  searchText: string;
  status: OpWorkApplicationStatus;
};

export function useVacancySearchFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),

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

export function useOpWorkJobColumns<T = OpWorkJob>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      title: $t('resource.OpWorkJob.title'),
      field: Prisma.OpWorkJobScalarFieldEnum.title,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.description'),
      field: Prisma.OpWorkJobScalarFieldEnum.description,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.requirements'),
      field: Prisma.OpWorkJobScalarFieldEnum.requirements,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.responsibilities'),
      field: Prisma.OpWorkJobScalarFieldEnum.responsibilities,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellEnum',
        props: {
          options: [
            {
              value: 'FULL_TIME',
              label: $t('resource.OpWorkEmploymentType.FULL_TIME').split(
                ' - ',
              )[0],
            },
            {
              value: 'PART_TIME',
              label: $t('resource.OpWorkEmploymentType.PART_TIME').split(
                ' - ',
              )[0],
            },
            {
              value: 'CONTRACT',
              label: $t('resource.OpWorkEmploymentType.CONTRACT').split(
                ' - ',
              )[0],
            },
            {
              value: 'INTERNSHIP',
              label: $t('resource.OpWorkEmploymentType.INTERNSHIP').split(
                ' - ',
              )[0],
            },
            {
              value: 'REMOTE',
              label: $t('resource.OpWorkEmploymentType.REMOTE').split(' - ')[0],
            },
            {
              value: 'FREELANCE',
              label: $t('resource.OpWorkEmploymentType.FREELANCE').split(
                ' - ',
              )[0],
            },
          ],
        },
      },
      title: $t('resource.OpWorkJob.employmentType'),
      field: Prisma.OpWorkJobScalarFieldEnum.employmentType,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellEnum',
        props: {
          options: [
            {
              value: 'INTERNSHIP',
              label: $t('resource.OpWorkExperienceLevel.INTERNSHIP').split(
                ' - ',
              )[0],
            },
            {
              value: 'ENTRY_LEVEL',
              label: $t('resource.OpWorkExperienceLevel.ENTRY_LEVEL').split(
                ' - ',
              )[0],
            },
            {
              value: 'JUNIOR',
              label: $t('resource.OpWorkExperienceLevel.JUNIOR').split(
                ' - ',
              )[0],
            },
            {
              value: 'MIDDLE',
              label: $t('resource.OpWorkExperienceLevel.MIDDLE').split(
                ' - ',
              )[0],
            },
            {
              value: 'SENIOR',
              label: $t('resource.OpWorkExperienceLevel.SENIOR').split(
                ' - ',
              )[0],
            },
            {
              value: 'LEAD',
              label: $t('resource.OpWorkExperienceLevel.LEAD').split(' - ')[0],
            },
            {
              value: 'EXPERT',
              label: $t('resource.OpWorkExperienceLevel.EXPERT').split(
                ' - ',
              )[0],
            },
          ],
        },
      },
      title: $t('resource.OpWorkJob.experienceLevel'),
      field: Prisma.OpWorkJobScalarFieldEnum.experienceLevel,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.department'),
      field: Prisma.OpWorkJobScalarFieldEnum.department,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.salaryMin'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMin,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.salaryMax'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryMax,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.salaryCurrency'),
      field: Prisma.OpWorkJobScalarFieldEnum.salaryCurrency,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.location'),
      field: Prisma.OpWorkJobScalarFieldEnum.location,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellTag',
      },
      title: $t('resource.OpWorkJob.isRemote'),
      field: Prisma.OpWorkJobScalarFieldEnum.isRemote,
      sortable: true,
    },
    {
      cellRender: {
        name: 'CellEnum',
        props: {
          options: [
            {
              value: 'DRAFT',
              label: $t('resource.OpWorkJobStatus.DRAFT').split(' - ')[0],
            },
            {
              value: 'ACTIVE',
              label: $t('resource.OpWorkJobStatus.ACTIVE').split(' - ')[0],
            },
            {
              value: 'PAUSED',
              label: $t('resource.OpWorkJobStatus.PAUSED').split(' - ')[0],
            },
            {
              value: 'CLOSED',
              label: $t('resource.OpWorkJobStatus.CLOSED').split(' - ')[0],
            },
            {
              value: 'ARCHIVED',
              label: $t('resource.OpWorkJobStatus.ARCHIVED').split(' - ')[0],
            },
          ],
        },
      },
      title: $t('resource.OpWorkJob.status'),
      field: Prisma.OpWorkJobScalarFieldEnum.status,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.viewsCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.viewsCount,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.applicationsCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.applicationsCount,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.savesCount'),
      field: Prisma.OpWorkJobScalarFieldEnum.savesCount,
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.publishedAt'),
      field: Prisma.OpWorkJobScalarFieldEnum.publishedAt,
      formatter: 'formatDateTime',
      sortable: true,
    },
    {
      title: $t('resource.OpWorkJob.expiresAt'),
      field: Prisma.OpWorkJobScalarFieldEnum.expiresAt,
      formatter: 'formatDateTime',
      sortable: true,
    },
    {
      title: $t('resource.name.OpWorkEmployer'),
      field: Prisma.OpWorkJobScalarFieldEnum.employerId,
      cellRender: {
        name: 'CellRender',
        props: {
          render: (row: any, column: any) => {
            return row.OpWorkEmployer?.companyName || row[column.field] || '';
          },
        },
      },
      sortable: true,
    },
    {
      title: $t('resource.name.OpWorkProfile'),
      field: Prisma.OpWorkJobScalarFieldEnum.profileId,
      cellRender: {
        name: 'CellRender',
        props: {
          render: (row: any, column: any) => {
            return row.OpWorkProfile?.title || row[column.field] || '';
          },
        },
      },
      sortable: true,
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
