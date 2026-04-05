<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkJobViewControllerCreateOne, opWorkJobViewControllerUpdateOne } from '#/generated/client';
import type { OpWorkJobView } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkJobViewFormSchema } from './OpWorkJobViewData';
import { applyBackendValidationErrors, clearBackendValidationErrors } from '#/utils/apply-backend-validation-errors';

const emits = defineEmits(['success']);

const formData = ref<OpWorkJobView>({} as OpWorkJobView);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkJobViewFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    /// const { valid } = 
    await formApi.validate();
    // if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkJobViewControllerUpdateOne({
      path: { id: id.value },
      body: {
        viewedAt: values.viewedAt,
        ipAddress: values.ipAddress,
        userAgent: values.userAgent,
        OpWorkProfile: { connect: { id: values.profileId } },
        OpWorkJob: { connect: { id: values.jobId } },
      }
    }) : opWorkJobViewControllerCreateOne({
      body: {
        viewedAt: values.viewedAt,
        ipAddress: values.ipAddress,
        userAgent: values.userAgent,
        OpWorkProfile: { connect: { id: values.profileId } },
        OpWorkJob: { connect: { id: values.jobId } },
      }
    }))
      .then(() => {
        clearBackendValidationErrors(formApi);
        emits('success');
        drawerApi.close();
      })
      .catch((err) => {
        drawerApi.unlock();
        const hasValidationErrors = applyBackendValidationErrors(formApi, err);
        if (!hasValidationErrors) {
          notification.error({
            message: id.value ? $t('actions.common.updateFailed') : $t('actions.common.createFailed'),
            description: err instanceof Error ? err.message : '',
            duration: 3000,
          });
        }
        throw err;
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<OpWorkJobView>();
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
    ? $t('common.edit', $t('resource.name.OpWorkJobView'))
    : $t('common.create', $t('resource.name.OpWorkJobView'));
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
