<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { opWorkEmployerControllerCreateOne, opWorkEmployerControllerUpdateOne } from '#/generated/client';
import type { OpWorkEmployer } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useOpWorkEmployerFormSchema } from './OpWorkEmployerData';

const emits = defineEmits(['success']);

const formData = ref<OpWorkEmployer>({} as OpWorkEmployer);

const [Form, formApi] = useVbenForm({
  schema: useOpWorkEmployerFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? opWorkEmployerControllerUpdateOne({
      path: { id: id.value },
      body: {
        companyName: values.companyName,
        industry: values.industry,
        description: values.description,
        mission: values.mission,
        culture: values.culture,
        foundedYear: values.foundedYear,
        headquarters: values.headquarters,
        logoUrl: values.logoUrl,
        coverImageUrl: values.coverImageUrl,
        companyEmail: values.companyEmail,
        companyPhone: values.companyPhone,
        companyWebsite: values.companyWebsite,
        linkedinUrl: values.linkedinUrl,
        twitterUrl: values.twitterUrl,
        facebookUrl: values.facebookUrl,
      }
    }) : opWorkEmployerControllerCreateOne({
      body: {
        companyName: values.companyName,
        industry: values.industry,
        description: values.description,
        mission: values.mission,
        culture: values.culture,
        foundedYear: values.foundedYear,
        headquarters: values.headquarters,
        logoUrl: values.logoUrl,
        coverImageUrl: values.coverImageUrl,
        companyEmail: values.companyEmail,
        companyPhone: values.companyPhone,
        companyWebsite: values.companyWebsite,
        linkedinUrl: values.linkedinUrl,
        twitterUrl: values.twitterUrl,
        facebookUrl: values.facebookUrl,
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
      const data = drawerApi.getData<OpWorkEmployer>();
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
    ? $t('common.edit', $t('resource.name.OpWorkEmployer'))
    : $t('common.create', $t('resource.name.OpWorkEmployer'));
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
