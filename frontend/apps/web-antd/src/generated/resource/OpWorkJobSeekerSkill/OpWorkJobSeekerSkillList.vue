<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { opWorkJobSeekerSkillControllerDeleteOne, opWorkJobSeekerSkillControllerFindMany, opWorkJobSeekerSkillControllerUpdateOne } from '#/generated/client';
import type { OpWorkJobSeekerSkill } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkJobSeekerSkillColumns, useOpWorkJobSeekerSkillFilterFormSchema } from './OpWorkJobSeekerSkillData';
import OpWorkJobSeekerSkillForm from './OpWorkJobSeekerSkillForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkJobSeekerSkillForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useOpWorkJobSeekerSkillFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useOpWorkJobSeekerSkillColumns(onActionClick),
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
          return await opWorkJobSeekerSkillControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : '[object Object]:desc'
            },
          }).then(async (result) => ({
            items: (result.data?.items || []).map((item) => ({
              ...item,
        id: item.id,
        jobSeekerId: item.jobSeekerId,
        skillId: item.skillId,
        level: item.level,
        yearsOfExp: item.yearsOfExp,
        isPrimary: item.isPrimary,
        lastUsed: item.lastUsed,
        createdAt: item.createdAt,
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

function onActionClick(e: OnActionClickParams<OpWorkJobSeekerSkill>) {
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

function onEdit(row: OpWorkJobSeekerSkill) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: OpWorkJobSeekerSkill) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  opWorkJobSeekerSkillControllerDeleteOne({ path: { id: row.id } })
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
    <Grid :table-title="$t('resource.name.OpWorkJobSeekerSkill')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkJobSeekerSkill')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
