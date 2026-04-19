<script lang="ts" setup>
import type {
  OpWorkApplication,
  OpWorkApplicationStatus,
  OpWorkJobSeeker,
} from '#/generated/client';

import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  jobSeekerControllerGetProfile,
  vacanyApplicationControllerChangeStatus,
  vacanyApplicationControllerFindOne,
} from '#/generated/client';
import { $t } from '#/locales';

defineOptions({ name: 'VacancyApplicationDetail' });

const route = useRoute();
const router = useRouter();

const application = ref<null | OpWorkApplication>(null);
const resume = ref<null | OpWorkJobSeeker>(null);
const loading = ref(false);
const saving = ref(false);

const statusOptions: OpWorkApplicationStatus[] = [
  'PENDING',
  'REVIEWED',
  'SHORTLISTED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
];

const statusForm = reactive<{
  status: OpWorkApplicationStatus;
  statusNotes: string;
}>({
  status: 'PENDING',
  statusNotes: '',
});

const job = computed(() => application.value?.OpWorkJob || null);

const formatDate = (value?: Date | null | string) => {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleDateString();
};

const getFullName = (seeker?: null | OpWorkJobSeeker) => {
  if (!seeker) {
    return '';
  }

  return [seeker.lastName, seeker.firstName, seeker.middleName]
    .filter(Boolean)
    .join(' ');
};

const getGenderLabel = (gender?: null | string) => {
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
  }
  return 'bg-amber-100 text-amber-800';
};

const syncStatusForm = () => {
  statusForm.status = application.value?.status || 'PENDING';
  statusForm.statusNotes = application.value?.statusNotes || '';
};

const loadResume = async (jobSeekerId?: string) => {
  if (!jobSeekerId) {
    resume.value = application.value?.OpWorkJobSeeker || null;
    return;
  }

  try {
    const response = await jobSeekerControllerGetProfile({
      query: { jobSeekerId },
    });
    resume.value = response.data || application.value?.OpWorkJobSeeker || null;
  } catch (error) {
    console.error('Error fetching resume:', error);
    resume.value = application.value?.OpWorkJobSeeker || null;
  }
};

const loadData = async () => {
  const id = route.params.id as string;
  if (!id) {
    application.value = null;
    resume.value = null;
    syncStatusForm();
    return;
  }

  loading.value = true;

  try {
    const response = await vacanyApplicationControllerFindOne({
      path: { application_id: id },
    });

    application.value = response.data || null;
    syncStatusForm();

    if (!application.value) {
      resume.value = null;
      return;
    }

    await loadResume(application.value.jobSeekerId);
  } catch (error) {
    console.error('Error fetching application:', error);
    application.value = null;
    resume.value = null;
    syncStatusForm();
  } finally {
    loading.value = false;
  }
};

const handleStatusSave = async () => {
  if (!application.value) {
    return;
  }

  saving.value = true;

  try {
    await vacanyApplicationControllerChangeStatus({
      path: { application_id: application.value.id },
      body: {
        status: statusForm.status,
        statusNotes: statusForm.statusNotes || null,
      },
    });

    application.value = {
      ...application.value,
      status: statusForm.status,
      statusNotes: statusForm.statusNotes || null,
      statusUpdatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error updating application status:', error);
  } finally {
    saving.value = false;
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
          @click="router.push('/vacancy/applications')"
        >
          {{ $t('common.pagination.prev') }}
        </button>
      </div>

      <div
        class="items-start gap-4 xl:grid xl:grid-cols-[minmax(0,1.9fr)_360px]"
      >
        <div class="space-y-4">
          <div
            class="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 shadow-sm"
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
                    {{ resume?.currentPosition || $t('resume.noPosition') }}
                  </h1>
                  <p class="mt-2 text-base text-slate-600">
                    {{ job?.title || $t('resource.name.OpWorkJob') }}
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
                  class="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
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
                  class="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('common.location') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-slate-900">
                    {{ job?.location || $t('common.notSpecified') }}
                  </p>
                </div>

                <div
                  class="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
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
                      ${{ job.salaryMax.toLocaleString() }}
                      {{ job.salaryCurrency }}
                    </template>
                    <template v-else>{{ $t('common.notSpecified') }}</template>
                  </p>
                </div>

                <div
                  class="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.OpWorkApplication.statusUpdatedAt') }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-slate-900">
                    {{
                      formatDate(application.statusUpdatedAt) ||
                      $t('common.notSpecified')
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid items-start gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          >
            <div
              class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {{ $t('resource.name.OpWorkJobSeeker') }}
                  </p>
                  <h2 class="mt-2 text-lg font-semibold text-slate-900">
                    {{ resume?.currentPosition || $t('resume.noPosition') }}
                  </h2>
                </div>
              </div>

              <div class="mt-4 space-y-3 text-sm text-slate-700">
                <p v-if="getFullName(resume)">
                  {{ $t('resource.OpWorkJobSeeker.fullName') }}:
                  <span class="font-medium text-slate-900">
                    {{ getFullName(resume) }}
                  </span>
                </p>
                <p v-if="resume?.birthDate">
                  {{ $t('resource.OpWorkJobSeeker.birthDate') }}:
                  <span class="font-medium text-slate-900">
                    {{ formatDate(resume.birthDate) }}
                  </span>
                </p>
                <p v-if="resume?.gender">
                  {{ $t('resource.OpWorkJobSeeker.gender') }}:
                  <span class="font-medium text-slate-900">
                    {{ getGenderLabel(resume.gender) }}
                  </span>
                </p>
                <p v-if="resume?.currentCompany">
                  {{ $t('resource.OpWorkJobSeeker.currentCompany') }}:
                  <span class="font-medium text-slate-900">
                    {{ resume.currentCompany }}
                  </span>
                </p>
                <p v-if="resume?.expectedSalary">
                  {{ $t('resource.OpWorkJobSeeker.expectedSalary') }}:
                  <span class="font-medium text-emerald-700">
                    ${{ resume.expectedSalary.toLocaleString() }}
                    {{ resume.salaryCurrency }}
                  </span>
                </p>
                <p
                  v-if="application.resumeUrl"
                  class="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                >
                  {{ $t('resource.OpWorkApplication.resumeUrl') }}:
                  <a
                    :href="application.resumeUrl"
                    class="ml-1 break-all text-sky-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ application.resumeUrl }}
                  </a>
                </p>
                <p
                  v-if="application.portfolioUrl"
                  class="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                >
                  {{ $t('resource.OpWorkApplication.portfolioUrl') }}:
                  <a
                    :href="application.portfolioUrl"
                    class="ml-1 break-all text-sky-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ application.portfolioUrl }}
                  </a>
                </p>
                <div
                  v-if="application.coverLetter"
                  class="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-100"
                >
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700"
                  >
                    {{ $t('resource.OpWorkApplication.coverLetter') }}
                  </p>
                  <p class="mt-2 whitespace-pre-wrap leading-6 text-slate-700">
                    {{ application.coverLetter }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
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

              <div
                class="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2"
              >
                <p v-if="job?.location">
                  {{ $t('common.location') }}:
                  <span class="font-medium text-slate-900">{{
                    job.location
                  }}</span>
                </p>
                <p v-if="job?.employmentType">
                  {{ $t('resource.OpWorkJob.employmentType') }}:
                  <span class="font-medium text-slate-900">
                    {{
                      $t(`resource.OpWorkEmploymentType.${job.employmentType}`)
                    }}
                  </span>
                </p>
                <p v-if="job?.experienceLevel">
                  {{ $t('resource.OpWorkJob.experienceLevel') }}:
                  <span class="font-medium text-slate-900">
                    {{
                      $t(
                        `resource.OpWorkExperienceLevel.${job.experienceLevel}`,
                      )
                    }}
                  </span>
                </p>
              </div>

              <div
                v-if="application.statusNotes"
                class="mt-4 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700"
                >
                  {{ $t('resource.OpWorkApplication.statusNotes') }}
                </p>
                <p class="mt-2 whitespace-pre-wrap leading-6 text-slate-700">
                  {{ application.statusNotes }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="resume"
            class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold">
                  {{ $t('resume.detail.summary') }}
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  {{ resume.currentPosition || $t('resume.noPosition') }}
                </p>
              </div>
              <div class="flex flex-wrap gap-2 text-xs">
                <span
                  class="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600"
                >
                  {{ $t('resume.detail.skills') }}:
                  {{ resume.OpWorkJobSeekerSkill?.length || 0 }}
                </span>
                <span
                  class="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600"
                >
                  {{ $t('resume.detail.experience') }}:
                  {{ resume.OpWorkExperience?.length || 0 }}
                </span>
                <span
                  class="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600"
                >
                  {{ $t('resume.detail.education') }}:
                  {{ resume.OpWorkEducation?.length || 0 }}
                </span>
              </div>
            </div>
            <div class="prose max-w-none">
              {{ resume.summary || $t('common.notSpecified') }}
            </div>
          </div>

          <div
            v-if="
              resume?.OpWorkExperience && resume.OpWorkExperience.length > 0
            "
            class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <h2 class="text-lg font-semibold">
                {{ $t('resume.detail.experience') }}
              </h2>
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {{ resume.OpWorkExperience.length }}
              </span>
            </div>
            <div class="space-y-3">
              <div
                v-for="exp in resume.OpWorkExperience"
                :key="exp.id"
                class="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div
                  class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ exp.position }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ exp.company }}</p>
                  </div>
                  <p class="text-xs font-medium text-slate-500">
                    {{ formatDate(exp.startDate) }} -
                    {{
                      exp.isCurrent
                        ? $t('common.present')
                        : exp.endDate
                          ? formatDate(exp.endDate)
                          : ''
                    }}
                  </p>
                </div>
                <p
                  v-if="exp.description"
                  class="mt-3 text-sm leading-6 text-gray-700"
                >
                  {{ exp.description }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="resume?.OpWorkEducation && resume.OpWorkEducation.length > 0"
            class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <h2 class="text-lg font-semibold">
                {{ $t('resume.detail.education') }}
              </h2>
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {{ resume.OpWorkEducation.length }}
              </span>
            </div>
            <div class="space-y-3">
              <div
                v-for="edu in resume.OpWorkEducation"
                :key="edu.id"
                class="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div
                  class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ edu.institution }}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {{
                        edu.degree
                          ? $t(`resource.OpWorkEducationDegree.${edu.degree}`)
                          : ''
                      }}
                      <span v-if="edu.fieldOfStudy"
                        >- {{ edu.fieldOfStudy }}</span
                      >
                    </p>
                  </div>
                  <p class="text-xs font-medium text-slate-500">
                    {{ formatDate(edu.startDate) }} -
                    {{
                      edu.isCurrent
                        ? $t('common.present')
                        : edu.endDate
                          ? formatDate(edu.endDate)
                          : ''
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 xl:sticky xl:top-5">
          <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resource.OpWorkApplication.status') }}
            </h2>
            <div class="space-y-3">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  {{ $t('resource.OpWorkApplication.status') }}
                </label>
                <select
                  v-model="statusForm.status"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  <option
                    v-for="status in statusOptions"
                    :key="status"
                    :value="status"
                  >
                    {{ getApplicationStatusLabel(status) }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  {{ $t('resource.OpWorkApplication.statusNotes') }}
                </label>
                <textarea
                  v-model="statusForm.statusNotes"
                  rows="5"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                ></textarea>
              </div>

              <button
                type="button"
                class="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="saving"
                @click="handleStatusSave"
              >
                {{ saving ? $t('common.loading') : $t('common.save') }}
              </button>
            </div>
          </div>

          <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resume.detail.preferences') }}
            </h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToWork')
                }}</span>
                <span
                  :class="
                    resume?.isOpenToWork
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    resume?.isOpenToWork ? $t('common.yes') : $t('common.no')
                  }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToRemote')
                }}</span>
                <span
                  :class="
                    resume?.isOpenToRemote
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    resume?.isOpenToRemote ? $t('common.yes') : $t('common.no')
                  }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToRelocation')
                }}</span>
                <span
                  :class="
                    resume?.isOpenToRelocation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    resume?.isOpenToRelocation
                      ? $t('common.yes')
                      : $t('common.no')
                  }}
                </span>
              </div>
              <div
                v-if="resume?.preferredLocations"
                class="border-t border-gray-200 pt-3"
              >
                <p class="text-xs font-medium text-gray-700">
                  {{ $t('resource.OpWorkJobSeeker.preferredLocations') }}
                </p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ resume.preferredLocations }}
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resume.detail.contactInfo') }}
            </h2>
            <div v-if="resume?.OpWorkProfile" class="space-y-2">
              <div v-if="resume.OpWorkProfile.email" class="text-sm">
                <span class="font-medium text-gray-700"
                  >{{ $t('common.email') }}:</span
                >
                <a
                  :href="`mailto:${resume.OpWorkProfile.email}`"
                  class="break-all text-blue-600 hover:underline"
                >
                  {{ resume.OpWorkProfile.email }}
                </a>
              </div>
              <div v-if="resume.OpWorkProfile.phone" class="text-sm">
                <span class="font-medium text-gray-700"
                  >{{ $t('common.phone') }}:</span
                >
                <a
                  :href="`tel:${resume.OpWorkProfile.phone}`"
                  class="text-blue-600 hover:underline"
                >
                  {{ resume.OpWorkProfile.phone }}
                </a>
              </div>
              <div v-if="resume.OpWorkProfile.location" class="text-sm">
                <span class="font-medium text-gray-700"
                  >{{ $t('common.location') }}:</span
                >
                <p class="text-gray-600">{{ resume.OpWorkProfile.location }}</p>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500">
              {{ $t('common.notSpecified') }}
            </p>
          </div>

          <div
            v-if="
              resume?.OpWorkJobSeekerSkill &&
              resume.OpWorkJobSeekerSkill.length > 0
            "
            class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resume.detail.skills') }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skillItem in resume.OpWorkJobSeekerSkill"
                :key="skillItem.id"
                class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800"
              >
                {{ skillItem.OpWorkSkill?.name || skillItem.skillId }}
              </span>
            </div>
          </div>

          <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 class="mb-3 text-lg font-semibold">
              {{ $t('resume.detail.socialLinks') }}
            </h2>
            <div class="space-y-3">
              <a
                v-if="resume?.linkedinUrl"
                :href="resume.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block break-all text-sm text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
              <a
                v-if="resume?.githubUrl"
                :href="resume.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block break-all text-sm text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                v-if="resume?.portfolioUrl"
                :href="resume.portfolioUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block break-all text-sm text-blue-600 hover:underline"
              >
                {{ $t('resume.portfolio') }}
              </a>
              <div
                v-if="
                  !resume?.linkedinUrl &&
                  !resume?.githubUrl &&
                  !resume?.portfolioUrl
                "
                class="text-sm text-gray-500"
              >
                {{ $t('resume.detail.noSocialLinks') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
