<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

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
          console.log(options, formValues)
          return await opWorkEmployerControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : '[object Object]:desc'
            },
          }).then(async (result) => ({
            items: (result.data?.items || []).map((item) => ({
              ...item,
        id: item.id,
        profileId: item.profileId,
        companyName: item.companyName,
        industry: item.industry,
        description: item.description,
        mission: item.mission,
        culture: item.culture,
        foundedYear: item.foundedYear,
        headquarters: item.headquarters,
        logoUrl: item.logoUrl,
        coverImageUrl: item.coverImageUrl,
        companyEmail: item.companyEmail,
        companyPhone: item.companyPhone,
        companyWebsite: item.companyWebsite,
        linkedinUrl: item.linkedinUrl,
        twitterUrl: item.twitterUrl,
        facebookUrl: item.facebookUrl,
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
