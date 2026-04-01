<script lang="ts" setup>
import type { OnActionClickParams } from '#/adapter/vxe-table';
import type { OpWorkJobTag } from '#/generated/prisma/browser';

import { useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, notification } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  employerJobTagsControllerDelJobTag,
  employerJobTagsControllerGetJobTags,
} from '#/generated/client';
import { $t } from '#/locales';

import { useOpWorkJobTagColumns } from './OpWorkJobTagData';
import OpWorkJobTagForm from './OpWorkJobTagForm.vue';

interface Props {
  jobId?: string;
}

const props = withDefaults(defineProps<Props>(), { jobId: undefined });

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkJobTagForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    pagerConfig: { autoHidden: true },
    columns: useOpWorkJobTagColumns(onActionClick),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async () => {
          const { jobId } = props;
          if (!jobId) {
            return {
              items: [],
              total: 0,
            };
          }
          return await employerJobTagsControllerGetJobTags({
            path: { job_id: jobId },
          })
            .then(async (result) => {
              if (result?.error) {
                throw new Error(
                  (result.error as any)?.message || 'Unknown error',
                );
              }
              return {
                items: (result.data || []).map((item) => ({
                  ...item,
                  name: item.name || undefined,
                  color: item.color || undefined,
                })),
                total: result.data?.length || 0,
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
      defaultSort: { field: 'name', order: 'desc' },
      remote: true,
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: false,
      export: false,
      refresh: true,
      search: false,
      zoom: false,
    },
  },
});

function onActionClick(e: OnActionClickParams<OpWorkJobTag>) {
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

function onEdit(row: OpWorkJobTag) {
  formDrawerApi.setData({ ...row, jobId: props.jobId }).open();
}

function onDelete(row: OpWorkJobTag) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  employerJobTagsControllerDelJobTag({ path: { job_tag_id: row.id } })
    .then(() => {
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
  formDrawerApi.setData({ jobId: props.jobId }).open();
}
</script>
<template>
  <FormDrawer @success="onRefresh" />
  <Grid :table-title="$t('resource.name.OpWorkJobTag')">
    <template #toolbar-tools>
      <Button type="primary" @click="onCreate">
        <Plus class="size-5" />
        {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkJobTag')]) }}
      </Button>
    </template>
  </Grid>
</template>
