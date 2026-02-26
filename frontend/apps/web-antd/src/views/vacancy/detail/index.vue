<script lang="ts" setup>
import type { OpWorkJob } from '#/generated/client';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { vacancyControllerFindOne } from '#/generated/client';

defineOptions({ name: 'VacancyDetail' });

const route = useRoute();

const vacancy = ref<null | OpWorkJob>(null);
const loading = ref(false);

const currentFilters = ref<{ id?: string }>();

const loadVacany = () => {
  if (!currentFilters.value?.id) {
    return;
  }

  loading.value = true;

  vacancyControllerFindOne({
    path: {
      vacancy_id: currentFilters.value.id,
    },
  })
    .then((response) => {
      vacancy.value = response.data || null;
    })
    .catch((error) => {
      console.error('Error fetching vacancies:', error);
      vacancy.value = null;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  // Load initial data with empty filters
  currentFilters.value = { id: route.params.id as string };
  loadVacany();
});
</script>

<template>
  <div class="p-5">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
      ></div>
    </div>
    <div v-else-if="!vacancy" class="py-10 text-center text-gray-500">
      {{ $t('vacancy.detail.notFound') }}
    </div>
    <div v-else class="space-y-6">
      <!-- Header Section -->
      <div class="rounded-lg bg-white p-6 shadow">
        <h1 class="mb-2 text-2xl font-bold text-gray-900">
          {{ vacancy.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div class="flex items-center">
            <span class="mr-2 font-medium"
              >{{ $t('resource.OpWorkJob.employmentType') }}:</span
            >
            <span
              class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
            >
              {{
                $t(`resource.OpWorkEmploymentType.${vacancy.employmentType}`)
              }}
            </span>
          </div>
          <div class="flex items-center">
            <span class="mr-2 font-medium"
              >{{ $t('resource.OpWorkJob.experienceLevel') }}:</span
            >
            <span
              class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
            >
              {{
                $t(`resource.OpWorkExperienceLevel.${vacancy.experienceLevel}`)
              }}
            </span>
          </div>
          <div class="flex items-center">
            <span class="mr-2 font-medium"
              >{{ $t('resource.OpWorkJob.department') }}:</span
            >
            <span>{{ vacancy.department || $t('common.notSpecified') }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Main Content Column -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Salary and Location Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.compensation') }}
            </h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 class="mb-2 font-medium text-gray-700">
                  {{ $t('common.salary') }}
                </h3>
                <p
                  v-if="vacancy.salaryMin || vacancy.salaryMax"
                  class="text-lg font-semibold"
                >
                  <template v-if="vacancy.salaryMin && vacancy.salaryMax">
                    ${{ vacancy.salaryMin.toLocaleString() }} - ${{
                      vacancy.salaryMax.toLocaleString()
                    }}
                  </template>
                  <template v-else-if="vacancy.salaryMin">
                    {{ $t('common.filter.from') }} ${{
                      vacancy.salaryMin.toLocaleString()
                    }}
                  </template>
                  <template v-else-if="vacancy.salaryMax">
                    {{ $t('common.filter.upTo') }} ${{
                      vacancy.salaryMax.toLocaleString()
                    }}
                  </template>
                  <span
                    v-if="vacancy.salaryCurrency"
                    class="ml-2 text-gray-600"
                    >{{ vacancy.salaryCurrency }}</span
                  >
                </p>
                <p v-else class="text-gray-500">
                  {{ $t('common.notSpecified') }}
                </p>
              </div>
              <div>
                <h3 class="mb-2 font-medium text-gray-700">
                  {{ $t('resource.OpWorkJob.location') }} &
                  {{ $t('resource.OpWorkJob.isRemote') }}
                </h3>
                <div>
                  <p v-if="vacancy.location" class="text-lg font-semibold">
                    {{ vacancy.location }}
                    <span
                      :class="
                        vacancy.isRemote
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      "
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {{
                        vacancy.isRemote
                          ? $t('vacancy.remoteWork')
                          : $t('vacancy.inOffice')
                      }}
                    </span>
                  </p>
                  <p v-else class="text-gray-500">
                    {{ $t('common.notSpecified') }}
                    <span
                      :class="
                        vacancy.isRemote
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      "
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {{
                        vacancy.isRemote
                          ? $t('vacancy.remoteWork')
                          : $t('vacancy.inOffice')
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Description Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.description') }}
            </h2>
            <div class="prose max-w-none" v-html="vacancy.description"></div>
          </div>

          <!-- Responsibilities Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.responsibilities') }}
            </h2>
            <div
              class="prose max-w-none"
              v-html="vacancy.responsibilities"
            ></div>
          </div>

          <!-- Requirements Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.requirements') }}
            </h2>
            <div class="prose max-w-none" v-html="vacancy.requirements"></div>
          </div>
        </div>

        <!-- Sidebar Column -->
        <div class="space-y-6">
          <!-- Status and Stats Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.statusAndStats') }}
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600"
                  >{{ $t('resource.OpWorkJob.status') }}:</span
                >
                <span
                  :class="{
                    'bg-green-100 text-green-800': vacancy.status === 'ACTIVE',
                    'bg-yellow-100 text-yellow-800':
                      vacancy.status === 'DRAFT' || vacancy.status === 'PAUSED',
                    'bg-red-100 text-red-800':
                      vacancy.status === 'CLOSED' ||
                      vacancy.status === 'ARCHIVED',
                  }"
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{ $t(`resource.OpWorkJobStatus.${vacancy.status}`) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600"
                  >{{ $t('resource.OpWorkJob.viewsCount') }}:</span
                >
                <span class="font-medium">{{ vacancy.viewsCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600"
                  >{{ $t('resource.OpWorkJob.applicationsCount') }}:</span
                >
                <span class="font-medium">{{ vacancy.applicationsCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600"
                  >{{ $t('resource.OpWorkJob.savesCount') }}:</span
                >
                <span class="font-medium">{{ vacancy.savesCount }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600"
                    >{{ $t('resource.OpWorkJob.publishedAt') }}:</span
                  >
                  <span class="font-medium">{{
                    new Date(vacancy.publishedAt!).toLocaleDateString()
                  }}</span>
                </div>
                <div
                  v-if="vacancy.expiresAt"
                  class="flex justify-between text-sm"
                >
                  <span class="text-gray-600"
                    >{{ $t('resource.OpWorkJob.expiresAt') }}:</span
                  >
                  <span class="font-medium">{{
                    new Date(vacancy.expiresAt).toLocaleDateString()
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.skills') }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in vacancy?.OpWorkJobSkill || []"
                :key="skill.id"
                class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800"
              >
                {{ skill.OpWorkSkill?.name || skill.skillId }}
                <span v-if="skill.isRequired" class="ml-1 text-red-500">*</span>
              </span>
              <div
                v-if="
                  !(vacancy.OpWorkJobSkill && vacancy.OpWorkJobSkill.length > 0)
                "
                class="text-sm text-gray-500"
              >
                {{ $t('vacancy.detail.noSkills') }}
              </div>
            </div>
          </div>

          <!-- Tags Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.tags') }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in vacancy.opWorkJobTags || []"
                :key="tag.id"
                :style="{ backgroundColor: `${tag.color}20`, color: tag.color }"
                class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
              >
                {{ tag.name }}
              </span>
              <div
                v-if="
                  !(vacancy.opWorkJobTags && vacancy.opWorkJobTags.length > 0)
                "
                class="text-sm text-gray-500"
              >
                {{ $t('vacancy.detail.noTags') }}
              </div>
            </div>
          </div>

          <!-- Employer Info Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('vacancy.detail.employerInfo') }}
            </h2>
            <div v-if="vacancy.OpWorkEmployer" class="space-y-2">
              <p class="font-medium">
                {{ vacancy.OpWorkEmployer.companyName }}
              </p>
              <p class="text-sm text-gray-600">
                {{ vacancy.OpWorkEmployer.industry }}
              </p>
              <p class="text-sm text-gray-600">
                {{ vacancy.OpWorkEmployer.headquarters }}
              </p>
            </div>
            <div v-else class="text-sm text-gray-500">
              {{ $t('vacancy.detail.employerNotFound') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
