<script lang="ts" setup>
import type {
  OpWorkJob,
  VacancyControllerFindManyData,
} from '#/generated/client';

import { onMounted, ref } from 'vue';

import { vacancyControllerFindMany } from '#/generated/client';

import VacancyMyFilterForm from './VacancyMyFilterForm.vue';
import VacancyMyList from './VacancyMyList.vue';

defineOptions({ name: 'VacancyMy' });

const vacancies = ref<OpWorkJob[]>([]);
const loading = ref(false);
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

const currentFilters = ref<VacancyControllerFindManyData['query']>({
  curPage: 1,
  perPage: 5,
  sort: '',
});

const handleSearch = (filters: VacancyControllerFindManyData['query']) => {
  currentFilters.value = {
    ...filters,
    curPage: 1, // Reset to first page when applying new filters
    perPage: pagination.value.pageSize,
  };

  performSearch();
};

const performSearch = () => {
  loading.value = true;

  vacancyControllerFindMany({ query: currentFilters.value })
    .then((response) => {
      vacancies.value = response.data?.items || [];
      pagination.value.total = response.data?.meta?.totalResults || 0;
      pagination.value.currentPage = response.data?.meta?.curPage || 1;
    })
    .catch((error) => {
      console.error('Error fetching vacancies:', error);
      vacancies.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleSortChange = (sortInfo: {
  applicationsCount?: string;
  publishedAt?: string;
  salary?: string;
}) => {
  if (currentFilters.value) {
    currentFilters.value.sort = Object.keys(sortInfo)
      .map(
        (key) => key + ((sortInfo as any)[key] === 'desc' ? ':desc' : ':asc'),
      )
      .join(',');
  }
  if (currentFilters.value) {
    currentFilters.value.curPage = 1;
  }

  performSearch();
};

const handlePageChange = (page: number, pageSize: number) => {
  if (currentFilters.value) {
    currentFilters.value.curPage = page;
    currentFilters.value.perPage = pageSize;
  }

  performSearch();
};

onMounted(() => {
  // Load initial data with empty filters
  performSearch();
});
</script>

<template>
  <div class="p-5">
    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mb-4 mr-4 w-full lg:mb-0 lg:w-1/5">
        <VacancyMyFilterForm
          :title="$t('common.filter.title')"
          @search="handleSearch"
        />
      </div>
      <div class="w-full lg:w-4/5">
        <VacancyMyList
          :items="vacancies"
          :loading="loading"
          :pagination="pagination"
          @page-change="handlePageChange"
          @sort-change="handleSortChange"
          @deleted="performSearch"
          :title="$t('vacancy.my.list.title')"
        />
      </div>
    </div>
  </div>
</template>
