import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateForm = ({
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
  const editableFields = update.fields.filter(
    (field) =>
      field.kind === 'scalar' ||
      field.kind === 'enum' ||
      (field.kind === 'object' && field.relationName),
  );

  const getInputComponent = (field: (typeof editableFields)[0]): string => {
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
    if (field.relationName) {
      return `        ${field.name}: { connect: { id: values.${field.relationFromFields?.[0]} } },`;
    }
    if (field.type === 'Json') {
      return `        ${field.name}: values.${field.name} ? JSON.parse(values.${field.name} as any) : null,`;
    }
    return `        ${field.name}: values.${field.name},`;
  };

  // Generate input fields for create form (only editable fields)
  const createMethodFields = editableFields
    .map((field) => {
      return getInputComponent(field);
    })
    .join('\n');

  // Generate input fields for edit form (editable + read-only)
  const editMethodFields = [
    ...editableFields.map((field) => {
      return getInputComponent(field);
    }),
  ].join('\n');

  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  return `<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { ${camelModelName}ControllerCreateOne, ${camelModelName}ControllerUpdateOne } from '#/generated/client';
import type { ${entityClassName} } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { use${entityClassName}FormSchema } from './${entityClassName}Data';

const emits = defineEmits(['success']);

const formData = ref<${entityClassName}>({} as ${entityClassName});

const [Form, formApi] = useVbenForm({
  schema: use${entityClassName}FormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? ${camelModelName}ControllerUpdateOne({
      path: { id: id.value },
      body: {
${editMethodFields}
      }
    }) : ${camelModelName}ControllerCreateOne({
      body: {
${createMethodFields}
      }
    }))
      .then((data) => {
        if (data.error) {
          throw new Error((data.error as any)?.message || 'Unknown error')
        }
        emits('success');
        drawerApi.close();
      })
      .catch((err) => {
        drawerApi.unlock();
        notification.error({
          message: id.value ? $t('actions.common.updateFailed') : $t('actions.common.createFailed'),
          description: err instanceof Error ? err.message : '',
          duration: 3000,
        });
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<${entityClassName}>();
      formApi.resetForm();

      if (data) {
        formData.value = data;
        id.value = data.id;
      } else {
        id.value = undefined;
      }

      // Wait for Vue to flush DOM updates (form fields mounted)
      await nextTick();
      if (data) {
        formApi.setValues(data);
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('resource.name.${entityClassName}'))
    : $t('common.create', $t('resource.name.${entityClassName}'));
});

</script>
<template>
  <Drawer :title="getDrawerTitle">
    <Form>
    </Form>
  </Drawer>
</template>
<style lang="css" scoped>
:deep(.ant-tree-title) {
  .tree-actions {
    display: none;
    margin-left: 20px;
  }
}

:deep(.ant-tree-title:hover) {
  .tree-actions {
    display: flex;
    flex: auto;
    justify-content: flex-end;
    margin-left: 20px;
  }
}
</style>
`;
};
