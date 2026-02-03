<script lang="ts" setup>


import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';


import { useVbenForm } from '#/adapter/form';
import { authUserControllerCreateOne, authUserControllerUpdateOne } from '#/generated/client';
import type { AuthUser } from '#/generated/prisma/browser';
import { $t } from '#/locales';
import { useAuthUserFormSchema } from '../AuthUserData';


const emits = defineEmits(['success']);

const formData = ref<AuthUser>({} as AuthUser);

const [Form, formApi] = useVbenForm({
  schema: useAuthUserFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? authUserControllerUpdateOne({
      path: { id: id.value },
      body: {
        anonymousId: values.anonymousId,
        supabaseUserId: values.supabaseUserId,
        supabaseUserData: values.supabaseUserData ? JSON.parse(values.supabaseUserData as any) : null,
        isActive: values.isActive
      }
    }) : authUserControllerCreateOne({
      body: {
        anonymousId: values.anonymousId,
        supabaseUserId: values.supabaseUserId,
        supabaseUserData: values.supabaseUserData ? JSON.parse(values.supabaseUserData as any) : null,
        isActive: values.isActivevalues
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
      const data = drawerApi.getData<AuthUser>();
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
    ? $t('common.edit', $t('resource.AuthUser.name'))
    : $t('common.create', $t('resource.AuthUser.name'));
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
