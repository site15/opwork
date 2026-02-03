<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { authUserControllerDeleteOne, authUserControllerFindMany, authUserControllerUpdateOne } from '#/generated/client';
import type { AuthUser } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useAuthUserColumns, useAuthUserFilterFormSchema } from './AuthUserData';
import AuthUserForm from './AuthUserForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: AuthUserForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useAuthUserFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useAuthUserColumns(onActionClick, onIsActiveChange),
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
          return await authUserControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : 'createdAt:desc'
            },
          }).then(async (result) => ({
            items: (result.data?.items || []).map((item) => ({
              ...item, supabaseUserData: JSON.stringify(
                item.supabaseUserData)
            })),
            total: result.data?.meta.totalResults || 0,
          }));
        },
      },
      sort: true
    },
    sortConfig: {
      defaultSort: { field: 'createdAt', order: 'desc' },
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

function onActionClick(e: OnActionClickParams<AuthUser>) {
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


/**
 * 状态开关即将改变
 * @param newValue 期望改变的状态值
 * @param row 行数据
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 */
async function onIsActiveChange(
  newValue: boolean,
  row: AuthUser,
) {
  try {
    await authUserControllerUpdateOne({
      path: { id: row.id },
      body: {
        anonymousId: row.anonymousId,
        supabaseUserId: row.supabaseUserId,
        supabaseUserData: row.supabaseUserData ? JSON.parse(row.supabaseUserData as any) : null,
        isActive: newValue
      },
    });
    return true;
  } catch {
    return false;
  }
}

function onEdit(row: AuthUser) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: AuthUser) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  authUserControllerDeleteOne({ path: { id: row.id } })
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
    <Grid :table-title="$t('resource.name.AuthUser')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.AuthUser')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
