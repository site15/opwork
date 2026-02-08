<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import dayjs from 'dayjs';
import { Button, message, notification } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { opWorkEmployerControllerDeleteOne, opWorkEmployerControllerFindMany, opWorkEmployerControllerUpdateOne } from '#/generated/client';
import type { OpWorkEmployer } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkEmployerColumns, useOpWorkEmployerFilterFormSchema } from './OpWorkEmployerData';
import OpWorkEmployerForm from './OpWorkEmployerForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkEmployerForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useOpWorkEmployerFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useOpWorkEmployerColumns(onActionClick),
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
          return await opWorkEmployerControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : 'companyName:desc'
            },
          }).then(async (result) => {
            if (result?.error) {
              throw new Error((result.error as any)?.message || 'Unknown error')
            }
            return {
              items: (result.data?.items || []).map((item) => ({
                ...item,
          companyName: item.companyName||undefined,
        industry: item.industry||undefined,
        description: item.description||undefined,
        mission: item.mission||undefined,
        culture: item.culture||undefined,
        foundedYear: item.foundedYear||undefined,
        headquarters: item.headquarters||undefined,
        logoUrl: item.logoUrl||undefined,
        coverImageUrl: item.coverImageUrl||undefined,
        companyEmail: item.companyEmail||undefined,
        companyPhone: item.companyPhone||undefined,
        companyWebsite: item.companyWebsite||undefined,
        linkedinUrl: item.linkedinUrl||undefined,
        twitterUrl: item.twitterUrl||undefined,
        facebookUrl: item.facebookUrl||undefined,
              })),
              total: result.data?.meta.totalResults || 0,
            }
          })
            .catch((err) => {
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
      defaultSort: { field: 'companyName', order: 'desc' },
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

function onActionClick(e: OnActionClickParams<OpWorkEmployer>) {
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

function onEdit(row: OpWorkEmployer) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: OpWorkEmployer) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  opWorkEmployerControllerDeleteOne({ path: { id: row.id } })
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
    <Grid :table-title="$t('resource.name.OpWorkEmployer')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkEmployer')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
