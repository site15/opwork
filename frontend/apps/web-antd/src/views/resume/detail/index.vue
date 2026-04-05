<script lang="ts" setup>
import type { OpWorkJobSeeker } from '#/generated/client';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { jobSeekerControllerGetProfile } from '#/generated/client';
import { $t } from '#/locales';

defineOptions({ name: 'ResumeDetail' });

const route = useRoute();

const resume = ref<null | OpWorkJobSeeker>(null);
const loading = ref(false);

const loadResume = () => {
  const id = route.params.id as string;
  if (!id) {
    return;
  }

  loading.value = true;

  jobSeekerControllerGetProfile({ query: { jobSeekerId: id } })
    .then((response) => {
      resume.value = response.data || null;
    })
    .catch((error) => {
      console.error('Error fetching resume:', error);
      // Handle error silently
      resume.value = null;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  loadResume();
});
</script>

<template>
  <div class="p-5">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
      ></div>
    </div>
    <div v-else-if="!resume" class="py-10 text-center text-gray-500">
      {{ $t('resume.detail.notFound') }}
    </div>
    <div v-else class="space-y-6">
      <!-- Header Section -->
      <div class="rounded-lg bg-white p-6 shadow">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 class="mb-2 text-2xl font-bold text-gray-900">
              {{ resume.currentPosition || $t('resume.noPosition') }}
            </h1>
            <div
              class="flex flex-wrap items-center gap-4 text-sm text-gray-600"
            >
              <div class="flex items-center">
                <span class="mr-2 font-medium"
                  >{{ $t('resource.OpWorkJobSeeker.currentCompany') }}:</span
                >
                <span>{{
                  resume.currentCompany || $t('common.notSpecified')
                }}</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 font-medium"
                  >{{ $t('resource.OpWorkJobSeeker.expectedSalary') }}:</span
                >
                <span>
                  <template v-if="resume.expectedSalary">
                    ${{ resume.expectedSalary.toLocaleString() }}
                    {{ resume.salaryCurrency }}
                  </template>
                  <span v-else class="text-gray-500">{{
                    $t('common.notSpecified')
                  }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-3"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Main Content Column -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Summary Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.summary') }}
            </h2>
            <div class="prose max-w-none">
              {{ resume.summary || $t('common.notSpecified') }}
            </div>
          </div>

          <!-- Experience Panel -->
          <div
            v-if="resume.OpWorkExperience && resume.OpWorkExperience.length > 0"
            class="rounded-lg bg-white p-6 shadow"
          >
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.experience') }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="exp in resume.OpWorkExperience"
                :key="exp.id"
                class="border-l-2 border-gray-200 pl-4"
              >
                <h3 class="font-semibold text-gray-900">
                  {{ exp.position }}
                </h3>
                <p class="text-sm text-gray-600">{{ exp.company }}</p>
                <p class="text-xs text-gray-500">
                  {{ new Date(exp.startDate).toLocaleDateString() }} -
                  {{
                    exp.isCurrent
                      ? $t('common.present')
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString()
                        : ''
                  }}
                </p>
                <p v-if="exp.description" class="mt-2 text-sm text-gray-700">
                  {{ exp.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Education Panel -->
          <div
            v-if="resume.OpWorkEducation && resume.OpWorkEducation.length > 0"
            class="rounded-lg bg-white p-6 shadow"
          >
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.education') }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="edu in resume.OpWorkEducation"
                :key="edu.id"
                class="border-l-2 border-gray-200 pl-4"
              >
                <h3 class="font-semibold text-gray-900">
                  {{ edu.institution }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{
                    edu.degree
                      ? $t(`resource.OpWorkEducationDegree.${edu.degree}`)
                      : ''
                  }}
                  <span v-if="edu.fieldOfStudy">- {{ edu.fieldOfStudy }}</span>
                </p>
                <p class="text-xs text-gray-500">
                  {{ new Date(edu.startDate).toLocaleDateString() }} -
                  {{
                    edu.isCurrent
                      ? $t('common.present')
                      : edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : ''
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Column -->
        <div class="space-y-6">
          <!-- Work Preferences Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.preferences') }}
            </h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToWork')
                }}</span>
                <span
                  :class="
                    resume.isOpenToWork
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{ resume.isOpenToWork ? $t('common.yes') : $t('common.no') }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToRemote')
                }}</span>
                <span
                  :class="
                    resume.isOpenToRemote
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    resume.isOpenToRemote ? $t('common.yes') : $t('common.no')
                  }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{
                  $t('resource.OpWorkJobSeeker.isOpenToRelocation')
                }}</span>
                <span
                  :class="
                    resume.isOpenToRelocation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    resume.isOpenToRelocation
                      ? $t('common.yes')
                      : $t('common.no')
                  }}
                </span>
              </div>
              <div
                v-if="resume.preferredLocations"
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

          <!-- Skills Panel -->
          <div
            v-if="
              resume.OpWorkJobSeekerSkill &&
              resume.OpWorkJobSeekerSkill.length > 0
            "
            class="rounded-lg bg-white p-6 shadow"
          >
            <h2 class="mb-4 text-xl font-semibold">
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

          <!-- Social Links Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.socialLinks') }}
            </h2>
            <div class="space-y-3">
              <a
                v-if="resume.linkedinUrl"
                :href="resume.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-sm text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
              <a
                v-if="resume.githubUrl"
                :href="resume.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-sm text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                v-if="resume.portfolioUrl"
                :href="resume.portfolioUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-sm text-blue-600 hover:underline"
              >
                {{ $t('resume.portfolio') }}
              </a>
              <div
                v-if="
                  !resume.linkedinUrl &&
                  !resume.githubUrl &&
                  !resume.portfolioUrl
                "
                class="text-sm text-gray-500"
              >
                {{ $t('resume.detail.noSocialLinks') }}
              </div>
            </div>
          </div>

          <!-- Contact Info Panel -->
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t('resume.detail.contactInfo') }}
            </h2>
            <div v-if="resume.OpWorkProfile" class="space-y-2">
              <div v-if="resume.OpWorkProfile.email" class="text-sm">
                <span class="font-medium text-gray-700"
                  >{{ $t('common.email') }}:</span
                >
                <a
                  :href="`mailto:${resume.OpWorkProfile.email}`"
                  class="text-blue-600 hover:underline"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
