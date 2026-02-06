<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

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
          console.log(options, formValues)
          return await opWorkProjectControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? `${options.sort.field}:${options.sort.order}` : '[object Object]:desc'
            },
          }).then(async (result) => ({
            items: (result.data?.items || []).map((item) => ({
              ...item,
        id: item.id,
        profileId: item.profileId,
        title: item.title,
        description: item.description,
        status: item.status,
        type: item.type,
        githubRepoUrl: item.githubRepoUrl,
        technologies: item.technologies,
        architecture: item.architecture,
        plannedDatesDescription: item.plannedDatesDescription,
        plannedStartDate: item.plannedStartDate,
        plannedEndDate: item.plannedEndDate,
        implementationDescription: item.implementationDescription,
        actualStartDate: item.actualStartDate,
        developmentStart: item.developmentStart,
        testingStart: item.testingStart,
        launchDescription: item.launchDescription,
        launchDate: item.launchDate,
        goLiveDate: item.goLiveDate,
        completionDescription: item.completionDescription,
        actualEndDate: item.actualEndDate,
        completionDate: item.completionDate,
        maintenanceDescription: item.maintenanceDescription,
        maintenanceStart: item.maintenanceStart,
        maintenanceEnd: item.maintenanceEnd,
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
