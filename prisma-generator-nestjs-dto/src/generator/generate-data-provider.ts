/* eslint-disable @typescript-eslint/no-unused-vars */
import { kebab } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';
import { WritableDeep } from 'type-fest';
import { DMMF } from '@prisma/generator-helper';

export const generateDataProvider = ({
  controller,
  templateHelpers,
  enumModels,
}: ModelParams & { templateHelpers: TemplateHelpers } & {
  enumModels: WritableDeep<DMMF.DatamodelEnum>[];
}): string => {
  const { model } = controller;
  const { entityName, createDtoName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const dataProviderName = `${entityClassName}DataProvider`;
  const kebabModelName = kebab(modelName).toLowerCase();

  // Convert to camelCase for SDK method names
  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  // Get fields for different form types
  const allFields = model.fields.filter(
    (field) =>
      (field.kind === 'scalar' || field.kind === 'enum') &&
      field.name !== 'deletedAt',
  );

  if (model.name === 'OpWorkNotificationSettings') {
    console.dir(model, { depth: 20 });
  }
  //jobAlertFrequency
  const editableFields = allFields.filter(
    (field) =>
      !field.isId &&
      field.name !== 'createdAt' &&
      field.name !== 'updatedAt' &&
      field.name !== 'deletedAt',
  );
  const readOnlyFields = allFields.filter(
    (field) =>
      field.isId ||
      field.name === 'createdAt' ||
      field.name === 'updatedAt' ||
      field.name === 'deletedAt',
  );

  const getInputComponent = (field: (typeof allFields)[0]): string => {
    /*
    switch (field.type) {
      case 'Json':
        return 'JsonViewerField';
      case 'String':
        return 'TextInput';
      case 'Int':
      case 'Float':
      case 'Decimal':
        return 'NumberInput';
      case 'Boolean':
        return 'BooleanInput';
      case 'DateTime':
        return 'DateTimeInput';
      default:
        return 'TextInput';
    }*/

    const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
    const required = field.isRequired;
    const readonly = readOnlyFields.find((f) => f.name === field.name);
    let component = 'Input';
    if (multiline) {
      component = 'Textarea';
    }

    if (field.kind === 'enum') {
      const enumModel = enumModels.find((model) => model.name === field.type);
      if (enumModel) {
        return `    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          ${enumModel.values.map((value) => `          { value: '${value.name}', label: $t('resource.${field.type}.${value.name}').split(' - ')[0], },`).join('\n')}
        ],
        showSearch: true,
      },
      fieldName: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      label: $t('resource.${entityClassName}.${field.name}'),
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      labelWidth: 200
    },`;
      }
    }

    if (field.type === 'DateTime') {
      if (field.name.endsWith('Time')) {
        return `    {
      component: 'TimePicker',
      fieldName: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      label: $t('resource.${entityClassName}.${field.name}'),
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      labelWidth: 200
    },`;
      }
      return `    {
      component: 'DateTime',
      fieldName: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      label: $t('resource.${entityClassName}.${field.name}'),
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      labelWidth: 200
    },`;
    }

    if (field.type === 'Boolean') {
      return `    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      label: $t('resource.${entityClassName}.${field.name}'),
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      labelWidth: 200
    },`;
    }
    return `    {
      component: '${component}',
      fieldName: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      label: $t('resource.${entityClassName}.${field.name}'),
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      labelWidth: 200
    },`;
  };

  const getColumnComponent = (field: (typeof allFields)[0]): string => {
    /*
    switch (field.type) {
      case 'Json':
        return 'JsonViewerField';
      case 'String':
        return 'TextInput';
      case 'Int':
      case 'Float':
      case 'Decimal':
        return 'NumberInput';
      case 'Boolean':
        return 'BooleanInput';
      case 'DateTime':
        return 'DateTimeInput';
      default:
        return 'TextInput';
    }*/

    const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
    const required = field.isRequired;
    const readonly = readOnlyFields.find((f) => f.name === field.name);

    if (field.kind === 'enum') {
      const enumModel = enumModels.find((model) => model.name === field.type);
      if (enumModel) {
        return `    {
      cellRender: {
        name:'CellEnum',
        options: [
${enumModel.values.map((value) => `          { value: '${value.name}', label: $t('resource.${field.type}.${value.name}').split(' - ')[0], },`).join('\n')}
        ],
      },
      title: $t('resource.${entityClassName}.${field.name}'),
      field: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      sortable: true
    },`;
      }
    }

    if (field.name === 'id') {
      return `    {
      field: Prisma.${entityClassName}ScalarFieldEnum.id,
      title: $t('common.id'),
      sortable: true
    },`;
    }
    if (field.name === 'createdAt') {
      return `    {
      field: Prisma.${entityClassName}ScalarFieldEnum.createdAt,
      title: $t('common.createdAt'),
      formatter: 'formatDateTime',
      sortable: true
    },`;
    }
    if (field.name === 'updatedAt') {
      return `    {
      field: Prisma.${entityClassName}ScalarFieldEnum.updatedAt,
      title: $t('common.updatedAt'),
      formatter: 'formatDateTime',
      sortable: true
    },`;
    }
    if (field.type === 'DateTime') {
      return `    {
      field: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      title: $t('resource.${entityClassName}.${field.name}'),
      formatter: 'formatDateTime',
      sortable: true
    },`;
    }
    if (field.type === 'Boolean') {
      return `    {
      cellRender: {
        name:'CellTag',
      },
      title: $t('resource.${entityClassName}.${field.name}'),
      field: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      sortable: true
    },`;
    }

    return `    {
      field: Prisma.${entityClassName}ScalarFieldEnum.${field.name},
      title: $t('resource.${entityClassName}.${field.name}'),
      sortable: true
    },`;
  };

  // Generate input fields for create form (only editable fields)
  const createFormFields = editableFields
    .map((field) => {
      return getInputComponent(field);
    })
    .join('\n');

  // Generate input fields for edit form (editable + read-only)
  const editFormFields = [
    ...readOnlyFields.map((field) => {
      return getInputComponent(field);
    }),
    ...editableFields.map((field) => {
      return getInputComponent(field);
    }),
  ].join('\n');

  const showFormFields = [
    ...allFields.map((field) => {
      return getInputComponent(field);
    }),
  ].join('\n');

  const showGridFields = [
    ...allFields.map((field) => {
      return getColumnComponent(field);
    }),
  ].join('\n');

  return `import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ${entityClassName} } from '#/generated/client';
import { Prisma } from '#/generated/prisma/browser';

import { $t } from '#/locales';

export function use${entityClassName}FormSchema(): VbenFormSchema[] {
  return [
    ${editFormFields}
  ];
}

export function use${entityClassName}CreateFormSchema(): VbenFormSchema[] {
  return [
    ${createFormFields}
  ];
}

export function use${entityClassName}ViewFormSchema(): VbenFormSchema[] {
  return [
    ${showFormFields}
  ];
}

export function use${entityClassName}FilterFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'searchText',
      label: $t('common.searchText'),
    },
  ];
}

export function use${entityClassName}Columns<T = ${entityClassName}>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    ${showGridFields}
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
      width: 130,
    },
  ];
}
`;
};
