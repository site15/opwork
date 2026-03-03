<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useVbenForm } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  employeJobControllerSetJob,
  vacancyControllerFindOne,
} from '#/generated/client';

import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardFooter from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardFooter.vue';
import CardHeader from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardHeader.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';
import { useOpWorkJobFormSchema } from './OpWorkJobData';

defineOptions({ name: 'VacancyCreateOrUpdate' });

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const currentFilters = ref<{ id?: string }>();

const loadVacany = () => {
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
          expiresAt: response.data?.expiresAt
            ? dayjs(response.data.expiresAt)
            : undefined,
          publishedAt: response.data?.publishedAt
            ? dayjs(response.data.publishedAt)
            : undefined,
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
  wrapperClass: 'grid grid-cols-1 md:grid-cols-4 gap-2',
  schema: useOpWorkJobFormSchema(),
  showDefaultActions: false,
});

const submit = async () => {
  const { valid } = await formApi.validate();
  if (!valid) return;
  const values = await formApi.getValues();

  employeJobControllerSetJob({
    body: {
      id: currentFilters.value?.id,
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
      publishedAt: values.publishedAt,
      expiresAt: values.expiresAt,
    },
  })
    .then((data) => {
      if (data.error) {
        throw new Error((data.error as any)?.message || 'Unknown error');
      }
      router.push({ path: `/vacancy/${data.data.id}` });
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
  loadVacany();
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
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-lg">
            {{
              currentFilters?.id
                ? $t('vacancy.update.title')
                : $t('vacancy.create.title')
            }}
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-4">
          <div class="w-full">
            <Form />
          </div>
        </CardContent>
        <CardFooter class="flex flex-wrap justify-end gap-2">
          <button
            class="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            @click="submit"
          >
            {{ currentFilters?.id ? $t('common.update') : $t('common.create') }}
          </button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
