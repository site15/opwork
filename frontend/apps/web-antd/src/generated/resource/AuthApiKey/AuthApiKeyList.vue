<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { authApiKeyControllerDeleteOne, authApiKeyControllerFindMany, authApiKeyControllerUpdateOne } from '#/generated/client';
import type { AuthApiKey } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useAuthApiKeyColumns, useAuthApiKeyFilterFormSchema } from './AuthApiKeyData';
import AuthApiKeyForm from './AuthApiKeyForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: AuthApiKeyForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useAuthApiKeyFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useAuthApiKeyColumns(onActionClick),
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
          return await authApiKeyControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : '[object Object]:desc'
            },
          }).then(async (result) => ({
            items: (result.data?.items || []).map((item) => ({
              ...item,
        id: item.id,
        userId: item.userId,
        apiKey: item.apiKey,
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
            })),
            total: result.data?.meta.totalResults || 0,
          }));
        },
      },
      sort: true
    },
    sortConfig: {
      defaultSort: { field: '[object Object]', order: 'desc' },
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

function onActionClick(e: OnActionClickParams<AuthApiKey>) {
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

function onEdit(row: AuthApiKey) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: AuthApiKey) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  authApiKeyControllerDeleteOne({ path: { id: row.id } })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.id]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
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
    <Grid :table-title="$t('resource.name.AuthApiKey')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.AuthApiKey')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
