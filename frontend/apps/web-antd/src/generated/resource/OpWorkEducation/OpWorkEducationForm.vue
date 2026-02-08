<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkEducationControllerCreateOne, opWorkEducationControllerUpdateOne } from '#/generated/client';
import type { OpWorkEducation } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkEducationFormSchema } from './OpWorkEducationData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkEducation>({} as OpWorkEducation);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkEducationFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkEducationControllerUpdateOne({
      path: { id: id.value },
      body: {
        institution: values.institution,
        degree: values.degree,
        fieldOfStudy: values.fieldOfStudy,
        startDate: values.startDate,
        endDate: values.endDate,
        isCurrent: values.isCurrent,
        description: values.description,
        grade: values.grade,
      }
    }) : opWorkEducationControllerCreateOne({
      body: {
        institution: values.institution,
        degree: values.degree,
        fieldOfStudy: values.fieldOfStudy,
        startDate: values.startDate,
        endDate: values.endDate,
        isCurrent: values.isCurrent,
        description: values.description,
        grade: values.grade,
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
      const data = drawerApi.getData<OpWorkEducation>();
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
    ? $t('common.edit', $t('resource.name.OpWorkEducation'))
    : $t('common.create', $t('resource.name.OpWorkEducation'));
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
