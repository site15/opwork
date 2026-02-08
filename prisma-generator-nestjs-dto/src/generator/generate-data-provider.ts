/* eslint-disable @typescript-eslint/no-unused-vars */
import { DMMF } from '@prisma/generator-helper';
import { kebab } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateDataProvider = ({
  controller,
  templateHelpers,
  datamodel,
  update,
}: ModelParams & {
  templateHelpers: TemplateHelpers;
} & {
  datamodel: DMMF.Datamodel;
}): string => {
  const enumModels = datamodel.enums;
  const modelModels = datamodel.models;
  const { model } = controller;
  const { entityName, createDtoName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const dataProviderName = `${entityClassName}DataProvider`;
  const kebabModelName = kebab(modelName).toLowerCase();

  // Convert to camelCase for SDK method names
  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  //jobAlertFrequency
  const editableFields = update.fields.filter(
    (field) =>
      field.kind === 'scalar' ||
      field.kind === 'enum' ||
      (field.kind === 'object' && field.relationName),
  );

  const getInputComponent = (field: (typeof editableFields)[0]): string => {
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

    const fieldName = field.relationName
      ? `Prisma.${entityClassName}ScalarFieldEnum.${field.relationFromFields?.[0]}`
      : `Prisma.${entityClassName}ScalarFieldEnum.${field.name}`;
    const label = field.relationName
      ? `$t('resource.name.${field.name}')`
      : `$t('resource.${entityClassName}.${field.name}')`;

    const multiline =
      field.dmmfField?.nativeType?.[0] === 'Text' ? ' multiline' : '';
    const required = field.dmmfField?.isRequired;
    const readonly = !editableFields.find((f) => f.name === field.name);
    let component = 'Input';
    if (multiline) {
      component = 'Textarea';
    }

    if (
      field.type === 'Int' ||
      field.type === 'Float' ||
      field.type === 'Decimal'
    ) {
      component = 'InputNumber';
    }

    if (field.relationName) {
      if (model.name === 'OpWorkJobTag') {
        //   console.dir(
        //     { f: modelModels.find((model) => model.name === field.name)?.fields },
        //     { depth: 20 },
        //   );
      }
      const camelFieldName =
        field.name.charAt(0).toLowerCase() + field.name.slice(1);
      const idField =
        modelModels
          .find((model) => model.name === field.name)
          ?.fields.find((f) => f.isId)?.name || 'id';
      const labelField =
        modelModels
          .find((model) => model.name === field.name)
          ?.fields.find(
            (f) =>
              !f.isId &&
              !f.relationName &&
              f.type === 'String' &&
              f.nativeType?.[0] !== 'Uuid',
          )?.name ||
        modelModels
          .find((model) => model.name === field.name)
          ?.fields.find(
            (f) => !f.isId && !f.relationName && f.nativeType?.[0] === 'Text',
          )?.name;
      return `
    {
      component: 'ApiSelect',
      ...getComponentProps<${field.name}>({
        findMany: (searchText?: string) => ${camelFieldName}ControllerFindMany({
          query: {
            perPage: 100,
            ...(searchText ? { searchText } : {})
          }
        }),
        getLabel: (item) => item.${labelField} || item.${idField},
      }),
      fieldName: ${fieldName},
      label: ${label},
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
      controlClass: 'w-full',
      labelWidth: 200${
        readonly
          ? `,
      componentProps: (values) => {
        return {
          disabled: !!values.id,
        };
      },
      dependencies: {
        show: (values) => {
          return !!values.id;
        },
        triggerFields: ['id'],
      },
      controlClass: 'w-full'
`
          : ''
      }
    }, `;
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
        fieldName: ${fieldName},
        label: ${label},
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
        controlClass: 'w-full',
        labelWidth: 200${
          readonly
            ? `,
      componentProps: (values) => {
        return {
          disabled: !!values.id,
        };
      },
      dependencies: {
        show: (values) => {
          return !!values.id;
        },
        triggerFields: ['id'],
      },`
            : ''
        }
      }, `;
      }
    }

    if (field.type === 'DateTime') {
      if (field.name.endsWith('Time')) {
        component = 'TimePicker';
      } else {
        component = 'DatePicker';
      }
    }

    if (field.type === 'Boolean') {
      return `    {
        component: 'RadioGroup',
          componentProps: {
          buttonStyle: 'solid',
            options: [
              { label: $t('common.yes'), value: true },
              { label: $t('common.no'), value: false },
            ],
              optionType: 'button',
      },
        defaultValue: false,
          fieldName: ${fieldName},
        label: ${label},
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
        controlClass: 'w-full',
        labelWidth: 200${
          readonly
            ? `,
      componentProps: (values) => {
        return {
          disabled: !!values.id,
        };
      },
      dependencies: {
        show: (values) => {
          return !!values.id;
        },
        triggerFields: ['id'],
      },`
            : ''
        }
      }, `;
    }
    return `    {
        component: '${component}',
          fieldName: ${fieldName},
        label: ${label},
      ${required ? `rules: 'required',` : ''}
      ${readonly ? `disabled: true,` : ''}
        controlClass: 'w-full',
        labelWidth: 200${
          readonly
            ? `,
      componentProps: (values) => {
        return {
          disabled: !!values.id,
        };
      },
      dependencies: {
        show: (values) => {
          return !!values.id;
        },
        triggerFields: ['id'],
      },`
            : ''
        }
      }, `;
  };

  const getColumnComponent = (field: (typeof editableFields)[0]): string => {
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

    const fieldName = field.relationName
      ? `Prisma.${entityClassName}ScalarFieldEnum.${field.relationFromFields?.[0]} `
      : `Prisma.${entityClassName}ScalarFieldEnum.${field.name} `;
    const label = field.relationName
      ? `$t('resource.name.${field.name}')`
      : `$t('resource.${entityClassName}.${field.name}')`;

    const multiline =
      field.dmmfField?.nativeType?.[0] === 'Text' ? ' multiline' : '';
    const required = field.dmmfField?.isRequired;
    const readonly = !editableFields.find((f) => f.name === field.name);

    if (field.kind === 'enum') {
      const enumModel = enumModels.find((model) => model.name === field.type);
      if (enumModel) {
        return `    {
        cellRender: {
          name: 'CellEnum',
          props:{
            options: [
              ${enumModel.values.map((value) => `          { value: '${value.name}', label: $t('resource.${field.type}.${value.name}').split(' - ')[0], },`).join('\n')}
            ],
          }
      },
        title: ${label},
        field: ${fieldName},
        sortable: true
      }, `;
      }
    }
    if (field.relationName) {
      const labelField =
        modelModels
          .find((model) => model.name === field.name)
          ?.fields.find(
            (f) =>
              !f.isId &&
              !f.relationName &&
              f.type === 'String' &&
              f.nativeType?.[0] !== 'Uuid',
          )?.name ||
        modelModels
          .find((model) => model.name === field.name)
          ?.fields.find(
            (f) => !f.isId && !f.relationName && f.nativeType?.[0] === 'Text',
          )?.name;
      return `    {
        title: $t('resource.name.${field.name}'),
        field: Prisma.${entityClassName}ScalarFieldEnum.${field.relationFromFields?.[0]} ,
        cellRender: {
          name: 'CellRender',
          props:{
            render: (row: any, column: any) => {
              return row.${field.name}?.${labelField} || row[column.field] || '';
            }
          }
        },
        sortable: true
      }, `;
    }
    if (field.name === 'id') {
      return `    {
        field: Prisma.${entityClassName}ScalarFieldEnum.id,
          title: $t('common.id'),
            sortable: true
      }, `;
    }
    if (field.name === 'createdAt') {
      return `    {
        field: Prisma.${entityClassName}ScalarFieldEnum.createdAt,
          title: $t('common.createdAt'),
            formatter: 'formatDateTime',
              sortable: true
      }, `;
    }
    if (field.name === 'updatedAt') {
      return `    {
        field: Prisma.${entityClassName}ScalarFieldEnum.updatedAt,
          title: $t('common.updatedAt'),
            formatter: 'formatDateTime',
              sortable: true
      }, `;
    }
    if (field.type === 'DateTime') {
      return `    {
        title: ${label},
        field: ${fieldName},
        formatter: 'formatDateTime',
          sortable: true
      }, `;
    }
    if (field.type === 'Boolean') {
      return `    {
        cellRender: {
          name: 'CellTag',
      },
        title: ${label},
        field: ${fieldName},
        sortable: true
      }, `;
    }

    return `    {
        title: ${label},
        field: ${fieldName},
        sortable: true
      }, `;
  };

  // Generate input fields for edit form (editable + read-only)
  const formFields = [
    ...editableFields.map((field) => {
      return getInputComponent(field);
    }),
  ].join('\n');

  const gridFields = [
    ...editableFields.map((field) => {
      return getColumnComponent(field);
    }),
  ].join('\n');

  const methods = [
    ...new Set(
      editableFields
        .filter((field) => field.relationName)
        .map((field) => {
          const camelFieldName =
            field.name.charAt(0).toLowerCase() + field.name.slice(1);
          return `type ${field.name}, ${camelFieldName}ControllerFindMany`;
        }),
    ),
  ].join(', ');
  return `import type { VbenFormSchema } from '#/adapter/form';
      import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
      ${methods ? `import  { ${methods}, type ${entityClassName} } from '#/generated/client';` : `import  {  type ${entityClassName} } from '#/generated/client';`}
    import { getComponentProps } from '#/adapter/get-component-props';
    import { Prisma } from '#/generated/prisma/browser';

    import { $t } from '#/locales';

    export function use${entityClassName}FormSchema(): VbenFormSchema[] {
      return [
        ${formFields}
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

    export function use${entityClassName}Columns < T = ${entityClassName}> (
      onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    ${gridFields}
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
`;
};
