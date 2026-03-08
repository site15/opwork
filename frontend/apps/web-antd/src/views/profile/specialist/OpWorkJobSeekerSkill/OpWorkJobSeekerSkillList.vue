<script lang="ts" setup>
import type { OnActionClickParams } from '#/adapter/vxe-table';
import type { OpWorkJobSeekerSkill } from '#/generated/prisma/browser';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  opWorkJobSeekerSkillControllerDeleteOne,
  opWorkJobSeekerSkillControllerFindMany,
} from '#/generated/client';
import { $t } from '#/locales';

import {
  useOpWorkJobSeekerSkillColumns,
  useOpWorkJobSeekerSkillFilterFormSchema,
} from './OpWorkJobSeekerSkillData';
import OpWorkJobSeekerSkillForm from './OpWorkJobSeekerSkillForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkJobSeekerSkillForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useOpWorkJobSeekerSkillFilterFormSchema(),
    submitOnChange: true,
    showCollapseButton: false,
  },
  gridOptions: {
    columns: useOpWorkJobSeekerSkillColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (
          options: {
            page: { currentPage: number; pageSize: number; total: number };
            sort?: {
              field: string;
              order: 'asc' | 'desc';
            };
          },
          formValues: { searchText: string },
        ) => {
          return await opWorkJobSeekerSkillControllerFindMany({
            query: {
              curPage: options.page.currentPage,
              perPage: options.page.pageSize,
              searchText: formValues.searchText,
              sort:
                options.sort?.field && options.sort?.order
                  ? `${options.sort.field}:${options.sort.order}`
                  : 'level:desc',
            },
          })
            .then(async (result) => {
              if (result?.error) {
                throw new Error(
                  (result.error as any)?.message || 'Unknown error',
                );
              }
              return {
                items: (result.data?.items || []).map((item) => ({
                  ...item,
                  level: item.level || undefined,
                  yearsOfExp: item.yearsOfExp || undefined,
                  isPrimary: item.isPrimary || undefined,
                  lastUsed: item.lastUsed ? dayjs(item.lastUsed) : undefined,
                })),
                total: result.data?.meta.totalResults || 0,
              };
            })
            .catch((error) => {
              notification.error({
                message: $t('actions.common.findManyFailed'),
                description: error instanceof Error ? error.message : '',
                duration: 3000,
              });
            });
        },
      },
      sort: true,
    },
    sortConfig: {
      defaultSort: { field: 'level', order: 'desc' },
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
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.id]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch((error) => {
      hideLoading();
      notification.error({
        message: $t('actions.common.deleteFailed'),
        description: error instanceof Error ? error.message : '',
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
    <Grid :table-title="$t('resource.name.OpWorkJobSeekerSkill')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{
            $t('ui.actionTitle.create', [
              $t('resource.name.OpWorkJobSeekerSkill'),
            ])
          }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
