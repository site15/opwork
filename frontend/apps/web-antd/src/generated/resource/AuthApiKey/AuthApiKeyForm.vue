<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { authApiKeyControllerCreateOne, authApiKeyControllerUpdateOne } from '#/generated/client';
import type { AuthApiKey } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useAuthApiKeyFormSchema } from './AuthApiKeyData';

const emits = defineEmits(['success']);

const formData = ref<AuthApiKey>({} as AuthApiKey);

const [Form, formApi] = useVbenForm({
  schema: useAuthApiKeyFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? authApiKeyControllerUpdateOne({
      path: { id: id.value },
      body: {
        apiKey: values.apiKey,
        isActive: values.isActive,
      }
    }) : authApiKeyControllerCreateOne({
      body: {
        apiKey: values.apiKey,
        isActive: values.isActive,
      }
    }))
      .then(() => {
        emits('success');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<AuthApiKey>();
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
    ? $t('common.edit', $t('resource.name.AuthApiKey'))
    : $t('common.create', $t('resource.name.AuthApiKey'));
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
