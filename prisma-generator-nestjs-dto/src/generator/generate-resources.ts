import { pascal } from 'case';
import { TemplateHelpers } from './template-helpers';
import { Model } from './types';

interface GenerateResourcesParams {
  models: Model[];
  templateHelpers: TemplateHelpers;
  frontendOutput?: string;
}

export const generateResourcesIndex = ({
  models,
  templateHelpers,
  frontendOutput,
}: GenerateResourcesParams): string => {
  const { entityName } = templateHelpers;

  // Filter out models that should be ignored
  const filteredModels = models.filter((model) => {
    // Skip models with @DtoIgnore annotation
    if (model.documentation && model.documentation.includes('@DtoIgnore')) {
      return false;
    }
    return true;
  });

  // Generate import statements
  const dataProviderImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const dataProviderName = `${entityClassName}DataProvider`;
      return `import { ${dataProviderName} } from "./${entityClassName}DataProvider";`;
    })
    .join('\n');

  const formImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const createFormName = `${entityClassName}CreateForm`;
      const editFormName = `${entityClassName}EditForm`;
      const showFormName = `${entityClassName}ShowForm`;
      return `import {
  ${createFormName},
  ${editFormName},
  ${showFormName},
} from "./${entityClassName}Form";`;
    })
    .join('\n');

  const listImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const listName = `${entityClassName}List`;
      return `import { ${listName} } from "./${entityClassName}List";`;
    })
    .join('\n');

  let namespace = '';
  // Generate the resources object entries
  const resourceEntries = filteredModels
    .map((model) => {
      namespace = model.custom.namespace;
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const dataProviderName = `${entityClassName}DataProvider`;
      const listName = `${entityClassName}List`;
      const createFormName = `${entityClassName}CreateForm`;
      const editFormName = `${entityClassName}EditForm`;
      const showFormName = `${entityClassName}ShowForm`;

      // Convert PascalCase to readable label
      const label = entityClassName
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/\s+/g, ' ');

      return `{
        meta: {
          title: $t('page.resource.${entityClassName}'),
        },
        name: '${entityClassName}',
        path: '/${model.custom.namespace}/${model.custom.name}',
        component: () =>
          import('#/generated/resource/${entityClassName}/${entityClassName}List.vue'),
      },`;
    })
    .join('\n      ');

  return `import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: '${namespace === 'auth' ? 'ic:baseline-key' : 'ic:baseline-work'}',
      keepAlive: true,
      order: 1001,
      title: $t('page.resource.${namespace}'),
    },
    name: '${pascal(namespace)}',
    path: '/${namespace}',
    children: [
      ${resourceEntries}
    ],
  },
];

export default routes;
`;
};
