import { DMMF } from '@prisma/generator-helper';
import { camel, kebab, pascal, snake } from 'case';
import path from 'node:path';
import { WritableDeep } from 'type-fest';
import { logger } from '../utils';
import { DTO_IGNORE_MODEL } from './annotations';
import { computeModelParams } from './compute-model-params';
import { computeTypeParams } from './compute-type-params';
import { isAnnotatedWith } from './field-classifiers';
import { generateConnectDto } from './generate-connect-dto';
import { generateController } from './generate-controller';
import { generateCreateDto } from './generate-create-dto';
import { generateDataProvider } from './generate-data-provider';
import { generateEntity } from './generate-entity';
import { generateEnums } from './generate-enums';
import { generateForm } from './generate-form';
import { generateList } from './generate-list';
import { generatePlainDto } from './generate-plain-dto';
import { generateResourcesIndex } from './generate-resources';
import { generateUpdateDto } from './generate-update-dto';
import { makeHelpers } from './template-helpers';
import { Model, NamingStyle, WriteableFileSpecs } from './types';

interface RunParam {
  output: string;
  dmmf: WritableDeep<DMMF.Document>;
  exportRelationModifierClasses: boolean;
  outputToNestJsResourceStructure: boolean;
  flatResourceStructure: boolean;
  connectDtoPrefix: string;
  createDtoPrefix: string;
  updateDtoPrefix: string;
  dtoSuffix: string;
  entityPrefix: string;
  entitySuffix: string;
  fileNamingStyle: NamingStyle;
  classValidation: boolean;
  outputType: string;
  noDependencies: boolean;
  definiteAssignmentAssertion: boolean;
  requiredResponseApiProperty: boolean;
  prismaClientImportPath: string;
  outputApiPropertyType: boolean;
  generateFileTypes: string;
  generateControllers: boolean;
  generateDataProviders: boolean;
  generateForms: boolean;
  generateLists: boolean;
  frontendOutput?: string;
  wrapRelationsAsType: boolean;
  showDefaultValues: boolean;
}

export const run = ({
  output,
  dmmf,
  ...options
}: RunParam): WriteableFileSpecs[] => {
  const {
    exportRelationModifierClasses,
    outputToNestJsResourceStructure,
    flatResourceStructure,
    fileNamingStyle = 'camel',
    classValidation,
    outputType,
    noDependencies,
    definiteAssignmentAssertion,
    requiredResponseApiProperty,
    prismaClientImportPath,
    outputApiPropertyType,
    generateFileTypes,
    generateControllers = false,
    generateForms = false,
    generateLists = false,
    frontendOutput,
    wrapRelationsAsType,
    showDefaultValues,
    ...preAndSuffixes
  } = options;

  const transformers: Record<NamingStyle, (str: string) => string> = {
    camel,
    kebab,
    pascal,
    snake,
  };

  const transformFileNameCase = transformers[fileNamingStyle];

  const templateHelpers = makeHelpers({
    transformFileNameCase,
    transformClassNameCase: pascal,
    classValidation,
    outputType,
    noDependencies,
    definiteAssignmentAssertion,
    outputPath: output,
    prismaClientImportPath,
    requiredResponseApiProperty,
    outputApiPropertyType,
    wrapRelationsAsType,
    showDefaultValues,
    ...preAndSuffixes,
  });
  const allModels = dmmf.datamodel.models;

  const filteredTypes: Model[] = dmmf.datamodel.types
    .filter((model) => !isAnnotatedWith(model, DTO_IGNORE_MODEL))
    .map((model) => {
      // Determine base path for controller
      const kebabModelName = kebab(model.name).toLowerCase();
      const kebabModelNameArray = kebabModelName.split('-');
      const customNamespace =
        kebabModelNameArray[0].length > 3
          ? kebabModelNameArray[0]
          : kebabModelNameArray.slice(0, 2).join('-');
      const customName = (
        kebabModelNameArray[0].length > 3
          ? kebabModelNameArray.slice(1)
          : kebabModelNameArray.slice(2)
      ).join('-');
      return {
        ...model,
        custom: {
          namespace: customNamespace,
          name: customName,
        },
        output: {
          dto: outputToNestJsResourceStructure
            ? flatResourceStructure
              ? path.join(output, transformFileNameCase(model.name))
              : path.join(output, transformFileNameCase(model.name), 'dto')
            : output,
          entity: '',
        },
      };
    });

  if (generateFileTypes === 'entity' && filteredTypes.length) {
    throw new Error(
      `Generating only Entity files while having complex types is not possible. Set 'generateFileTypes' to 'all' or 'dto'.`,
    );
  }

  const filteredModels: Model[] = allModels
    .filter((model) => !isAnnotatedWith(model, DTO_IGNORE_MODEL))
    // adds `output` information for each model, so we can compute relative import paths
    // this assumes that NestJS resource modules (more specifically their folders on disk) are named as `transformFileNameCase(model.name)`
    .map((model) => {
      // Determine base path for controller
      const kebabModelName = kebab(model.name).toLowerCase();
      const kebabModelNameArray = kebabModelName.split('-');
      const customNamespace =
        kebabModelNameArray[0].length > 3
          ? kebabModelNameArray[0]
          : kebabModelNameArray.slice(0, 2).join('-');
      const customName = (
        kebabModelNameArray[0].length > 3
          ? kebabModelNameArray.slice(1)
          : kebabModelNameArray.slice(2)
      ).join('-');

      return {
        ...model,
        type: 'model',
        custom: {
          namespace: customNamespace,
          name: customName,
        },
        output: {
          dto: outputToNestJsResourceStructure
            ? flatResourceStructure
              ? path.join(output, transformFileNameCase(model.name))
              : path.join(output, transformFileNameCase(model.name), 'dto')
            : output,
          entity: outputToNestJsResourceStructure
            ? flatResourceStructure
              ? path.join(output, transformFileNameCase(model.name))
              : path.join(output, transformFileNameCase(model.name), 'entities')
            : output,
          frontend: frontendOutput
            ? path.join(frontendOutput, 'resource')
            : undefined,
        },
      };
    });

  const enumFiles: WriteableFileSpecs[] = [];
  if (noDependencies) {
    if (dmmf.datamodel.enums.length) {
      logger('Processing enums');
      enumFiles.push({
        fileName: path.join(output, 'enums.ts'),
        content: generateEnums(dmmf.datamodel.enums),
      });
    }
  }

  const typeFiles = filteredTypes.map((model) => {
    logger(`Processing Type ${model.name}`);

    const typeParams = computeTypeParams({
      model,
      allModels: filteredTypes,
      templateHelpers,
    });

    // generate create-model.dto.ts
    const createDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.createDtoFilename(model.name, true),
      ),
      content: generateCreateDto({
        ...typeParams.create,
        exportRelationModifierClasses,
        templateHelpers,
      }),
    };

    // generate update-model.dto.ts
    const updateDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.updateDtoFilename(model.name, true),
      ),
      content: generateUpdateDto({
        ...typeParams.update,
        exportRelationModifierClasses,
        templateHelpers,
      }),
    };

    // generate model.dto.ts
    const plainDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.plainDtoFilename(model.name, true),
      ),
      content: generatePlainDto({
        ...typeParams.plain,
        templateHelpers,
      }),
    };

    return [createDto, updateDto, plainDto];
  });

  const controllerInfo: { name: string; fileName: string }[] = [];

  const modelFiles = filteredModels.map((model) => {
    logger(`Processing Model ${model.name}`);

    const modelParams = computeModelParams({
      model,
      allModels: [...filteredTypes, ...filteredModels],
      templateHelpers,
    });

    // generate connect-model.dto.ts
    const connectDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.connectDtoFilename(model.name, true),
      ),
      content: generateConnectDto({
        ...modelParams.connect,
        exportRelationModifierClasses,
        templateHelpers,
      }),
    };

    // generate create-model.dto.ts
    const createDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.createDtoFilename(model.name, true),
      ),
      content: generateCreateDto({
        ...modelParams.create,
        exportRelationModifierClasses,
        templateHelpers,
      }),
    };
    // TODO generate create-model.struct.ts

    // generate update-model.dto.ts
    const updateDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.updateDtoFilename(model.name, true),
      ),
      content: generateUpdateDto({
        ...modelParams.update,
        exportRelationModifierClasses,
        templateHelpers,
      }),
    };
    // TODO generate update-model.struct.ts

    // generate model.entity.ts
    const entity = {
      fileName: path.join(
        model.output.entity,
        templateHelpers.entityFilename(model.name, true),
      ),
      content: generateEntity({
        ...modelParams.entity,
        templateHelpers,
      }),
    };
    // TODO generate model.struct.ts

    // generate model.dto.ts
    const plainDto = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.plainDtoFilename(model.name, true),
      ),
      content: generatePlainDto({
        ...modelParams.plain,
        templateHelpers,
      }),
    };

    // generate model.controller.ts
    const controller = {
      fileName: path.join(
        model.output.dto,
        templateHelpers.controllerFilename(model.name, true),
      ),
      content: generateController({
        ...modelParams.controller,
        templateHelpers,
      }),
    };

    // generate model.data-provider.ts
    const dataProvider = {
      fileName: model.output.frontend
        ? path.join(
            model.output.frontend,
            model.name,
            templateHelpers.dataProviderFilename(model.name, true),
          )
        : path.join(
            model.output.dto,
            templateHelpers.dataProviderFilename(model.name, true),
          ),
      content: generateDataProvider({
        ...modelParams,
        templateHelpers,
      }),
    };

    // generate model.list.tsx
    const list = {
      fileName: model.output.frontend
        ? path.join(
            model.output.frontend,
            model.name,
            templateHelpers.listFilename(model.name, true),
          )
        : path.join(
            model.output.dto,
            templateHelpers.listFilename(model.name, true),
          ),
      content: generateList({
        ...modelParams,
        templateHelpers,
      }),
    };

    // generate model.form.tsx
    const form = {
      fileName: model.output.frontend
        ? path.join(
            model.output.frontend,
            model.name,
            templateHelpers.formFilename(model.name, true),
          )
        : path.join(
            model.output.dto,
            templateHelpers.formFilename(model.name, true),
          ),
      content: generateForm({
        ...modelParams,
        templateHelpers,
      }),
    };

    // Collect controller class name and filename for controllers.ts export
    if (generateControllers) {
      const controllerClassName = `${templateHelpers.entityName(model.name)}Controller`;
      const controllerFileName = templateHelpers
        .controllerFilename(model.name, false)
        .replace('.ts', '');
      controllerInfo.push({
        name: controllerClassName,
        fileName: controllerFileName,
      });
    }

    let allFiles: {
      fileName: string;
      content: string;
    }[] = [];
    /* const dtoFiles = [connectDto, createDto, updateDto, entity, plainDto];
    const filesWithController = generateControllers
      ? [...baseFiles, controller]
      : baseFiles;
    const filesWithDataProvider = [...filesWithController, dataProvider];
    const filesWithList = generateLists
      ? [...filesWithDataProvider, list]
      : filesWithDataProvider;
    const filesWithForm = generateForms
      ? [...filesWithList, form]
      : filesWithList;
*/
    if (generateFileTypes === 'all' || generateFileTypes === 'dto') {
      allFiles = [
        connectDto,
        createDto,
        updateDto,
        entity,
        plainDto,
        ...allFiles,
      ];
    }
    if (generateFileTypes === 'all' || generateFileTypes === 'entity') {
      allFiles = [entity, ...allFiles];
    }

    if (generateFileTypes === 'all' || generateControllers) {
      allFiles = [controller, ...allFiles];
    }

    if (generateForms || generateLists) {
      allFiles = [dataProvider, list, form, ...allFiles];
    }
    return allFiles;
  });

  // Generate additional files
  const additionalFiles = [];

  // Generate resources.ts file if Forms and Lists were generated
  if (generateForms && generateLists && frontendOutput) {
    const namespaces = new Set(filteredModels.map((m) => m.custom.namespace));
    for (const namespace of namespaces) {
      const resourcesFile = {
        fileName: path.join(
          frontendOutput,
          `../router/routes/modules/${namespace}.ts`,
        ),
        content: generateResourcesIndex({
          models: filteredModels
            .filter((m) => m.custom.namespace === namespace)
            .map((m) => m),
          templateHelpers,
          frontendOutput,
        }),
      };
      additionalFiles.push(resourcesFile);
    }
  }

  // Generate controllers.ts file if controllers were generated
  if (generateControllers && controllerInfo.length > 0) {
    // Generate individual imports for each controller
    const importStatements = controllerInfo
      .map((info) => `import { ${info.name} } from './${info.fileName}';`)
      .join('\n');

    const controllerNames = controllerInfo.map((info) => info.name);
    const controllersExport = `${importStatements}

export const CONTROLLERS = [
  ${controllerNames.join(',\n  ')},
];
`;

    additionalFiles.push({
      fileName: path.join(output, 'controllers.ts'),
      content: controllersExport,
    });
  }

  return [...typeFiles, ...modelFiles, ...enumFiles, ...additionalFiles].flat();
};
