<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkJobControllerCreateOne, opWorkJobControllerUpdateOne } from '#/generated/client';
import type { OpWorkJob } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkJobFormSchema } from './OpWorkJobData';
import { applyBackendValidationErrors, clearBackendValidationErrors } from '#/utils/apply-backend-validation-errors';

const emits = defineEmits(['success']);

const formData = ref<OpWorkJob>({} as OpWorkJob);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkJobFormSchema(),
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
    (id.value ? opWorkJobControllerUpdateOne({
      path: { id: id.value },
      body: {
        title: values.title,
        description: values.description,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        employmentType: values.employmentType,
        experienceLevel: values.experienceLevel,
        department: values.department,
        salaryMin: values.salaryMin,
        salaryMax: values.salaryMax,
        salaryCurrency: values.salaryCurrency,
        location: values.location,
        isRemote: values.isRemote,
        status: values.status,
        viewsCount: values.viewsCount,
        applicationsCount: values.applicationsCount,
        savesCount: values.savesCount,
        publishedAt: values.publishedAt,
        expiresAt: values.expiresAt,
        OpWorkEmployer: { connect: { id: values.employerId } },
        OpWorkProfile: { connect: { id: values.profileId } },
      }
    }) : opWorkJobControllerCreateOne({
      body: {
        title: values.title,
        description: values.description,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        employmentType: values.employmentType,
        experienceLevel: values.experienceLevel,
        department: values.department,
        salaryMin: values.salaryMin,
        salaryMax: values.salaryMax,
        salaryCurrency: values.salaryCurrency,
        location: values.location,
        isRemote: values.isRemote,
        status: values.status,
        viewsCount: values.viewsCount,
        applicationsCount: values.applicationsCount,
        savesCount: values.savesCount,
        publishedAt: values.publishedAt,
        expiresAt: values.expiresAt,
        OpWorkEmployer: { connect: { id: values.employerId } },
        OpWorkProfile: { connect: { id: values.profileId } },
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
      const data = drawerApi.getData<OpWorkJob>();
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
    ? $t('common.edit', $t('resource.name.OpWorkJob'))
    : $t('common.create', $t('resource.name.OpWorkJob'));
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
