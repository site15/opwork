<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useVbenForm, VbenButton } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  jobSeekerControllerGetProfile,
  jobSeekerControllerSetProfile,
} from '#/generated/client';
import {
  applyBackendValidationErrors,
  clearBackendValidationErrors,
} from '#/utils/apply-backend-validation-errors';

import { CardHeader } from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui';
import Card from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/Card.vue';
import CardContent from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardContent.vue';
import CardFooter from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardFooter.vue';
import CardTitle from '../../../../../../packages/@core/ui-kit/shadcn-ui/src/ui/card/CardTitle.vue';
import OpWorkEducationList from './OpWorkEducation/OpWorkEducationList.vue';
import OpWorkExperienceList from './OpWorkExperience/OpWorkExperienceList.vue';
import { useOpWorkJobSeekerFormSchema } from './OpWorkJobSeekerData';
import OpWorkJobSeekerSkillList from './OpWorkJobSeekerSkill/OpWorkJobSeekerSkillList.vue';

defineOptions({ name: 'SpecialistProfile' });

const loading = ref(false);

const loadProfile = () => {
  loading.value = true;
  jobSeekerControllerGetProfile({ query: { jobSeekerId: '' } })
    .then(async (response) => {
      const values = {
        ...response.data,
        createdAt: response.data?.createdAt
          ? dayjs(response.data.createdAt)
          : undefined,
        updatedAt: response.data?.updatedAt
          ? dayjs(response.data.updatedAt)
          : undefined,
      };
      console.log(values);
      jobSeekerProfileFormApi.setValues(values);
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
      jobSeekerProfileFormApi.setValues({});
    })
    .finally(() => {
      loading.value = false;
    });
};

const [JobSeekerProfileForm, jobSeekerProfileFormApi] = useVbenForm({
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 gap-2',
  schema: useOpWorkJobSeekerFormSchema(),
  showDefaultActions: false,
});

const submit = async () => {
  // const { valid: jobSeekerValid } =
  await jobSeekerProfileFormApi.validate();
  // if (!jobSeekerValid) return;
  const jobSeekerProfileValues = await jobSeekerProfileFormApi.getValues();

  jobSeekerControllerSetProfile({
    body: {
      currentPosition: jobSeekerProfileValues.currentPosition,
      currentCompany: jobSeekerProfileValues.currentCompany,
      summary: jobSeekerProfileValues.summary,
      expectedSalary: jobSeekerProfileValues.expectedSalary,
      salaryCurrency: jobSeekerProfileValues.salaryCurrency,
      isOpenToWork: jobSeekerProfileValues.isOpenToWork,
      isOpenToRemote: jobSeekerProfileValues.isOpenToRemote,
      isOpenToRelocation: jobSeekerProfileValues.isOpenToRelocation,
      preferredLocations: jobSeekerProfileValues.preferredLocations,
      linkedinUrl: jobSeekerProfileValues.linkedinUrl,
      githubUrl: jobSeekerProfileValues.githubUrl,
      portfolioUrl: jobSeekerProfileValues.portfolioUrl,
    },
  })
    .catch((error) => {
      const hasValidationErrors = applyBackendValidationErrors(
        jobSeekerProfileFormApi,
        error,
      );
      if (!hasValidationErrors) {
        notification.error({
          message: $t('actions.common.updateFailed'),
          description:
            hasValidationErrors && (error as { message?: string })?.message
              ? (error as { message?: string }).message
              : error instanceof Error
                ? error.message
                : '',
          duration: 3000,
        });
      }
      throw error;
    })
    .then(() => {
      clearBackendValidationErrors(jobSeekerProfileFormApi);
      notification.success({
        message: $t('actions.common.updateSuccess'),
        description: $t('resume.detail.updateSuccessDescription'),
        duration: 3000,
      });
    });
};
onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div class="p-5">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
      ></div>
    </div>
    <div v-else class="space-y-6">
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-lg">
            {{ $t('resume.update.title') }}
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-4">
          <div class="flex w-full flex-col gap-4">
            <JobSeekerProfileForm />
            <OpWorkEducationList />
            <OpWorkExperienceList />
            <OpWorkJobSeekerSkillList />
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <VbenButton type="primary" class="mt-4" @click="submit">
            {{ $t('common.update') }}
          </VbenButton>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
