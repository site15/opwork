<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkSkillControllerCreateOne, opWorkSkillControllerUpdateOne } from '#/generated/client';
import type { OpWorkSkill } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkSkillFormSchema } from './OpWorkSkillData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkSkill>({} as OpWorkSkill);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkSkillFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkSkillControllerUpdateOne({
      path: { id: id.value },
      body: {
        name: values.name,
        description: values.description,
        category: values.category,
        icon: values.icon,
        popularity: values.popularity,
      }
    }) : opWorkSkillControllerCreateOne({
      body: {
        name: values.name,
        description: values.description,
        category: values.category,
        icon: values.icon,
        popularity: values.popularity,
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
      const data = drawerApi.getData<OpWorkSkill>();
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
    ? $t('common.edit', $t('resource.name.OpWorkSkill'))
    : $t('common.create', $t('resource.name.OpWorkSkill'));
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
