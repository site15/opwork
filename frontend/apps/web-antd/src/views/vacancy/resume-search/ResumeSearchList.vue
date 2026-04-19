<script setup lang="ts">
import type { OpWorkJobSeeker } from '#/generated/client';

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { Button } from 'ant-design-vue';

import { $t } from '#/locales';

import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardHeader from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardHeader.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';

interface Props {
  items?: OpWorkJobSeeker[];
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
      expectedSalary?: string;
      isOpenToWork?: string;
    },
  ): void;
}

defineOptions({
  name: 'ResumeSearchList',
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
const router = useRouter();

// Reactive form for sorting
const sortForm = reactive({
  expectedSalary: '',
  isOpenToWork: '',
});

const handleSortChange = () => {
  // Emit all sort fields together
  emit('sortChange', { ...sortForm });
};

const handlePageChange = (page: number) => {
  emit('pageChange', page, props.pagination.pageSize);
};

const handleItemClick = (item: OpWorkJobSeeker) => {
  router.push(`/resume/${item.id}`);
};

const getFullName = (item: OpWorkJobSeeker) => {
  return [item.lastName, item.firstName, item.middleName]
    .filter(Boolean)
    .join(' ');
};

const formatDate = (value?: Date | null | string) => {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleDateString();
};

const getGenderLabel = (item: OpWorkJobSeeker) => {
  if (!item.gender) {
    return '';
  }
  return $t(`resource.OpWorkJobSeekerGender.${item.gender}`);
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
          <label class="text-sm font-medium text-gray-700">{{
            $t('common.filter.salary')
          }}</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.expectedSalary"
            @change="handleSortChange"
          >
            <option value="">
              {{ $t('common.filter.sort.withoutSorting') }}
            </option>
            <option value="asc">
              {{ $t('common.filter.sort.lowToHigh') }}
            </option>
            <option value="desc">
              {{ $t('common.filter.sort.highToLow') }}
            </option>
          </select>
        </div>

        <div class="flex items-center gap-1">
          <label class="text-sm font-medium text-gray-700">{{
            $t('resource.OpWorkJobSeeker.isOpenToWork')
          }}</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.isOpenToWork"
            @change="handleSortChange"
          >
            <option value="">
              {{ $t('common.filter.sort.withoutSorting') }}
            </option>
            <option value="asc">{{ $t('common.yes') }}</option>
            <option value="desc">{{ $t('common.no') }}</option>
          </select>
        </div>
      </div>
    </CardHeader>
    <CardContent class="flex flex-wrap p-5 pt-0">
      <div v-if="loading" class="w-full py-10 text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
        ></div>
        <p class="mt-2 text-sm text-gray-500">{{ $t('common.loading') }}</p>
      </div>
      <div v-else-if="items.length === 0" class="w-full py-10 text-center">
        <p class="text-sm text-gray-500">{{ $t('common.noResults') }}</p>
      </div>
      <ul v-else class="w-full divide-y divide-border" role="list">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex cursor-pointer justify-between gap-x-6 py-5 pl-5 pr-5 transition-colors hover:bg-gray-50"
          @click="handleItemClick(item)"
        >
          <div class="flex min-w-0 flex-1 items-center gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-base font-semibold leading-6 text-foreground">
                {{ item.currentPosition || $t('resume.noPosition') }}
              </p>
              <p
                v-if="getFullName(item)"
                class="mt-1 text-sm font-medium leading-5 text-slate-700"
              >
                {{ getFullName(item) }}
              </p>
              <div
                class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500"
              >
                <span
                  v-if="item.birthDate"
                  class="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800"
                >
                  {{ $t('resource.OpWorkJobSeeker.birthDate') }}:
                  {{ formatDate(item.birthDate) }}
                </span>
                <span
                  v-if="getGenderLabel(item)"
                  class="inline-flex items-center rounded-full bg-fuchsia-100 px-2.5 py-0.5 text-xs font-medium text-fuchsia-800"
                >
                  {{ $t('resource.OpWorkJobSeeker.gender') }}:
                  {{ getGenderLabel(item) }}
                </span>
                <span
                  v-if="item.currentCompany"
                  class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  {{ item.currentCompany }}
                </span>
                <span
                  v-if="item.expectedSalary || item.salaryCurrency"
                  class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
                >
                  <template v-if="item.expectedSalary && item.salaryCurrency">
                    ${{ item.expectedSalary.toLocaleString() }}
                    {{ item.salaryCurrency }}
                  </template>
                  <template v-else-if="item.expectedSalary">
                    ${{ item.expectedSalary.toLocaleString() }}
                  </template>
                </span>
                <span
                  v-if="item.preferredLocations"
                  class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                >
                  {{ item.preferredLocations }}
                </span>
                <span
                  v-if="item.isOpenToRemote"
                  class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                >
                  {{ $t('resume.remoteWork') }}
                </span>
                <span
                  v-if="item.isOpenToRelocation"
                  class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                >
                  {{ $t('resume.relocation') }}
                </span>
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <p
                class="mt-2 truncate text-sm leading-5 text-foreground/80 *:text-primary"
                v-html="item.summary"
              ></p>
              <div class="mt-2 flex items-center gap-x-4">
                <span
                  v-if="item.isOpenToWork"
                  class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                >
                  {{ $t('resume.openToWork') }}
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
          {{
            $t('common.pagination.showingFromToOfTotalResults', {
              showingFrom:
                (pagination.currentPage - 1) * pagination.pageSize + 1,
              showingTo: Math.min(
                pagination.currentPage * pagination.pageSize,
                pagination.total,
              ),
              totalResults: pagination.total,
            })
          }}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Button
            type="default"
            @click="handlePageChange(1)"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center"
          >
            {{ $t('common.pagination.first') }}
          </Button>

          <Button
            type="default"
            @click="handlePageChange(Math.max(1, pagination.currentPage - 1))"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center"
          >
            {{ $t('common.pagination.prev') }}
          </Button>

          <Button
            type="default"
            class="relative inline-flex min-w-[40px] items-center"
            :disabled="true"
          >
            {{ pagination.currentPage }}
          </Button>

          <Button
            type="default"
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
            class="relative inline-flex items-center"
          >
            {{ $t('common.pagination.next') }}
          </Button>

          <Button
            type="default"
            @click="
              handlePageChange(
                Math.ceil(pagination.total / pagination.pageSize),
              )
            "
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.total / pagination.pageSize)
            "
            class="relative inline-flex items-center"
          >
            {{ $t('common.pagination.last') }}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
