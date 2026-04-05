<script lang="ts" setup>
import type { OpWorkJobSkill } from '#/generated/client';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { notification } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { employerWorkSkillControllerSetJobSkill } from '#/generated/client';
import { $t } from '#/locales';
import {
  applyBackendValidationErrors,
  clearBackendValidationErrors,
} from '#/utils/apply-backend-validation-errors';

import { useOpWorkJobSkillFormSchema } from './OpWorkJobSkillData';

interface Props {
  jobId?: string;
}

const props = withDefaults(defineProps<Props>(), { jobId: undefined });

const emits = defineEmits(['success']);

const formData = ref<OpWorkJobSkill>({} as OpWorkJobSkill);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkJobSkillFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    // const { valid } =
    await formApi.validate();
    // if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();

    const data = drawerApi.getData<Props>();
    const { jobId } = props;
    const job_id = jobId || data.jobId;
    if (!job_id) {
      throw new Error('Job ID is required');
    }
    employerWorkSkillControllerSetJobSkill({
      path: { job_id },
      body: {
        id: id.value,
        isRequired: values.isRequired,
        importance: values.importance,
        minLevel: values.minLevel,
        skillId: values.skillId,
        skillName: values.skillName,
      },
    })
      .then(() => {
        clearBackendValidationErrors(formApi);
        emits('success');
        drawerApi.close();
      })
      .catch((error) => {
        drawerApi.unlock();
        const hasValidationErrors = applyBackendValidationErrors(
          formApi,
          error,
        );
        if (!hasValidationErrors) {
          notification.error({
            message: id.value
              ? $t('actions.common.updateFailed')
              : $t('actions.common.createFailed'),
            description: error instanceof Error ? error.message : '',
            duration: 3000,
          });
        }
        throw error;
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<OpWorkJobSkill>();
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
    ? $t('common.edit', $t('resource.name.OpWorkJobSkill'))
    : $t('common.create', $t('resource.name.OpWorkJobSkill'));
});
</script>
<template>
  <Drawer :title="getDrawerTitle">
    <Form />
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
