<script setup lang="ts">
import type { OpWorkApplication } from '#/generated/client';

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { Button } from 'ant-design-vue';

import { $t } from '#/locales';

import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardHeader from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardHeader.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';

interface Props {
  items?: OpWorkApplication[];
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

const sortForm = reactive({
  expectedSalary: '',
  isOpenToWork: '',
});

const handleSortChange = () => {
  emit('sortChange', { ...sortForm });
};

const handlePageChange = (page: number) => {
  emit('pageChange', page, props.pagination.pageSize);
};

const handleItemClick = (item: OpWorkApplication) => {
  if (!item.id) {
    return;
  }
  router.push(`/vacancy/applications/${item.id}`);
};

const formatDate = (value?: Date | null | string) => {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleDateString();
};

const getFullName = (item: OpWorkApplication) => {
  const seeker = item.OpWorkJobSeeker;
  if (!seeker) {
    return '';
  }

  return [seeker.lastName, seeker.firstName, seeker.middleName]
    .filter(Boolean)
    .join(' ');
};

const getGenderLabel = (item: OpWorkApplication) => {
  const gender = item.OpWorkJobSeeker?.gender;
  if (!gender) {
    return '';
  }

  return $t(`resource.OpWorkJobSeekerGender.${gender}`);
};

const getApplicationStatusLabel = (status?: string) => {
  if (!status) {
    return '';
  }
  return $t(`resource.OpWorkApplicationStatus.${status}`).split(' - ')[0];
};

const getApplicationStatusClass = (status?: string) => {
  switch (status) {
    case 'INTERVIEW': {
      return 'bg-violet-100 text-violet-800';
    }
    case 'OFFER': {
      return 'bg-emerald-100 text-emerald-800';
    }
    case 'REJECTED': {
      return 'bg-red-100 text-red-800';
    }
    case 'REVIEWED': {
      return 'bg-blue-100 text-blue-800';
    }
    case 'SHORTLISTED': {
      return 'bg-cyan-100 text-cyan-800';
    }
    case 'WITHDRAWN': {
      return 'bg-gray-200 text-gray-700';
    }
    default: {
      return 'bg-amber-100 text-amber-800';
    }
  }
};

const formatExpectedSalary = (item: OpWorkApplication) => {
  const seeker = item.OpWorkJobSeeker;

  if (!seeker?.expectedSalary) {
    return '';
  }

  return `$${seeker.expectedSalary.toLocaleString()} ${seeker.salaryCurrency || ''}`.trim();
};
</script>

<template>
  <Card class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
    <CardHeader
      class="flex flex-col items-start justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-white via-slate-50 to-sky-50 py-5 sm:flex-row sm:items-center"
    >
      <div>
        <CardTitle class="text-lg text-slate-900">
          {{ title }} ({{ pagination.total }})
        </CardTitle>
        <p class="mt-1 text-sm text-slate-500">
          {{ $t('vacancy.application.title') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-600">{{
            $t('common.filter.salary')
          }}</label>
          <select
            v-model="sortForm.expectedSalary"
            class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
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

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-600">{{
            $t('resource.OpWorkJobSeeker.isOpenToWork')
          }}</label>
          <select
            v-model="sortForm.isOpenToWork"
            class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
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

    <CardContent class="flex flex-wrap p-5">
      <div v-if="loading" class="w-full py-10 text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
        ></div>
        <p class="mt-2 text-sm text-gray-500">{{ $t('common.loading') }}</p>
      </div>

      <div v-else-if="items.length === 0" class="w-full py-10 text-center">
        <p class="text-sm text-gray-500">{{ $t('common.noResults') }}</p>
      </div>

      <ul v-else class="w-full space-y-4" role="list">
        <li
          v-for="item in items"
          :key="item.id"
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
          @click="handleItemClick(item)"
        >
          <div class="min-w-0 p-5 md:p-6">
            <div
              class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
            >
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-lg font-semibold leading-7 text-slate-900">
                    {{
                      item.OpWorkJobSeeker?.currentPosition ||
                      $t('resume.noPosition')
                    }}
                  </p>
                  <span
                    v-if="item.OpWorkJob?.title"
                    class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {{ item.OpWorkJob?.title }}
                  </span>
                </div>

                <div
                  class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600"
                >
                  <span
                    v-if="getFullName(item)"
                    class="font-medium text-slate-700"
                  >
                    {{ getFullName(item) }}
                  </span>
                  <span
                    v-if="
                      getFullName(item) && item.OpWorkJobSeeker?.currentCompany
                    "
                    class="text-slate-400"
                  >
                    •
                  </span>
                  <span v-if="item.OpWorkJobSeeker?.currentCompany">
                    {{ item.OpWorkJobSeeker?.currentCompany }}
                  </span>
                  <span
                    v-if="item.OpWorkJobSeeker?.preferredLocations"
                    class="text-slate-400"
                  >
                    •
                  </span>
                  <span v-if="item.OpWorkJobSeeker?.preferredLocations">
                    {{ item.OpWorkJobSeeker?.preferredLocations }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 lg:justify-end">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="getApplicationStatusClass(item.status)"
                >
                  {{ getApplicationStatusLabel(item.status) }}
                </span>
                <span
                  v-if="formatExpectedSalary(item)"
                  class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  {{ formatExpectedSalary(item) }}
                </span>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-if="
                  item.OpWorkJobSeeker?.isOpenToWork !== null &&
                  item.OpWorkJobSeeker?.isOpenToWork !== undefined
                "
                class="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
              >
                {{
                  item.OpWorkJobSeeker?.isOpenToWork
                    ? `${$t('resource.OpWorkJobSeeker.isOpenToWork')}: ${$t('common.yes')}`
                    : `${$t('resource.OpWorkJobSeeker.isOpenToWork')}: ${$t('common.no')}`
                }}
              </span>
              <span
                v-if="item.OpWorkJobSeeker?.isOpenToRemote"
                class="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
              >
                {{ $t('resume.remoteWork') }}
              </span>
              <span
                v-if="item.OpWorkJobSeeker?.isOpenToRelocation"
                class="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700"
              >
                {{ $t('resume.relocation') }}
              </span>
              <span
                v-if="item.appliedAt"
                class="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
              >
                {{ $t('resource.OpWorkApplication.appliedAt') }}:
                {{ formatDate(item.appliedAt) }}
              </span>
            </div>

            <div
              class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            >
              <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div class="flex items-center justify-between gap-3">
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.name.OpWorkJobSeeker') }}
                  </p>
                  <span
                    v-if="item.statusUpdatedAt"
                    class="text-xs text-slate-500"
                  >
                    {{ formatDate(item.statusUpdatedAt) }}
                  </span>
                </div>

                <!-- eslint-disable vue/no-v-html -->
                <p
                  class="mt-3 line-clamp-3 text-sm leading-6 text-slate-700 *:text-primary"
                  v-html="item.OpWorkJobSeeker?.summary || ''"
                ></p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-if="item.OpWorkJobSeeker?.birthDate"
                    class="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700"
                  >
                    {{ $t('resource.OpWorkJobSeeker.birthDate') }}:
                    {{ formatDate(item.OpWorkJobSeeker?.birthDate) }}
                  </span>
                  <span
                    v-if="getGenderLabel(item)"
                    class="inline-flex items-center rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700"
                  >
                    {{ $t('resource.OpWorkJobSeeker.gender') }}:
                    {{ getGenderLabel(item) }}
                  </span>
                  <a
                    v-if="item.OpWorkJobSeeker?.linkedinUrl"
                    :href="item.OpWorkJobSeeker?.linkedinUrl"
                    class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    LinkedIn
                  </a>
                  <a
                    v-if="item.OpWorkJobSeeker?.githubUrl"
                    :href="item.OpWorkJobSeeker?.githubUrl"
                    class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    GitHub
                  </a>
                  <a
                    v-if="item.OpWorkJobSeeker?.portfolioUrl"
                    :href="item.OpWorkJobSeeker?.portfolioUrl"
                    class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    {{ $t('resource.OpWorkJobSeeker.portfolioUrl') }}
                  </a>
                </div>
              </div>

              <div class="rounded-2xl bg-sky-50/70 p-4 ring-1 ring-sky-200">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700"
                >
                  {{ $t('resource.name.OpWorkApplication') }}
                </p>

                <div class="mt-3 grid gap-3 text-sm text-slate-700">
                  <div class="grid gap-1 sm:grid-cols-2">
                    <p v-if="item.appliedAt">
                      {{ $t('resource.OpWorkApplication.appliedAt') }}:
                      <span class="font-medium text-slate-900">
                        {{ formatDate(item.appliedAt) }}
                      </span>
                    </p>
                    <p v-if="item.statusUpdatedAt">
                      {{ $t('resource.OpWorkApplication.statusUpdatedAt') }}:
                      <span class="font-medium text-slate-900">
                        {{ formatDate(item.statusUpdatedAt) }}
                      </span>
                    </p>
                  </div>

                  <p
                    v-if="item.coverLetter"
                    class="line-clamp-2 rounded-xl bg-white/80 px-3 py-2 text-sm ring-1 ring-sky-100"
                  >
                    {{ $t('resource.OpWorkApplication.coverLetter') }}:
                    {{ item.coverLetter }}
                  </p>

                  <p
                    v-if="item.statusNotes"
                    class="line-clamp-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-100"
                  >
                    {{ $t('resource.OpWorkApplication.statusNotes') }}:
                    {{ item.statusNotes }}
                  </p>

                  <div class="flex flex-wrap gap-2">
                    <a
                      v-if="item.resumeUrl"
                      :href="item.resumeUrl"
                      class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100 transition-colors hover:bg-sky-50"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click.stop
                    >
                      {{ $t('resource.OpWorkApplication.resumeUrl') }}
                    </a>
                    <a
                      v-if="item.portfolioUrl"
                      :href="item.portfolioUrl"
                      class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100 transition-colors hover:bg-sky-50"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click.stop
                    >
                      {{ $t('resource.OpWorkApplication.portfolioUrl') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500"
            >
              <span v-if="item.OpWorkJob?.title">
                {{ $t('resource.name.OpWorkJob') }}: {{ item.OpWorkJob?.title }}
              </span>
              <span v-if="item.OpWorkJob?.location">
                {{ $t('common.location') }}: {{ item.OpWorkJob?.location }}
              </span>
            </div>
          </div>
        </li>
      </ul>

      <div
        v-if="pagination.total > 0"
        class="mt-6 flex w-full flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row"
      >
        <div class="text-sm text-slate-600">
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
            class="relative inline-flex items-center"
            :disabled="pagination.currentPage <= 1"
            @click="handlePageChange(1)"
          >
            {{ $t('common.pagination.first') }}
          </Button>

          <Button
            type="default"
            class="relative inline-flex items-center"
            :disabled="pagination.currentPage <= 1"
            @click="handlePageChange(Math.max(1, pagination.currentPage - 1))"
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
            class="relative inline-flex items-center"
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.total / pagination.pageSize)
            "
            @click="
              handlePageChange(
                Math.min(
                  Math.ceil(pagination.total / pagination.pageSize),
                  pagination.currentPage + 1,
                ),
              )
            "
          >
            {{ $t('common.pagination.next') }}
          </Button>

          <Button
            type="default"
            class="relative inline-flex items-center"
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.total / pagination.pageSize)
            "
            @click="
              handlePageChange(
                Math.ceil(pagination.total / pagination.pageSize),
              )
            "
          >
            {{ $t('common.pagination.last') }}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
