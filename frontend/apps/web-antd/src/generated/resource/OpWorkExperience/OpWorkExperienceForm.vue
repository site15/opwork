<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkExperienceControllerCreateOne, opWorkExperienceControllerUpdateOne } from '#/generated/client';
import type { OpWorkExperience } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkExperienceFormSchema } from './OpWorkExperienceData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkExperience>({} as OpWorkExperience);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkExperienceFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkExperienceControllerUpdateOne({
      path: { id: id.value },
      body: {
        company: values.company,
        position: values.position,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        isCurrent: values.isCurrent,
        location: values.location,
        employmentType: values.employmentType,
        OpWorkJobSeeker: { connect: { id: values.jobSeekerId } },
      }
    }) : opWorkExperienceControllerCreateOne({
      body: {
        company: values.company,
        position: values.position,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        isCurrent: values.isCurrent,
        location: values.location,
        employmentType: values.employmentType,
        OpWorkJobSeeker: { connect: { id: values.jobSeekerId } },
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
      const data = drawerApi.getData<OpWorkExperience>();
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
    ? $t('common.edit', $t('resource.name.OpWorkExperience'))
    : $t('common.create', $t('resource.name.OpWorkExperience'));
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
