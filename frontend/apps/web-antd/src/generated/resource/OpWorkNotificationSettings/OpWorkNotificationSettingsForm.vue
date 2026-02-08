<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkNotificationSettingsControllerCreateOne, opWorkNotificationSettingsControllerUpdateOne } from '#/generated/client';
import type { OpWorkNotificationSettings } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkNotificationSettingsFormSchema } from './OpWorkNotificationSettingsData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkNotificationSettings>({} as OpWorkNotificationSettings);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkNotificationSettingsFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkNotificationSettingsControllerUpdateOne({
      path: { id: id.value },
      body: {
        emailApplicationUpdates: values.emailApplicationUpdates,
        emailJobAlerts: values.emailJobAlerts,
        emailNewsletter: values.emailNewsletter,
        pushApplicationUpdates: values.pushApplicationUpdates,
        pushJobAlerts: values.pushJobAlerts,
        jobAlertFrequency: values.jobAlertFrequency,
        OpWorkProfile: { connect: { id: values.profileId } },
      }
    }) : opWorkNotificationSettingsControllerCreateOne({
      body: {
        emailApplicationUpdates: values.emailApplicationUpdates,
        emailJobAlerts: values.emailJobAlerts,
        emailNewsletter: values.emailNewsletter,
        pushApplicationUpdates: values.pushApplicationUpdates,
        pushJobAlerts: values.pushJobAlerts,
        jobAlertFrequency: values.jobAlertFrequency,
        OpWorkProfile: { connect: { id: values.profileId } },
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
      const data = drawerApi.getData<OpWorkNotificationSettings>();
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
    ? $t('common.edit', $t('resource.name.OpWorkNotificationSettings'))
    : $t('common.create', $t('resource.name.OpWorkNotificationSettings'));
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
