import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateList = ({
  controller,
  templateHelpers,
  update,
}: ModelParams & {
  templateHelpers: TemplateHelpers;
}): string => {
  const { model } = controller;
  const { entityName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);

  // Get fields for different form types
  const allFields = update.fields.filter(
    (field) => field.kind === 'scalar' || field.kind === 'enum',
  );

  const defaultSortColumn =
    allFields.find((field) => field.name === 'createdAt') || update.fields[0];

  const getInputComponent = (field: (typeof allFields)[0]): string => {
    /*switch (field.type) {
      case 'Json':
        return 'JsonViewerField';
      case 'String':
        return 'TextInput';
      case 'Int':
      case 'Float':
      case 'Decimal':
        return 'NumberInput';
      case 'Boolean':
        return 'BooleanInput';
      case 'DateTime':
        return 'DateTimeInput';
      default:
        return 'TextInput';
    }*/
    if (field.type === 'Json') {
      return `        ${field.name}: item.${field.name}?JSON.stringify(item.${field.name}):undefined,`;
    }

    if (field.type === 'DateTime') {
      return `        ${field.name}:item.${field.name}?dayjs(item.${field.name}):undefined,`;
    }
    return `        ${field.name}: item.${field.name}||undefined,`;
  };

  const showFormFields = [
    ...allFields.map((field) => {
      return getInputComponent(field);
    }),
  ].join('\n');

  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  return `<script lang="ts" setup>

import type {
  OnActionClickParams
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import dayjs from 'dayjs';
import { Button, message, notification } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ${camelModelName}ControllerDeleteOne, ${camelModelName}ControllerFindMany, ${camelModelName}ControllerUpdateOne } from '#/generated/client';
import type { ${entityClassName} } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { use${entityClassName}Columns, use${entityClassName}FilterFormSchema } from './${entityClassName}Data';
import ${entityClassName}Form from './${entityClassName}Form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: ${entityClassName}Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: use${entityClassName}FilterFormSchema(),
    submitOnChange: true, showCollapseButton: false
  },
  gridOptions: {
    columns: use${entityClassName}Columns(onActionClick),
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
          return await ${camelModelName}ControllerFindMany({
            query: {
              curPage: options.page.currentPage, perPage: options.page.pageSize, searchText: formValues.searchText,
              sort: (options.sort?.field && options.sort?.order) ? \`\${options.sort.field}:\${options.sort.order}\` : '${defaultSortColumn.name}:desc'
            },
          }).then(async (result) => {
            if (result?.error) {
              throw new Error((result.error as any)?.message || 'Unknown error')
            }
            return {
              items: (result.data?.items || []).map((item) => ({
                ...item,
  ${showFormFields}
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
      defaultSort: { field: '${defaultSortColumn.name}', order: 'desc' },
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

function onActionClick(e: OnActionClickParams<${entityClassName}>) {
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

function onEdit(row: ${entityClassName}) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: ${entityClassName}) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
    key: 'action_process_msg',
  });
  ${camelModelName}ControllerDeleteOne({ path: { id: row.id } })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error')
      }
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
    <Grid :table-title="$t('resource.name.${entityClassName}')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('resource.name.${entityClassName}')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
`;
};
