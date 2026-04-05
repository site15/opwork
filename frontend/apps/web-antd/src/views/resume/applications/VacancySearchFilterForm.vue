<script lang="ts" setup>
import type { VacancySearchFilterFormType } from './VacancySearchData';

import { VbenButton } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardFooter from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardFooter.vue';
import CardHeader from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardHeader.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';
import { useVacancySearchFilterFormSchema } from './VacancySearchData';

defineOptions({
  name: 'VacancySearchFilterForm',
});

withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  search: [VacancySearchFilterFormType];
}>();

const [Form, formApi] = useVbenForm({
  schema: useVacancySearchFilterFormSchema(),
  showDefaultActions: false,
  layout: 'vertical',
});

interface Props {
  title: string;
}

const handleSearch = async () => {
  const values = await formApi.getValues<VacancySearchFilterFormType>();
  emit('search', values);
};

const handleReset = async () => {
  await formApi.resetForm();
  const values = await formApi.getValues<VacancySearchFilterFormType>();
  emit('search', values);
};
</script>
<template>
  <Card>
    <CardHeader class="py-4">
      <CardTitle class="text-lg">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-4">
      <div class="w-full">
        <Form />
      </div>
    </CardContent>
    <CardFooter class="flex flex-wrap gap-2">
      <VbenButton class="mt-4" type="primary" @click="handleSearch">
        {{ $t('common.filter.search') }}
      </VbenButton>
      <VbenButton class="mt-4" @click="handleReset">
        {{ $t('common.filter.reset') }}
      </VbenButton>
    </CardFooter>
  </Card>
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
