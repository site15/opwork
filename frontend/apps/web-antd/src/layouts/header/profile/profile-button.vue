<script setup lang="ts">
import { ref, unref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { createIconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { opWorkProfileService } from '#/services/ProfileService';

import { VbenIconButton } from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/components';
import RadioGroup from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/radio-group/RadioGroupItem.vue';

const ProfileIcon = createIconifyIcon('fluent-mdl2:account-management');

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
      opWorkProfileService.setProfileId(currentProfileId || null);
      modalApi.close();
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const profileId = opWorkProfileService.getProfileId();
      if (profileId) {
        currentProfileIdRef.value = profileId;
      } else {
        const opWorkProfile = await opWorkProfileService.getProfile();
        currentProfileIdRef.value = opWorkProfile.id;
      }
      availableProfilesRef.value = await opWorkProfileService
        .getProfiles()
        .then((items) =>
          items.map((item) => ({
            label: `${item.description || item.title || item.email} (${$t(`resource.OpWorkProfileType.${item.type}`)})`,
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
