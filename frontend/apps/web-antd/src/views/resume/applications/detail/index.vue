<script lang="ts" setup>
import type { OpWorkApplication, OpWorkJob } from '#/generated/client';

import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  resumeApplicationControllerFindOne,
  vacancyControllerFindOne,
} from '#/generated/client';
import { $t } from '#/locales';

defineOptions({ name: 'ResumeApplicationDetail' });

const route = useRoute();
const router = useRouter();

const application = ref<null | OpWorkApplication>(null);
const vacancy = ref<null | OpWorkJob>(null);
const loading = ref(false);

const job = computed(
  () => vacancy.value || application.value?.OpWorkJob || null,
);

const formatDate = (value?: Date | null | string) => {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleDateString();
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
  }
  return 'bg-amber-100 text-amber-800';
};

const loadVacancy = async (jobId?: string) => {
  if (!jobId) {
    vacancy.value = application.value?.OpWorkJob || null;
    return;
  }

  try {
    const response = await vacancyControllerFindOne({
      path: { job_id: jobId },
    });
    vacancy.value = response.data || application.value?.OpWorkJob || null;
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    vacancy.value = application.value?.OpWorkJob || null;
  }
};

const loadData = async () => {
  const id = route.params.id as string;
  if (!id) {
    application.value = null;
    vacancy.value = null;
    return;
  }

  loading.value = true;

  try {
    const response = await resumeApplicationControllerFindOne({
      path: { application_id: id },
    });

    application.value = response.data || null;

    if (!application.value) {
      vacancy.value = null;
      return;
    }

    await loadVacancy(application.value.jobId);
  } catch (error) {
    console.error('Error fetching application:', error);
    application.value = null;
    vacancy.value = null;
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.id,
  () => {
    loadData();
  },
  { immediate: true },
);
</script>

<template>
  <div class="p-5">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
      ></div>
    </div>
    <div
      v-else-if="!application"
      class="rounded-lg bg-white p-10 text-center text-gray-500 shadow"
    >
      {{ $t('resume.detail.notFound') }}
    </div>
    <div v-else class="mx-auto max-w-[1600px] space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button
          class="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          type="button"
          @click="router.push('/resume/applications')"
        >
          {{ $t('common.pagination.prev') }}
        </button>
        <button
          v-if="job?.id"
          class="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
          type="button"
          @click="router.push(`/vacancy/${job.id}`)"
        >
          {{ $t('resource.name.OpWorkJob') }}
        </button>
      </div>

      <div
        class="items-start gap-4 xl:grid xl:grid-cols-[minmax(0,1.9fr)_360px]"
      >
        <div class="space-y-4">
          <div
            class="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 shadow-sm"
          >
            <div class="p-5 md:p-6">
              <div
                class="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-start md:justify-between"
              >
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700"
                  >
                    {{ $t('resource.name.OpWorkApplication') }}
                  </p>
                  <h1
                    class="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
                  >
                    {{ job?.title || $t('resource.name.OpWorkJob') }}
                  </h1>
                  <p class="mt-2 text-base text-slate-600">
                    {{ job?.location || $t('common.notSpecified') }}
                  </p>
                </div>
                <span
                  class="inline-flex items-center self-start rounded-full px-3 py-1 text-sm font-semibold shadow-sm"
                  :class="getApplicationStatusClass(application.status)"
                >
                  {{ $t('resource.OpWorkApplication.status') }}:
                  {{ getApplicationStatusLabel(application.status) }}
                </span>
              </div>

              <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div
                  class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkApplication.appliedAt') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-slate-900">
                    {{
                      formatDate(application.appliedAt) ||
                      $t('common.notSpecified')
                    }}
                  </p>
                </div>

                <div
                  class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkJob.employmentType') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-slate-900">
                    {{
                      job?.employmentType
                        ? $t(
                            `resource.OpWorkEmploymentType.${job.employmentType}`,
                          )
                        : $t('common.notSpecified')
                    }}
                  </p>
                </div>

                <div
                  class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkJob.experienceLevel') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-slate-900">
                    {{
                      job?.experienceLevel
                        ? $t(
                            `resource.OpWorkExperienceLevel.${job.experienceLevel}`,
                          )
                        : $t('common.notSpecified')
                    }}
                  </p>
                </div>

                <div
                  class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('common.filter.salary') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-emerald-700">
                    <template v-if="job?.salaryMin && job?.salaryMax">
                      ${{ job.salaryMin.toLocaleString() }} - ${{
                        job.salaryMax.toLocaleString()
                      }}
                      {{ job.salaryCurrency }}
                    </template>
                    <template v-else-if="job?.salaryMin">
                      {{ $t('common.filter.from') }}
                      ${{ job.salaryMin.toLocaleString() }}
                      {{ job.salaryCurrency }}
                    </template>
                    <template v-else-if="job?.salaryMax">
                      {{ $t('common.filter.upTo') }}
                      ${{ job.salaryMax.toLocaleString() }}
                      {{ job.salaryCurrency }}
                    </template>
                    <template v-else>{{ $t('common.notSpecified') }}</template>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid items-start gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
          >
            <div
              class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.name.OpWorkApplication') }}
                  </p>
                  <h2 class="mt-2 text-lg font-semibold text-slate-900">
                    {{ $t('resource.name.OpWorkApplication') }}
                  </h2>
                </div>
                <span
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {{ getApplicationStatusLabel(application.status) }}
                </span>
              </div>

              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkApplication.statusUpdatedAt') }}
                  </p>
                  <p class="mt-1 text-sm font-medium text-slate-900">
                    {{
                      formatDate(application.statusUpdatedAt) ||
                      $t('common.notSpecified')
                    }}
                  </p>
                </div>

                <div
                  v-if="application.resumeUrl || application.portfolioUrl"
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.name.OpWorkJobSeeker') }}
                  </p>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <a
                      v-if="application.resumeUrl"
                      :href="application.resumeUrl"
                      class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ $t('resource.OpWorkApplication.resumeUrl') }}
                    </a>
                    <a
                      v-if="application.portfolioUrl"
                      :href="application.portfolioUrl"
                      class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ $t('resource.OpWorkApplication.portfolioUrl') }}
                    </a>
                  </div>
                </div>
              </div>

              <div
                v-if="application.coverLetter"
                class="mt-4 rounded-2xl bg-indigo-50 p-4 ring-1 ring-indigo-100"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700"
                >
                  {{ $t('resource.OpWorkApplication.coverLetter') }}
                </p>
                <p
                  class="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700"
                >
                  {{ application.coverLetter }}
                </p>
              </div>

              <div
                v-if="application.statusNotes"
                class="mt-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700"
                >
                  {{ $t('resource.OpWorkApplication.statusNotes') }}
                </p>
                <p
                  class="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700"
                >
                  {{ application.statusNotes }}
                </p>
              </div>
            </div>

            <div
              class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.name.OpWorkJob') }}
                  </p>
                  <h2 class="mt-2 text-lg font-semibold text-slate-900">
                    {{ job?.title || $t('resource.name.OpWorkJob') }}
                  </h2>
                </div>
                <button
                  v-if="job?.id"
                  type="button"
                  class="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  @click="router.push(`/vacancy/${job.id}`)"
                >
                  {{ $t('resource.name.OpWorkJob') }}
                </button>
              </div>

              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkJob.department') }}
                  </p>
                  <p class="mt-1 text-sm font-medium text-slate-900">
                    {{ job?.department || $t('common.notSpecified') }}
                  </p>
                </div>

                <div
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('common.location') }}
                  </p>
                  <p class="mt-1 text-sm font-medium text-slate-900">
                    {{ job?.location || $t('common.notSpecified') }}
                  </p>
                </div>

                <div
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('common.filter.published') }}
                  </p>
                  <p class="mt-1 text-sm font-medium text-slate-900">
                    {{
                      formatDate(job?.publishedAt) || $t('common.notSpecified')
                    }}
                  </p>
                </div>

                <div
                  class="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkJob.expiresAt') }}
                  </p>
                  <p class="mt-1 text-sm font-medium text-slate-900">
                    {{
                      formatDate(job?.expiresAt) || $t('common.notSpecified')
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div
              class="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  {{ $t('resource.name.OpWorkJob') }}
                </p>
                <h2 class="mt-2 text-lg font-semibold text-slate-900">
                  {{ job?.title || $t('resource.name.OpWorkJob') }}
                </h2>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {{
                    job?.employmentType
                      ? $t(
                          `resource.OpWorkEmploymentType.${job.employmentType}`,
                        )
                      : $t('common.notSpecified')
                  }}
                </span>
                <span
                  class="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                >
                  {{
                    job?.experienceLevel
                      ? $t(
                          `resource.OpWorkExperienceLevel.${job.experienceLevel}`,
                        )
                      : $t('common.notSpecified')
                  }}
                </span>
              </div>
            </div>

            <div
              class="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
            >
              <div>
                <h3 class="text-base font-semibold text-slate-900">
                  {{ $t('resource.OpWorkJob.description') }}
                </h3>
                <p
                  class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700"
                >
                  {{ job?.description || $t('common.notSpecified') }}
                </p>
              </div>

              <div class="grid gap-4">
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <h3 class="text-base font-semibold text-slate-900">
                    {{ $t('resource.OpWorkJob.requirements') }}
                  </h3>
                  <p
                    class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700"
                  >
                    {{ job?.requirements || $t('common.notSpecified') }}
                  </p>
                </div>

                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <h3 class="text-base font-semibold text-slate-900">
                    {{ $t('resource.OpWorkJob.responsibilities') }}
                  </h3>
                  <p
                    class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700"
                  >
                    {{ job?.responsibilities || $t('common.notSpecified') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 xl:sticky xl:top-5">
          <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('vacancy.detail.compensation') }}
            </h2>
            <div class="space-y-3 text-sm text-gray-700">
              <p v-if="job?.salaryMin || job?.salaryMax || job?.salaryCurrency">
                {{ $t('common.filter.salary') }}:
                <span class="font-medium text-slate-900">
                  <template v-if="job?.salaryMin && job?.salaryMax">
                    ${{ job.salaryMin.toLocaleString() }} - ${{
                      job.salaryMax.toLocaleString()
                    }}
                    {{ job.salaryCurrency }}
                  </template>
                  <template v-else-if="job?.salaryMin">
                    {{ $t('common.filter.from') }}
                    ${{ job.salaryMin.toLocaleString() }}
                    {{ job.salaryCurrency }}
                  </template>
                  <template v-else-if="job?.salaryMax">
                    {{ $t('common.filter.upTo') }}
                    ${{ job.salaryMax.toLocaleString() }}
                    {{ job.salaryCurrency }}
                  </template>
                </span>
              </p>
              <p>
                {{ $t('resource.OpWorkJob.isRemote') }}:
                <span class="font-medium text-slate-900">
                  {{ job?.isRemote ? $t('common.yes') : $t('common.no') }}
                </span>
              </p>
            </div>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resource.OpWorkApplication.status') }}
            </h2>
            <p class="text-sm leading-6 text-gray-700">
              {{ getApplicationStatusLabel(application.status) }}
            </p>
            <p
              v-if="application.statusUpdatedAt"
              class="mt-2 text-xs text-slate-500"
            >
              {{ $t('resource.OpWorkApplication.statusUpdatedAt') }}:
              {{ formatDate(application.statusUpdatedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
