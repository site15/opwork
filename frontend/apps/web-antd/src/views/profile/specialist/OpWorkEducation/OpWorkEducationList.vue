<script lang="ts" setup>
import type { OnActionClickParams } from '#/adapter/vxe-table';
import type { OpWorkEducation } from '#/generated/prisma/browser';

import { useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  jobSeekerEducationControllerDelEducation,
  jobSeekerEducationControllerGetEducations,
} from '#/generated/client';
import { $t } from '#/locales';

import { useOpWorkEducationColumns } from './OpWorkEducationData';
import OpWorkEducationForm from './OpWorkEducationForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkEducationForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    pagerConfig: { autoHidden: true },
    columns: useOpWorkEducationColumns(onActionClick),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async () => {
          return await jobSeekerEducationControllerGetEducations()
            .then(async (result) => {
              if (result?.error) {
                throw new Error(
                  (result.error as any)?.message || 'Unknown error',
                );
              }
              return {
                items: (result.data || []).map((item) => ({
                  ...item,
                  institution: item.institution || undefined,
                  degree: item.degree || undefined,
                  fieldOfStudy: item.fieldOfStudy || undefined,
                  startDate: item.startDate ? dayjs(item.startDate) : undefined,
                  endDate: item.endDate ? dayjs(item.endDate) : undefined,
                  isCurrent: item.isCurrent || undefined,
                  description: item.description || undefined,
                  grade: item.grade || undefined,
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
      defaultSort: { field: 'institution', order: 'desc' },
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

function onActionClick(e: OnActionClickParams<OpWorkEducation>) {
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

function onEdit(row: OpWorkEducation) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: OpWorkEducation) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  jobSeekerEducationControllerDelEducation({ path: { education_id: row.id } })
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
  <FormDrawer @success="onRefresh" />
  <Grid :table-title="$t('resource.name.OpWorkEducation')">
    <template #toolbar-tools>
      <Button type="primary" @click="onCreate">
        <Plus class="size-5" />
        {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkEducation')]) }}
      </Button>
    </template>
  </Grid>
</template>
