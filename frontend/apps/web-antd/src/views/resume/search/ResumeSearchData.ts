import type { VbenFormSchema } from '#/adapter/form';

import { OpWorkExperienceLevel } from '#/generated/prisma/browser';
import { $t } from '#/locales';

export function useResumeSearchFilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.filter.searchText'),
      controlClass: 'w-full',
    },
    {
      component: 'Input',
      fieldName: 'locations',
      label: $t('resource.OpWorkJobSeeker.preferredLocations'),
      controlClass: 'w-full',
      help: $t('resume.search.locationsHelp'),
    },
    {
      component: 'InputNumber',
      fieldName: 'salaryMin',
      label: `${$t('common.filter.salary')} (min)`,
      controlClass: 'w-full',
    },
    {
      component: 'InputNumber',
      fieldName: 'salaryMax',
      label: `${$t('common.filter.salary')} (max)`,
      controlClass: 'w-full',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
          { label: $t('common.filter.sort.none'), value: undefined },
        ],
        optionType: 'button',
      },
      defaultValue: undefined,
      fieldName: 'isOpenToWork',
      label: $t('resource.OpWorkJobSeeker.isOpenToWork'),
      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
          { label: $t('common.filter.sort.none'), value: undefined },
        ],
        optionType: 'button',
      },
      defaultValue: undefined,
      fieldName: 'isOpenToRemote',
      label: $t('resource.OpWorkJobSeeker.isOpenToRemote'),
      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
          { label: $t('common.filter.sort.none'), value: undefined },
        ],
        optionType: 'button',
      },
      defaultValue: undefined,
      fieldName: 'isOpenToRelocation',
      label: $t('resource.OpWorkJobSeeker.isOpenToRelocation'),
      controlClass: 'w-full',
      labelWidth: 200,
    },
    {
      component: 'Select',
      componentProps: {
        mode: 'multiple',
        options: Object.values(OpWorkExperienceLevel).map((level) => ({
          label: $t(`resource.OpWorkExperienceLevel.${level}`),
          value: level,
        })),
        placeholder: $t('resume.search.selectExperienceLevels'),
      },
      fieldName: 'experienceLevels',
      label: $t('resource.OpWorkJobSeekerSkill.experienceLevel'),
      controlClass: 'w-full',
    },
  ];
}
