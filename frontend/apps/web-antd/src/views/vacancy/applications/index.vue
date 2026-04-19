<script lang="ts" setup>
import type { ResumeSearchFilterFormType } from './ResumeSearchData';

import type {
  OpWorkApplication,
  ResumeApplicationControllerFindManyData,
} from '#/generated/client';

import { onMounted, ref } from 'vue';

import { vacanyApplicationControllerFindMany } from '#/generated/client';

import ResumeSearchFilterForm from './ResumeSearchFilterForm.vue';
import ResumeSearchList from './ResumeSearchList.vue';

defineOptions({ name: 'ResumeApplications' });

const resumes = ref<OpWorkApplication[]>([]);
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

const handleSearch = (filters: ResumeSearchFilterFormType) => {
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

  vacanyApplicationControllerFindMany({ query: currentFilters.value })
    .then((response) => {
      resumes.value = response.data?.items || [];
      pagination.value.total = response.data?.meta?.totalResults || 0;
      pagination.value.currentPage = response.data?.meta?.curPage || 1;
    })
    .catch((error) => {
      console.error('Error fetching resumes:', error);
      resumes.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleSortChange = (sortInfo: {
  expectedSalary?: string;
  isOpenToWork?: string;
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
    <div class="mx-auto max-w-[1600px]">
      <div
        class="flex flex-col gap-4 xl:grid xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start"
      >
        <div class="w-full">
          <ResumeSearchFilterForm
            :title="$t('common.filter.title')"
            @search="handleSearch"
          />
        </div>
        <div class="min-w-0">
          <ResumeSearchList
            :items="resumes"
            :loading="loading"
            :pagination="pagination"
            @page-change="handlePageChange"
            @sort-change="handleSortChange"
            :title="$t('vacancy.application.title')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
