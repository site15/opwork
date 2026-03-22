<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useVbenForm } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Button, notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  employerControllerGetProfile,
  employerControllerSetProfile,
} from '#/generated/client';

import { CardHeader } from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui';
import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardFooter from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardFooter.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';
import { useOpWorkEmployerFormSchema } from './OpWorkEmployerData';

defineOptions({ name: 'EmployerProfile' });

const loading = ref(false);

const loadProfile = () => {
  loading.value = true;
  employerControllerGetProfile({ path: { employer_id: '' } })
    .then(async (response) => {
      if (response.error) {
        throw new Error((response.error as any)?.message || 'Unknown error');
      }
      const values = {
        ...response.data,
        createdAt: response.data?.createdAt
          ? dayjs(response.data.createdAt)
          : undefined,
        updatedAt: response.data?.updatedAt
          ? dayjs(response.data.updatedAt)
          : undefined,
      };
      employerProfileFormApi.setValues(values);
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
      employerProfileFormApi.setValues({});
    })
    .finally(() => {
      loading.value = false;
    });
};

const [EmployerProfileForm, employerProfileFormApi] = useVbenForm({
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 gap-2',
  schema: useOpWorkEmployerFormSchema(),
  showDefaultActions: false,
});

const submit = async () => {
  //
  const { valid: employerValid } = await employerProfileFormApi.validate();
  if (!employerValid) return;
  const employerProfileValues = await employerProfileFormApi.getValues();

  employerControllerSetProfile({
    body: {
      companyName: employerProfileValues.companyName,
      industry: employerProfileValues.industry,
      description: employerProfileValues.description,
      mission: employerProfileValues.mission,
      culture: employerProfileValues.culture,
      foundedYear: employerProfileValues.foundedYear,
      headquarters: employerProfileValues.headquarters,
      logoUrl: employerProfileValues.logoUrl,
      coverImageUrl: employerProfileValues.coverImageUrl,
      companyEmail: employerProfileValues.companyEmail,
      companyPhone: employerProfileValues.companyPhone,
      companyWebsite: employerProfileValues.companyWebsite,
      linkedinUrl: employerProfileValues.linkedinUrl,
      twitterUrl: employerProfileValues.twitterUrl,
      facebookUrl: employerProfileValues.facebookUrl,
    },
  })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      return data;
    })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      return data;
    })
    .then(() => {
      notification.success({
        message: $t('actions.common.updateSuccess'),
        description: $t('employer.detail.updateSuccessDescription'),
        duration: 3000,
      });
    })
    .catch((error) => {
      notification.error({
        message: $t('actions.common.updateFailed'),
        description: error instanceof Error ? error.message : '',
        duration: 3000,
      });
    });
};
onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div class="p-5">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
      ></div>
    </div>
    <div v-else class="space-y-6">
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-lg">
            {{ $t('employer.update.title') }}
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-4">
          <div class="w-full">
            <EmployerProfileForm />
          </div>
        </CardContent>
        <CardFooter class="flex flex-wrap justify-end gap-2">
          <Button type="primary" @click="submit">
            {{ $t('common.update') }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
