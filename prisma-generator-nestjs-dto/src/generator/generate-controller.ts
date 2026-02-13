import { kebab } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ControllerParams, ModelParams } from './types';
import { DMMF } from '@prisma/generator-helper';
import { create } from 'domain';

export const generateController = ({
  model,
  fields,
  imports,
  apiExtraModels,
  templateHelpers,
  modelParams,
  datamodel,
}: ControllerParams & {
  templateHelpers: TemplateHelpers;
  modelParams: ModelParams;
  datamodel: DMMF.Datamodel;
}): string => {
  const modelModels = datamodel.models;
  const { entityName, createDtoName, updateDtoName, plainDtoName } =
    templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const updateDtoClassName = updateDtoName(modelName);
  const plainDtoClassName = plainDtoName(modelName);

  const controllerName = `${entityClassName}Controller`;
  const serviceName = 'PrismaService';
  const camelServiceName = 'prismaService';
  const findManyArgsName = `FindMany${entityClassName}Args`;
  const findManyResponseName = `FindMany${entityClassName}Response`;
  const findManyResponseMetaName = `FindMany${entityClassName}ResponseMeta`;

  // Determine base path for controller
  const kebabModelName = kebab(modelName).toLowerCase();
  const kebabModelNameArray = kebabModelName.split('-');
  const apiTagName =
    kebabModelNameArray[0].length > 3
      ? kebabModelNameArray[0]
      : kebabModelNameArray.slice(0, 2).join('-');
  const basePath = `${apiTagName}/${(kebabModelNameArray[0].length > 3
    ? kebabModelNameArray.slice(1)
    : kebabModelNameArray.slice(2)
  ).join('-')}`;

  // Convert PascalCase model name to camelCase for Prisma calls
  const prismaModelName =
    modelName.charAt(0).toLowerCase() + modelName.slice(1);

  // Check if model has deletedAt field for soft delete support
  const hasDeletedAt = fields.some((f) => f.name === 'deletedAt');
  // Check if model has updatedAt field for automatic timestamp updates
  const hasUpdatedAt = fields.some((f) => f.name === 'updatedAt');
  if (prismaModelName === 'opWorkSearchHistory') {
    //   console.dir(fields, { depth: 20 });
  }
  const includes = modelParams.create.fields
    .filter((f) => f.relationName)
    .map((f) => `${f.name}: true`);
  //
  console.log([
    ...new Set([
      ...(modelParams.create.fields
        ?.filter(
          (f) =>
            !f.isId &&
            !f.relationName &&
            f.type === 'String' &&
            f.dmmfField?.nativeType?.[0] !== 'Uuid',
        )
        ?.map((f) => f.name) || []),
      ...(modelParams.create.fields
        ?.filter(
          (f) =>
            !f.isId &&
            !f.relationName &&
            f.dmmfField?.nativeType?.[0] === 'Text',
        )
        ?.map((f) => f.name) || []),
    ]),
  ]);

  const relationsDtoFields = (fields || [])
    .filter((f) => f.relationName && f.relationFromFields?.[0])
    .map(
      (f) => `
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  ${f.relationFromFields?.[0]}?: string;`,
    )
    .join('\n');
  const relationsAndWhere = (fields || [])
    .filter((f) => f.relationName && f.relationFromFields?.[0])
    .map(
      (f) => `
          ...(isUUID(otherArgs.${f.relationFromFields?.[0]})
            ? [{ ${f.relationFromFields?.[0]}: { equals: otherArgs.${f.relationFromFields?.[0]} } }]
            : []),`,
    )
    .join('\n');

  const searchTexts = [
    ...new Set([
      ...(modelParams.create.fields
        ?.filter(
          (f) =>
            !f.isId &&
            !f.relationName &&
            f.type === 'String' &&
            f.dmmfField?.nativeType?.[0] !== 'Uuid',
        )
        ?.map((f) => f.name) || []),
      ...(modelParams.create.fields
        ?.filter(
          (f) =>
            !f.isId &&
            !f.relationName &&
            f.dmmfField?.nativeType?.[0] === 'Text',
        )
        ?.map((f) => f.name) || []),
    ]),
  ]
    .map((s) => `{ ${s}: { contains: searchText, mode: 'insensitive' } }`)
    .join(',\n');
  return `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { IsOptional, isUUID } from 'class-validator';
import {
  PRISMA_SERVICE,
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { ${plainDtoClassName} } from './${templateHelpers.plainDtoFilename(modelName, false).replace('.ts', '')}';
import { ${entityClassName} } from './${templateHelpers.entityFilename(modelName, false).replace('.ts', '')}';
import { ${createDtoClassName} } from './${templateHelpers.createDtoFilename(modelName, false).replace('.ts', '')}';
import { ${updateDtoClassName} } from './${templateHelpers.updateDtoFilename(modelName, false).replace('.ts', '')}';

export class ${findManyArgsName} extends FindManyArgs {${relationsDtoFields}}

export class ${findManyResponseMetaName} extends FindManyResponseMeta {}

export class ${findManyResponseName} {
  @ApiProperty({ type: () => [${entityClassName}] })
  items!: ${entityClassName}[];

  @ApiProperty({ type: () => ${findManyResponseMetaName} })
  meta!: ${findManyResponseMetaName};
}

@ApiTags('${apiTagName}')
@Controller('${basePath}')
export class ${controllerName} {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly ${camelServiceName}: ${serviceName}
  ) {}

  @Get()
  @ApiOkResponse({ type: ${findManyResponseName} })
  async findMany(@Query() args: ${findManyArgsName}) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.${entityClassName}ScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const ${prismaModelName}WhereInput: Prisma.${entityClassName}WhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              ${searchTexts}
            ],
            ${
              relationsAndWhere
                ? `AND: [
              ${relationsAndWhere}
            ],`
                : ''
            }
          }
        : {}),
      ${hasDeletedAt ? 'deletedAt: null,' : ''}
    };

    const result = await this.${camelServiceName}.$transaction(async (prisma) => {
      return {
        items: await prisma.${prismaModelName}.findMany({
          ${
            includes.length
              ? `include:{
${includes.join(',\n')}
          },`
              : ''
          }
          where: ${prismaModelName}WhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.${prismaModelName}.count({
          where: ${prismaModelName}WhereInput,
        }),
      };
    });
    return {
      items: result.items,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: ${plainDtoClassName} })
  async createOne(
    @Body() args: ${createDtoClassName},
  ) {    
    return await this.${camelServiceName}.${prismaModelName}.create({
      data: { 
        ...args,
        ${modelParams.create.fields
          .filter((f) => f.relationName)
          .map(
            (f) =>
              `${f.name}:{connect:{id:args.${f.name}?.connect.${f.relationToFields?.[0]}}}`,
          ).join(`,
        `)}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ${plainDtoClassName} })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: ${updateDtoClassName},
  ) {
    return await this.${camelServiceName}.${prismaModelName}.update({
      data: {
        ...args,
        ${hasUpdatedAt ? 'updatedAt: new Date(),' : ''}
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
        ${modelParams.update.fields
          .filter((f) => f.relationName)
          .map((f) =>
            f.disconnectRelation
              ? `...(!args.${f.name}?{${f.name}:undefined}:{${f.name}: args.${f.name}?.connect
          ? { connect: { id: args.${f.name}?.connect.${f.relationToFields?.[0]} } }
          : { disconnect: true }})`
              : `...(!args.${f.name}?{${f.name}:undefined}:{${f.name}: { connect: { id: args.${f.name}?.connect.${f.relationToFields?.[0]} } }})`,
          ).join(`,
        `)}
      },
      where: {
        id,
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    ${
      hasDeletedAt
        ? `await this.${camelServiceName}.${prismaModelName}.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });`
        : `await this.${camelServiceName}.${prismaModelName}.delete({
      where: {
        id,
      },
    });`
    }
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ${plainDtoClassName} })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.${camelServiceName}.${prismaModelName}.findFirstOrThrow({
      where: {
        id,
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
      },
    });
  }
}
`;
};
