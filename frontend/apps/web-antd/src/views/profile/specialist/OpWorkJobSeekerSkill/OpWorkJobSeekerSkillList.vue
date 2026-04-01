<script lang="ts" setup>
import type { OnActionClickParams } from '#/adapter/vxe-table';
import type { OpWorkJobSeekerSkill } from '#/generated/prisma/browser';

import { useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  jobSeekerSkillControllerDelJobSkill,
  jobSeekerSkillControllerGetSkills,
} from '#/generated/client';
import { $t } from '#/locales';

import { useOpWorkJobSeekerSkillColumns } from './OpWorkJobSeekerSkillData';
import OpWorkJobSeekerSkillForm from './OpWorkJobSeekerSkillForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkJobSeekerSkillForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    pagerConfig: { autoHidden: true },
    columns: useOpWorkJobSeekerSkillColumns(onActionClick),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async () => {
          return await jobSeekerSkillControllerGetSkills()
            .then(async (result) => {
              if (result?.error) {
                throw new Error(
                  (result.error as any)?.message || 'Unknown error',
                );
              }
              return {
                items: (result.data || []).map((item) => ({
                  ...item,
                  level: item.level || undefined,
                  yearsOfExp: item.yearsOfExp || undefined,
                  isPrimary: item.isPrimary || undefined,
                  lastUsed: item.lastUsed ? dayjs(item.lastUsed) : undefined,
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
      defaultSort: { field: 'level', order: 'desc' },
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
  jobSeekerSkillControllerDelJobSkill({ path: { job_seeker_skill_id: row.id } })
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
  formDrawerApi.setData({}).open();
}
</script>
<template>
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
</template>
