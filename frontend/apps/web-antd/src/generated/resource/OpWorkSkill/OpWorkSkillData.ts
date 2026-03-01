import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      import  {  type OpWorkSkill } from '#/generated/client';
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function useOpWorkSkillFormSchema(): VbenFormSchema[] {
      return [
            {
        component: 'Input',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.name,
        label: $t('resource.OpWorkSkill.name'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.description,
        label: $t('resource.OpWorkSkill.description'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Select',
          componentProps: {
          allowClear: true,
            filterOption: true,
              options: [
                          { value: 'CORE_DEVELOPMENT__PROGRAMMING_LANGUAGE', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__PROGRAMMING_LANGUAGE').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__FRAMEWORK', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__FRAMEWORK').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__LIBRARY', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__LIBRARY').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__RUNTIME', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__RUNTIME').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__API_TECHNOLOGY', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__API_TECHNOLOGY').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__ARCHITECTURE_PATTERN', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__ARCHITECTURE_PATTERN').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__ARCHITECTURE_METHOD', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__ARCHITECTURE_METHOD').split(' - ')[0], },
          { value: 'DATA_AI__DATABASE', label: $t('resource.OpWorkSkillType.DATA_AI__DATABASE').split(' - ')[0], },
          { value: 'DATA_AI__DATA_WAREHOUSE', label: $t('resource.OpWorkSkillType.DATA_AI__DATA_WAREHOUSE').split(' - ')[0], },
          { value: 'DATA_AI__BIG_DATA', label: $t('resource.OpWorkSkillType.DATA_AI__BIG_DATA').split(' - ')[0], },
          { value: 'DATA_AI__DATA_ENGINEERING', label: $t('resource.OpWorkSkillType.DATA_AI__DATA_ENGINEERING').split(' - ')[0], },
          { value: 'DATA_AI__MACHINE_LEARNING', label: $t('resource.OpWorkSkillType.DATA_AI__MACHINE_LEARNING').split(' - ')[0], },
          { value: 'DATA_AI__DEEP_LEARNING', label: $t('resource.OpWorkSkillType.DATA_AI__DEEP_LEARNING').split(' - ')[0], },
          { value: 'DATA_AI__GENERATIVE_AI', label: $t('resource.OpWorkSkillType.DATA_AI__GENERATIVE_AI').split(' - ')[0], },
          { value: 'DATA_AI__COMPUTER_VISION', label: $t('resource.OpWorkSkillType.DATA_AI__COMPUTER_VISION').split(' - ')[0], },
          { value: 'DATA_AI__NLP', label: $t('resource.OpWorkSkillType.DATA_AI__NLP').split(' - ')[0], },
          { value: 'DATA_AI__MLOPS', label: $t('resource.OpWorkSkillType.DATA_AI__MLOPS').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__TOOL', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__TOOL').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CONTAINERIZATION', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CONTAINERIZATION').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__ORCHESTRATION', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__ORCHESTRATION').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CI_CD', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CI_CD').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__INFRASTRUCTURE_AS_CODE', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__INFRASTRUCTURE_AS_CODE').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CONFIGURATION_MANAGEMENT', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CONFIGURATION_MANAGEMENT').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__PLATFORM', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__PLATFORM').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__SERVERLESS', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__SERVERLESS').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__OBSERVABILITY', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__OBSERVABILITY').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__MONITORING', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__MONITORING').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__NETWORKING', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__NETWORKING').split(' - ')[0], },
          { value: 'SECURITY__CYBERSECURITY', label: $t('resource.OpWorkSkillType.SECURITY__CYBERSECURITY').split(' - ')[0], },
          { value: 'SECURITY__APPLICATION_SECURITY', label: $t('resource.OpWorkSkillType.SECURITY__APPLICATION_SECURITY').split(' - ')[0], },
          { value: 'SECURITY__CLOUD_SECURITY', label: $t('resource.OpWorkSkillType.SECURITY__CLOUD_SECURITY').split(' - ')[0], },
          { value: 'SECURITY__CRYPTOGRAPHY', label: $t('resource.OpWorkSkillType.SECURITY__CRYPTOGRAPHY').split(' - ')[0], },
          { value: 'WEB_MOBILE__FRONTEND_TECH', label: $t('resource.OpWorkSkillType.WEB_MOBILE__FRONTEND_TECH').split(' - ')[0], },
          { value: 'WEB_MOBILE__BACKEND_TECH', label: $t('resource.OpWorkSkillType.WEB_MOBILE__BACKEND_TECH').split(' - ')[0], },
          { value: 'WEB_MOBILE__MOBILE_DEVELOPMENT', label: $t('resource.OpWorkSkillType.WEB_MOBILE__MOBILE_DEVELOPMENT').split(' - ')[0], },
          { value: 'WEB_MOBILE__GAME_DEVELOPMENT', label: $t('resource.OpWorkSkillType.WEB_MOBILE__GAME_DEVELOPMENT').split(' - ')[0], },
          { value: 'WEB_MOBILE__WEB3', label: $t('resource.OpWorkSkillType.WEB_MOBILE__WEB3').split(' - ')[0], },
          { value: 'QA_PROCESS__TESTING', label: $t('resource.OpWorkSkillType.QA_PROCESS__TESTING').split(' - ')[0], },
          { value: 'QA_PROCESS__PERFORMANCE_TESTING', label: $t('resource.OpWorkSkillType.QA_PROCESS__PERFORMANCE_TESTING').split(' - ')[0], },
          { value: 'QA_PROCESS__TEST_AUTOMATION', label: $t('resource.OpWorkSkillType.QA_PROCESS__TEST_AUTOMATION').split(' - ')[0], },
          { value: 'QA_PROCESS__DEVELOPMENT_METHODOLOGY', label: $t('resource.OpWorkSkillType.QA_PROCESS__DEVELOPMENT_METHODOLOGY').split(' - ')[0], },
          { value: 'QA_PROCESS__PROJECT_MANAGEMENT', label: $t('resource.OpWorkSkillType.QA_PROCESS__PROJECT_MANAGEMENT').split(' - ')[0], },
          { value: 'QA_PROCESS__PRODUCT_MANAGEMENT', label: $t('resource.OpWorkSkillType.QA_PROCESS__PRODUCT_MANAGEMENT').split(' - ')[0], },
          { value: 'DESIGN__UI_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__UI_DESIGN').split(' - ')[0], },
          { value: 'DESIGN__UX_RESEARCH', label: $t('resource.OpWorkSkillType.DESIGN__UX_RESEARCH').split(' - ')[0], },
          { value: 'DESIGN__GRAPHIC_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__GRAPHIC_DESIGN').split(' - ')[0], },
          { value: 'DESIGN__MOTION_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__MOTION_DESIGN').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__LEADERSHIP', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__LEADERSHIP').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__PEOPLE_MANAGEMENT', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__PEOPLE_MANAGEMENT').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__RECRUITMENT', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__RECRUITMENT').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__TECHNICAL_WRITING', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__TECHNICAL_WRITING').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__SOFT_SKILL', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__SOFT_SKILL').split(' - ')[0], },
          { value: 'LANGUAGES__LANGUAGE', label: $t('resource.OpWorkSkillType.LANGUAGES__LANGUAGE').split(' - ')[0], },
          { value: 'OTHER__EMBEDDED', label: $t('resource.OpWorkSkillType.OTHER__EMBEDDED').split(' - ')[0], },
          { value: 'OTHER__IOT', label: $t('resource.OpWorkSkillType.OTHER__IOT').split(' - ')[0], },
          { value: 'OTHER__AR_VR', label: $t('resource.OpWorkSkillType.OTHER__AR_VR').split(' - ')[0], },
          { value: 'OTHER__ROBOTICS', label: $t('resource.OpWorkSkillType.OTHER__ROBOTICS').split(' - ')[0], },
              ],
                showSearch: true,
      },
        fieldName: Prisma.OpWorkSkillScalarFieldEnum.type,
        label: $t('resource.OpWorkSkill.type'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Input',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.category,
        label: $t('resource.OpWorkSkill.category'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'Textarea',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.icon,
        label: $t('resource.OpWorkSkill.icon'),
      
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
    {
        component: 'InputNumber',
          fieldName: Prisma.OpWorkSkillScalarFieldEnum.popularity,
        label: $t('resource.OpWorkSkill.popularity'),
      rules: 'required',
      
        controlClass: 'w-full',
        labelWidth: 200
      }, 
      ];
    }

    export function useOpWorkSkillFilterFormSchema(): VbenFormSchema[] {
      return [
        {
          component: 'Input',
          fieldName: 'searchText',
          label: $t('common.searchText'),
        },
      ];
    }

    export function useOpWorkSkillColumns < T = OpWorkSkill> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
        {
        title: $t('resource.OpWorkSkill.name'),
        field: Prisma.OpWorkSkillScalarFieldEnum.name ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.description'),
        field: Prisma.OpWorkSkillScalarFieldEnum.description ,
        sortable: true
      }, 
    {
        cellRender: {
          name: 'CellEnum',
          props:{
            options: [
                        { value: 'CORE_DEVELOPMENT__PROGRAMMING_LANGUAGE', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__PROGRAMMING_LANGUAGE').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__FRAMEWORK', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__FRAMEWORK').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__LIBRARY', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__LIBRARY').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__RUNTIME', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__RUNTIME').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__API_TECHNOLOGY', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__API_TECHNOLOGY').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__ARCHITECTURE_PATTERN', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__ARCHITECTURE_PATTERN').split(' - ')[0], },
          { value: 'CORE_DEVELOPMENT__ARCHITECTURE_METHOD', label: $t('resource.OpWorkSkillType.CORE_DEVELOPMENT__ARCHITECTURE_METHOD').split(' - ')[0], },
          { value: 'DATA_AI__DATABASE', label: $t('resource.OpWorkSkillType.DATA_AI__DATABASE').split(' - ')[0], },
          { value: 'DATA_AI__DATA_WAREHOUSE', label: $t('resource.OpWorkSkillType.DATA_AI__DATA_WAREHOUSE').split(' - ')[0], },
          { value: 'DATA_AI__BIG_DATA', label: $t('resource.OpWorkSkillType.DATA_AI__BIG_DATA').split(' - ')[0], },
          { value: 'DATA_AI__DATA_ENGINEERING', label: $t('resource.OpWorkSkillType.DATA_AI__DATA_ENGINEERING').split(' - ')[0], },
          { value: 'DATA_AI__MACHINE_LEARNING', label: $t('resource.OpWorkSkillType.DATA_AI__MACHINE_LEARNING').split(' - ')[0], },
          { value: 'DATA_AI__DEEP_LEARNING', label: $t('resource.OpWorkSkillType.DATA_AI__DEEP_LEARNING').split(' - ')[0], },
          { value: 'DATA_AI__GENERATIVE_AI', label: $t('resource.OpWorkSkillType.DATA_AI__GENERATIVE_AI').split(' - ')[0], },
          { value: 'DATA_AI__COMPUTER_VISION', label: $t('resource.OpWorkSkillType.DATA_AI__COMPUTER_VISION').split(' - ')[0], },
          { value: 'DATA_AI__NLP', label: $t('resource.OpWorkSkillType.DATA_AI__NLP').split(' - ')[0], },
          { value: 'DATA_AI__MLOPS', label: $t('resource.OpWorkSkillType.DATA_AI__MLOPS').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__TOOL', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__TOOL').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CONTAINERIZATION', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CONTAINERIZATION').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__ORCHESTRATION', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__ORCHESTRATION').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CI_CD', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CI_CD').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__INFRASTRUCTURE_AS_CODE', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__INFRASTRUCTURE_AS_CODE').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__CONFIGURATION_MANAGEMENT', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__CONFIGURATION_MANAGEMENT').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__PLATFORM', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__PLATFORM').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__SERVERLESS', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__SERVERLESS').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__OBSERVABILITY', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__OBSERVABILITY').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__MONITORING', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__MONITORING').split(' - ')[0], },
          { value: 'DEVOPS_CLOUD__NETWORKING', label: $t('resource.OpWorkSkillType.DEVOPS_CLOUD__NETWORKING').split(' - ')[0], },
          { value: 'SECURITY__CYBERSECURITY', label: $t('resource.OpWorkSkillType.SECURITY__CYBERSECURITY').split(' - ')[0], },
          { value: 'SECURITY__APPLICATION_SECURITY', label: $t('resource.OpWorkSkillType.SECURITY__APPLICATION_SECURITY').split(' - ')[0], },
          { value: 'SECURITY__CLOUD_SECURITY', label: $t('resource.OpWorkSkillType.SECURITY__CLOUD_SECURITY').split(' - ')[0], },
          { value: 'SECURITY__CRYPTOGRAPHY', label: $t('resource.OpWorkSkillType.SECURITY__CRYPTOGRAPHY').split(' - ')[0], },
          { value: 'WEB_MOBILE__FRONTEND_TECH', label: $t('resource.OpWorkSkillType.WEB_MOBILE__FRONTEND_TECH').split(' - ')[0], },
          { value: 'WEB_MOBILE__BACKEND_TECH', label: $t('resource.OpWorkSkillType.WEB_MOBILE__BACKEND_TECH').split(' - ')[0], },
          { value: 'WEB_MOBILE__MOBILE_DEVELOPMENT', label: $t('resource.OpWorkSkillType.WEB_MOBILE__MOBILE_DEVELOPMENT').split(' - ')[0], },
          { value: 'WEB_MOBILE__GAME_DEVELOPMENT', label: $t('resource.OpWorkSkillType.WEB_MOBILE__GAME_DEVELOPMENT').split(' - ')[0], },
          { value: 'WEB_MOBILE__WEB3', label: $t('resource.OpWorkSkillType.WEB_MOBILE__WEB3').split(' - ')[0], },
          { value: 'QA_PROCESS__TESTING', label: $t('resource.OpWorkSkillType.QA_PROCESS__TESTING').split(' - ')[0], },
          { value: 'QA_PROCESS__PERFORMANCE_TESTING', label: $t('resource.OpWorkSkillType.QA_PROCESS__PERFORMANCE_TESTING').split(' - ')[0], },
          { value: 'QA_PROCESS__TEST_AUTOMATION', label: $t('resource.OpWorkSkillType.QA_PROCESS__TEST_AUTOMATION').split(' - ')[0], },
          { value: 'QA_PROCESS__DEVELOPMENT_METHODOLOGY', label: $t('resource.OpWorkSkillType.QA_PROCESS__DEVELOPMENT_METHODOLOGY').split(' - ')[0], },
          { value: 'QA_PROCESS__PROJECT_MANAGEMENT', label: $t('resource.OpWorkSkillType.QA_PROCESS__PROJECT_MANAGEMENT').split(' - ')[0], },
          { value: 'QA_PROCESS__PRODUCT_MANAGEMENT', label: $t('resource.OpWorkSkillType.QA_PROCESS__PRODUCT_MANAGEMENT').split(' - ')[0], },
          { value: 'DESIGN__UI_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__UI_DESIGN').split(' - ')[0], },
          { value: 'DESIGN__UX_RESEARCH', label: $t('resource.OpWorkSkillType.DESIGN__UX_RESEARCH').split(' - ')[0], },
          { value: 'DESIGN__GRAPHIC_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__GRAPHIC_DESIGN').split(' - ')[0], },
          { value: 'DESIGN__MOTION_DESIGN', label: $t('resource.OpWorkSkillType.DESIGN__MOTION_DESIGN').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__LEADERSHIP', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__LEADERSHIP').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__PEOPLE_MANAGEMENT', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__PEOPLE_MANAGEMENT').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__RECRUITMENT', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__RECRUITMENT').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__TECHNICAL_WRITING', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__TECHNICAL_WRITING').split(' - ')[0], },
          { value: 'BUSINESS_MANAGEMENT__SOFT_SKILL', label: $t('resource.OpWorkSkillType.BUSINESS_MANAGEMENT__SOFT_SKILL').split(' - ')[0], },
          { value: 'LANGUAGES__LANGUAGE', label: $t('resource.OpWorkSkillType.LANGUAGES__LANGUAGE').split(' - ')[0], },
          { value: 'OTHER__EMBEDDED', label: $t('resource.OpWorkSkillType.OTHER__EMBEDDED').split(' - ')[0], },
          { value: 'OTHER__IOT', label: $t('resource.OpWorkSkillType.OTHER__IOT').split(' - ')[0], },
          { value: 'OTHER__AR_VR', label: $t('resource.OpWorkSkillType.OTHER__AR_VR').split(' - ')[0], },
          { value: 'OTHER__ROBOTICS', label: $t('resource.OpWorkSkillType.OTHER__ROBOTICS').split(' - ')[0], },
            ],
          }
      },
        title: $t('resource.OpWorkSkill.type'),
        field: Prisma.OpWorkSkillScalarFieldEnum.type ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.category'),
        field: Prisma.OpWorkSkillScalarFieldEnum.category ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.icon'),
        field: Prisma.OpWorkSkillScalarFieldEnum.icon ,
        sortable: true
      }, 
    {
        title: $t('resource.OpWorkSkill.popularity'),
        field: Prisma.OpWorkSkillScalarFieldEnum.popularity ,
        sortable: true
      }, 
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'id',
          nameTitle: $t('common.id'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 200,
    },
  ];
}
