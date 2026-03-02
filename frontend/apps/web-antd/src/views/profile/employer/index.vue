<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useVbenForm } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  opWorkEmployerControllerCreateOne,
  opWorkEmployerControllerUpdateOne,
  vacancyControllerFindOne,
} from '#/generated/client';

import { useOpWorkEmployerFormSchema } from './OpWorkEmployerData';

defineOptions({ name: 'EmployerProfile' });

const route = useRoute();
const loading = ref(false);

const currentFilters = ref<{ id?: string }>();

const loadProfile = () => {
  if (currentFilters.value?.id) {
    loading.value = true;
    vacancyControllerFindOne({
      path: {
        vacancy_id: currentFilters.value.id,
      },
    })
      .then((response) => {
        const values = {
          ...response.data,
          createdAt: response.data?.createdAt
            ? dayjs(response.data.createdAt)
            : undefined,
          updatedAt: response.data?.updatedAt
            ? dayjs(response.data.updatedAt)
            : undefined,
        };
        formApi.setValues(values);
      })
      .catch((error) => {
        console.error('Error fetching vacancies:', error);
        formApi.setValues({});
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    formApi.setValues({});
  }
};

const [Form, formApi] = useVbenForm({
  wrapperClass: 'grid grid-cols-1 md:grid-cols-4 gap-4',
  schema: useOpWorkEmployerFormSchema(),
  showDefaultActions: false,
});

const submit = async () => {
  const { valid } = await formApi.validate();
  if (!valid) return;
  const values = await formApi.getValues();

  (currentFilters.value?.id
    ? opWorkEmployerControllerUpdateOne({
        path: { id: currentFilters.value?.id },
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
          OpWorkProfile: { connect: { id: values.profileId } },
        },
      })
    : opWorkEmployerControllerCreateOne({
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
          OpWorkProfile: { connect: { id: values.profileId } },
        },
      })
  )
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      notification.success({
        message: currentFilters.value?.id
          ? $t('actions.common.updateSuccess')
          : $t('actions.common.createSuccess'),
        description: $t('employer.detail.createSuccessDescription'),
        duration: 3000,
      });
    })
    .catch((error) => {
      notification.error({
        message: currentFilters.value?.id
          ? $t('actions.common.updateFailed')
          : $t('actions.common.createFailed'),
        description: error instanceof Error ? error.message : '',
        duration: 3000,
      });
    });
};
onMounted(() => {
  // Load initial data with empty filters
  currentFilters.value = { id: route.params.id as string };
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
    <!--div v-else-if="!formApi.getValues()" class="py-10 text-center text-gray-500">
      {{ $t('vacancy.detail.notFound') }}
    </div-->
    <div v-else class="space-y-6">
      <!-- Header Section -->
      <div class="rounded-lg bg-white p-6 shadow">
        <Form />
        <div class="flex justify-end">
          <button
            class="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            @click="submit"
          >
            {{ currentFilters?.id ? $t('common.update') : $t('common.create') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
