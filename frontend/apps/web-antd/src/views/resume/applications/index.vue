<script lang="ts" setup>
import type { VacancySearchFilterFormType } from './VacancySearchData';

import type {
  OpWorkJob,
  ResumeApplicationControllerFindManyData,
} from '#/generated/client';

import { onMounted, ref } from 'vue';

import { resumeApplicationControllerFindMany } from '#/generated/client';

import VacancySearchFilterForm from './VacancySearchFilterForm.vue';
import VacancySearchList from './VacancySearchList.vue';

defineOptions({ name: 'VacancyApplications' });

const vacancies = ref<OpWorkJob[]>([]);
const loading = ref(false);
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

const currentFilters = ref<ResumeApplicationControllerFindManyData['query']>({
  curPage: 1,
  perPage: 5,
  sort: '',
});

const handleSearch = (filters: VacancySearchFilterFormType) => {
  console.log('handleSearch', filters);
  currentFilters.value = {
    searchText: filters.searchText,
    opWorkApplicationStatuses: [filters.status],
    curPage: 1, // Reset to first page when applying new filters
    perPage: pagination.value.pageSize,
  };

  performSearch();
};

const performSearch = () => {
  loading.value = true;

  resumeApplicationControllerFindMany({ query: currentFilters.value })
    .then((response) => {
      vacancies.value =
        response.data?.items.flatMap((item) =>
          item.OpWorkJob ? [item.OpWorkJob] : [],
        ) || [];
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
    <div class="flex flex-col lg:flex-row">
      <div class="mb-4 mr-4 w-full lg:mb-0 lg:w-1/5">
        <VacancySearchFilterForm
          :title="$t('common.filter.title')"
          @search="handleSearch"
        />
      </div>
      <div class="w-full lg:w-4/5">
        <VacancySearchList
          :items="vacancies"
          :loading="loading"
          :pagination="pagination"
          @page-change="handlePageChange"
          @sort-change="handleSortChange"
          :title="$t('resume.application.title')"
        />
      </div>
    </div>
  </div>
</template>
