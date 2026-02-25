<script setup lang="ts">
import type { OpWorkJob } from '#/generated/client';

import { reactive } from 'vue';

import { $t } from '#/locales';

import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardHeader from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardHeader.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';

interface Props {
  items?: OpWorkJob[];
  title: string;
  loading?: boolean;
  pagination?: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}

interface Emits {
  (e: 'pageChange', page: number, pageSize: number): void;
  (
    e: 'sortChange',
    sortInfo: {
      applicationsCount?: string;
      publishedAt?: string;
      salary?: string;
    },
  ): void;
}

defineOptions({
  name: 'VacancySearchList',
});

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: false,
  pagination: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }),
});

const emit = defineEmits<Emits>();

// Reactive form for sorting
const sortForm = reactive({
  salary: '',
  publishedAt: '',
  applicationsCount: '',
});

const handleSortChange = () => {
  // Emit all sort fields together
  emit('sortChange', { ...sortForm });
};

const handlePageChange = (page: number) => {
  emit('pageChange', page, props.pagination.pageSize);
};
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center"
    >
      <div>
        <CardTitle class="text-lg">
          {{ title }} ({{ pagination.total }})
        </CardTitle>
      </div>
      <div class="flex flex-wrap gap-2">
        <div class="flex items-center gap-1">
          <label class="text-sm font-medium text-gray-700">Salary:</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.salary"
            @change="handleSortChange"
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div class="flex items-center gap-1">
          <label class="text-sm font-medium text-gray-700">Published:</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.publishedAt"
            @change="handleSortChange"
          >
            <option value="">None</option>
            <option value="asc">Old to New</option>
            <option value="desc">New to Old</option>
          </select>
        </div>

        <div class="flex items-center gap-1">
          <label class="text-sm font-medium text-gray-700">Apps:</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.applicationsCount"
            @change="handleSortChange"
          >
            <option value="">None</option>
            <option value="asc">Few to Many</option>
            <option value="desc">Many to Few</option>
          </select>
        </div>
      </div>
    </CardHeader>
    <CardContent class="flex flex-wrap p-5 pt-0">
      <div v-if="loading" class="w-full py-10 text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
        ></div>
        <p class="mt-2 text-sm text-gray-500">Loading vacancies...</p>
      </div>
      <div v-else-if="items.length === 0" class="w-full py-10 text-center">
        <p class="text-sm text-gray-500">No vacancies found</p>
      </div>
      <ul v-else class="w-full divide-y divide-border" role="list">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex cursor-pointer justify-between gap-x-6 py-5 transition-colors hover:bg-gray-50"
        >
          <div class="flex min-w-0 flex-1 items-center gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-base font-semibold leading-6 text-foreground">
                {{ item.title }}
              </p>
              <div
                class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500"
              >
                <span
                  class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  {{
                    $t(`resource.OpWorkEmploymentType.${item.employmentType}`)
                  }}
                </span>
                <span
                  class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                >
                  {{
                    $t(`resource.OpWorkExperienceLevel.${item.experienceLevel}`)
                  }}
                </span>
                <span
                  v-if="item.salaryMin || item.salaryMax"
                  class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
                >
                  <template v-if="item.salaryMin && item.salaryMax">
                    ${{ item.salaryMin.toLocaleString() }} - ${{
                      item.salaryMax.toLocaleString()
                    }}
                    {{ item.salaryCurrency }}
                  </template>
                  <template v-else-if="item.salaryMin">
                    From ${{ item.salaryMin.toLocaleString() }}
                    {{ item.salaryCurrency }}
                  </template>
                  <template v-else-if="item.salaryMax">
                    Up to ${{ item.salaryMax.toLocaleString() }}
                    {{ item.salaryCurrency }}
                  </template>
                </span>
                <span
                  v-if="item.location"
                  class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                >
                  {{ item.location }}
                </span>
                <span
                  v-if="item.isRemote"
                  class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                >
                  Remote
                </span>
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <p
                class="mt-2 truncate text-sm leading-5 text-foreground/80 *:text-primary"
                v-html="item.description"
              ></p>
              <div class="mt-2 flex items-center gap-x-4">
                <span class="text-xs text-gray-500">
                  Published:
                  {{ new Date(item.publishedAt!).toLocaleDateString() }}
                </span>
                <span class="text-xs text-gray-500">
                  Applications: {{ item.applicationsCount }}
                </span>
                <span class="text-xs text-gray-500">
                  Views: {{ item.viewsCount }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Pagination -->
      <div
        v-if="pagination.total > 0"
        class="mt-6 flex w-full flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row"
      >
        <div class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{
            (pagination.currentPage - 1) * pagination.pageSize + 1
          }}</span>
          to
          <span class="font-medium">{{
            Math.min(
              pagination.currentPage * pagination.pageSize,
              pagination.total,
            )
          }}</span>
          of <span class="font-medium">{{ pagination.total }}</span> results
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            @click="handlePageChange(1)"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            First
          </button>

          <button
            @click="handlePageChange(Math.max(1, pagination.currentPage - 1))"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>

          <span
            class="relative inline-flex min-w-[40px] items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700"
          >
            {{ pagination.currentPage }}
          </span>

          <button
            @click="
              handlePageChange(
                Math.min(
                  Math.ceil(pagination.total / pagination.pageSize),
                  pagination.currentPage + 1,
                ),
              )
            "
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.total / pagination.pageSize)
            "
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

          <button
            @click="
              handlePageChange(
                Math.ceil(pagination.total / pagination.pageSize),
              )
            "
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.total / pagination.pageSize)
            "
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
