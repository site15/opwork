<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import dayjs from 'dayjs';
import { Button, message, notification } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { opWorkProjectControllerDeleteOne, opWorkProjectControllerFindMany, opWorkProjectControllerUpdateOne } from '#/generated/client';
import type { OpWorkProject } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkProjectColumns, useOpWorkProjectFilterFormSchema } from './OpWorkProjectData';
import OpWorkProjectForm from './OpWorkProjectForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: OpWorkProjectForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useOpWorkProjectFilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: useOpWorkProjectColumns(onActionClick),
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
          return await opWorkProjectControllerFindMany({
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
          title: item.title||undefined,
        description: item.description||undefined,
        status: item.status||undefined,
        type: item.type||undefined,
        githubRepoUrl: item.githubRepoUrl||undefined,
        technologies: item.technologies||undefined,
        architecture: item.architecture||undefined,
        plannedDatesDescription: item.plannedDatesDescription||undefined,
        plannedStartDate:item.plannedStartDate?dayjs(item.plannedStartDate):undefined,
        plannedEndDate:item.plannedEndDate?dayjs(item.plannedEndDate):undefined,
        implementationDescription: item.implementationDescription||undefined,
        actualStartDate:item.actualStartDate?dayjs(item.actualStartDate):undefined,
        developmentStart:item.developmentStart?dayjs(item.developmentStart):undefined,
        testingStart:item.testingStart?dayjs(item.testingStart):undefined,
        launchDescription: item.launchDescription||undefined,
        launchDate:item.launchDate?dayjs(item.launchDate):undefined,
        goLiveDate:item.goLiveDate?dayjs(item.goLiveDate):undefined,
        completionDescription: item.completionDescription||undefined,
        actualEndDate:item.actualEndDate?dayjs(item.actualEndDate):undefined,
        completionDate:item.completionDate?dayjs(item.completionDate):undefined,
        maintenanceDescription: item.maintenanceDescription||undefined,
        maintenanceStart:item.maintenanceStart?dayjs(item.maintenanceStart):undefined,
        maintenanceEnd:item.maintenanceEnd?dayjs(item.maintenanceEnd):undefined,
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

function onActionClick(e: OnActionClickParams<OpWorkProject>) {
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

function onEdit(row: OpWorkProject) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: OpWorkProject) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  opWorkProjectControllerDeleteOne({ path: { id: row.id } })
    .then(() => {
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
    <Grid :table-title="$t('resource.name.OpWorkProject')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.OpWorkProject')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
