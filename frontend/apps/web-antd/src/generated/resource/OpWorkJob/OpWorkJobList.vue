<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import dayjs from 'dayjs';
import { Button, message, notification } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { opWorkJobControllerDeleteOne, opWorkJobControllerFindMany, opWorkJobControllerUpdateOne } from '#/generated/client';
import type { OpWorkJob } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkJobColumns, useOpWorkJobFilterFormSchema } from './OpWorkJobData';
import OpWorkJobForm from './OpWorkJobForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkJobForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useOpWorkJobFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useOpWorkJobColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (options: {
          page: { total: number, pageSize: number, currentPage: number },
          sort?: {
            field: string,
            order: 'desc' | 'asc'
          }
        }, formValues: { searchText: string }) => {
          console.log(options, formValues)
          return await opWorkJobControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : 'title:desc'
            },
          }).then(async (result) => {
            if (result?.error) {
              throw new Error((result.error as any)?.message || 'Unknown error')
            }
            return {
              items: (result.data?.items || []).map((item) => ({
                ...item,
          title: item.title,
        description: item.description,
        requirements: item.requirements,
        responsibilities: item.responsibilities,
        employmentType: item.employmentType,
        experienceLevel: item.experienceLevel,
        department: item.department,
        salaryMin: item.salaryMin,
        salaryMax: item.salaryMax,
        salaryCurrency: item.salaryCurrency,
        location: item.location,
        isRemote: item.isRemote,
        status: item.status,
        viewsCount: item.viewsCount,
        applicationsCount: item.applicationsCount,
        savesCount: item.savesCount,
        publishedAt: dayjs(item.publishedAt),
        expiresAt: dayjs(item.expiresAt),
              })),
              total: result.data?.meta.totalResults || 0,
            }
          })
            .catch((err) => {
              hideLoading();
              notification.error({
                message: $t('actions.common.findManyFailed'),
                description: err instanceof Error ? err.message : '',
                duration: 3000,
              });
            });
        },
      },
      sort: true
    },
    sortConfig: {
      defaultSort: { field: 'title', order: 'desc' },
      remote: true,
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  },
});

function onActionClick(e: OnActionClickParams<OpWorkJob>) {
  switch (e.code) {
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
  }
}

function onEdit(row: OpWorkJob) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: OpWorkJob) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  opWorkJobControllerDeleteOne({ path: { id: row.id } })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error')
      }
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.id]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch((err) => {
      hideLoading();
      notification.error({
        message: $t('actions.common.deleteFailed'),
        description: err instanceof Error ? err.message : '',
        duration: 3000,
      });
    });
}

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  formDrawerApi.setData({}).open();
}
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid :table-title="$t('resource.name.OpWorkJob')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkJob')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
