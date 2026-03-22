<script setup lang="ts">
import type { OpWorkJob } from '#/generated/client';

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { confirm } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { employeJobControllerDelJob } from '#/generated/client';
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
  (e: 'deleted', id: string): void;
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
  name: 'VacancyMyList',
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
  salary: '',
  publishedAt: '',
  applicationsCount: '',
});

const handleDelete = (id: string) => {
  emit('deleted', id);
};

const handleSortChange = () => {
  // Emit all sort fields together
  emit('sortChange', { ...sortForm });
};

const handlePageChange = (page: number) => {
  emit('pageChange', page, props.pagination.pageSize);
};

const handleItemClick = (item: OpWorkJob) => {
  router.push(`/vacancy/${item.id}`);
};

const handleCreateClick = (event: Event) => {
  // Prevent the parent click handler from triggering
  event.stopPropagation();
  router.push(`/vacancy/create`);
};

const handleEditClick = (item: OpWorkJob, event: Event) => {
  // Prevent the parent click handler from triggering
  event.stopPropagation();
  router.push(`/vacancy/${item.id}/edit`);
};

const handleDeleteClick = (item: OpWorkJob, event: Event) => {
  // Prevent the parent click handler from triggering
  event.stopPropagation();

  confirm(
    $t('common.confirm'),
    $t('common.deleteConfirm', { name: item.title }),
  )
    .then(async () => {
      await employeJobControllerDelJob({ body: { id: item.id } });
      handleDelete(item.id);
    })
    .then();
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
            v-model="sortForm.salary"
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
            $t('common.filter.published')
          }}</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.publishedAt"
            @change="handleSortChange"
          >
            <option value="">
              {{ $t('common.filter.sort.withoutSorting') }}
            </option>
            <option value="asc">{{ $t('common.filter.sort.oldToNew') }}</option>
            <option value="desc">
              {{ $t('common.filter.sort.newToOld') }}
            </option>
          </select>
        </div>

        <div class="flex items-center gap-1">
          <label class="text-sm font-medium text-gray-700">{{
            $t('common.filter.apps')
          }}</label>
          <select
            class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            v-model="sortForm.applicationsCount"
            @change="handleSortChange"
          >
            <option value="">
              {{ $t('common.filter.sort.withoutSorting') }}
            </option>
            <option value="asc">
              {{ $t('common.filter.sort.fewToMany') }}
            </option>
            <option value="desc">
              {{ $t('common.filter.sort.manyToFew') }}
            </option>
          </select>
        </div>

        <!--кнопка добавления-->
        <Button type="primary" @click="handleCreateClick($event)">
          {{ $t('common.add') }}
        </Button>
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
                    {{ $t('common.filter.from') }} ${{
                      item.salaryMin.toLocaleString()
                    }}
                    {{ item.salaryCurrency }}
                  </template>
                  <template v-else-if="item.salaryMax">
                    {{ $t('common.filter.upTo') }} ${{
                      item.salaryMax.toLocaleString()
                    }}
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
                  {{ $t('vacancy.remoteWork') }}
                </span>
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <!--tags-->
              <div
                v-if="item.opWorkJobTags && item.opWorkJobTags.length > 0"
                class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500"
              >
                <span
                  class="truncate text-sm leading-5 text-foreground/80 *:text-primary"
                  >{{ $t('vacancy.tags') }}</span
                >:
                <span
                  v-for="tag in item.opWorkJobTags || []"
                  :key="tag.id"
                  class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  :style="{ backgroundColor: tag.color }"
                >
                  {{ tag.name }}
                </span>
              </div>
              <!--skills-->
              <div
                v-if="item.OpWorkJobSkill && item.OpWorkJobSkill.length > 0"
                class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500"
              >
                <span
                  class="truncate text-sm leading-5 text-foreground/80 *:text-primary"
                  >{{ $t('vacancy.skills') }}</span
                >:
                <span
                  v-for="skill in item.OpWorkJobSkill.flatMap((op) =>
                    op.OpWorkSkill ? [op.OpWorkSkill] : [],
                  ) || []"
                  :key="skill.id"
                  class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  {{ skill.name }}
                </span>
              </div>
              <p
                class="mt-2 truncate text-sm leading-5 text-foreground/80 *:text-primary"
                v-html="item.description"
              ></p>
              <div class="mt-2 flex items-center gap-x-4">
                <span class="text-xs text-gray-500">
                  {{ $t('common.filter.published') }}:
                  {{ new Date(item.publishedAt!).toLocaleDateString() }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ $t('common.filter.apps') }}: {{ item.applicationsCount }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ $t('common.filter.views') }}: {{ item.viewsCount }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-x-4">
            <Button type="primary" @click="handleEditClick(item, $event)">
              {{ $t('common.edit') }}
            </Button>
            <Button type="default" @click="handleDeleteClick(item, $event)">
              {{ $t('common.delete') }}
            </Button>
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
