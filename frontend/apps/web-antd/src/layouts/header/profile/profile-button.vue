<script setup lang="ts">
import { ref, unref } from 'vue';
import { useRouter } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';
import { createIconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { useAppOpWorkProfileStore } from '#/services/ProfileService';

import { VbenIconButton } from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/components';
import RadioGroup from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/radio-group/RadioGroupItem.vue';

const ProfileIcon = createIconifyIcon('fluent-mdl2:account-management');

const appOpWorkProfileStore = useAppOpWorkProfileStore();
const router = useRouter();
const currentProfileIdRef = ref<string | undefined>();

const availableProfilesRef = ref<
  {
    label: string;
    value: string;
  }[]
>([]);

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onConfirm: async () => {
    try {
      modalApi.setState({ confirmLoading: true });
      const currentProfileId = unref(currentProfileIdRef);

      // 🔥 важно: обновляем профиль и хедер СРАЗУ
      // updateProfileHeader синхронно установит x-profile-id в хедере
      appOpWorkProfileStore.updateProfileHeader(currentProfileId || null);

      // Загружаем актуальный профиль с сервера (уже с новым profile-id в хедере)
      await appOpWorkProfileStore.getProfile();

      modalApi.close();

      // Переходим на домашнюю страницу
      await router.push('/');
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const profileId = appOpWorkProfileStore.profileId;
      if (profileId) {
        currentProfileIdRef.value = profileId;
      } else {
        const opWorkProfile = await appOpWorkProfileStore.getProfile();
        currentProfileIdRef.value = opWorkProfile.id;
      }
      availableProfilesRef.value = await appOpWorkProfileStore
        .getProfiles()
        .then((items) =>
          items.map((item) => ({
            label: `${item.email} (${$t(`resource.OpWorkProfileType.${item.type}`)})`,
            value: item.id,
          })),
        );
    }
  },
});

const handleClick = () => {
  modalApi.open();
};
</script>

<template>
  <div>
    <VbenIconButton
      :tooltip="$t('ui.widgets.profile.setProfile')"
      class="hover:animate-[shrink_0.3s_ease-in-out]"
      @click="handleClick"
    >
      <ProfileIcon class="size-4 text-foreground" />
    </VbenIconButton>
    <Modal :title="$t('ui.widgets.profile.setProfile')">
      <div class="profile-container">
        <RadioGroup v-model="currentProfileIdRef" class="flex flex-col gap-2">
          <div
            class="flex cursor-pointer items-center gap-2"
            v-for="item in availableProfilesRef"
            :key="`container${item.value}`"
          >
            <RadioGroupItem :id="item.value" :value="item.value" />
            <label :for="item.value" class="cursor-pointer">{{
              item.label
            }}</label>
          </div>
        </RadioGroup>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.profile-container {
  padding-left: 20px;
}
</style>
