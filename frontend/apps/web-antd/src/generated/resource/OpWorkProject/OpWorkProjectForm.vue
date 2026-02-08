<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { notification } from 'ant-design-vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkProjectControllerCreateOne, opWorkProjectControllerUpdateOne } from '#/generated/client';
import type { OpWorkProject } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkProjectFormSchema } from './OpWorkProjectData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkProject>({} as OpWorkProject);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkProjectFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkProjectControllerUpdateOne({
      path: { id: id.value },
      body: {
        title: values.title,
        description: values.description,
        status: values.status,
        type: values.type,
        githubRepoUrl: values.githubRepoUrl,
        technologies: values.technologies,
        architecture: values.architecture,
        plannedDatesDescription: values.plannedDatesDescription,
        plannedStartDate: values.plannedStartDate,
        plannedEndDate: values.plannedEndDate,
        implementationDescription: values.implementationDescription,
        actualStartDate: values.actualStartDate,
        developmentStart: values.developmentStart,
        testingStart: values.testingStart,
        launchDescription: values.launchDescription,
        launchDate: values.launchDate,
        goLiveDate: values.goLiveDate,
        completionDescription: values.completionDescription,
        actualEndDate: values.actualEndDate,
        completionDate: values.completionDate,
        maintenanceDescription: values.maintenanceDescription,
        maintenanceStart: values.maintenanceStart,
        maintenanceEnd: values.maintenanceEnd,
        OpWorkProfile: { connect: { id: values.profileId } },
      }
    }) : opWorkProjectControllerCreateOne({
      body: {
        title: values.title,
        description: values.description,
        status: values.status,
        type: values.type,
        githubRepoUrl: values.githubRepoUrl,
        technologies: values.technologies,
        architecture: values.architecture,
        plannedDatesDescription: values.plannedDatesDescription,
        plannedStartDate: values.plannedStartDate,
        plannedEndDate: values.plannedEndDate,
        implementationDescription: values.implementationDescription,
        actualStartDate: values.actualStartDate,
        developmentStart: values.developmentStart,
        testingStart: values.testingStart,
        launchDescription: values.launchDescription,
        launchDate: values.launchDate,
        goLiveDate: values.goLiveDate,
        completionDescription: values.completionDescription,
        actualEndDate: values.actualEndDate,
        completionDate: values.completionDate,
        maintenanceDescription: values.maintenanceDescription,
        maintenanceStart: values.maintenanceStart,
        maintenanceEnd: values.maintenanceEnd,
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
      const data = drawerApi.getData<OpWorkProject>();
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
    ? $t('common.edit', $t('resource.name.OpWorkProject'))
    : $t('common.create', $t('resource.name.OpWorkProject'));
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
