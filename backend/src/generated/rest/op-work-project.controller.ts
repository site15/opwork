import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
import { isUUID } from 'class-validator';
import { CurrentAppRequest } from '../../decorators/current-app-request.decorator';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { AppRequest } from '../../types/request';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkProjectDto } from './op-work-project.dto';
import { OpWorkProject } from './op-work-project.entity';
import { CreateOpWorkProjectDto } from './create-op-work-project.dto';
import { UpdateOpWorkProjectDto } from './update-op-work-project.dto';

export class FindManyOpWorkProjectArgs extends FindManyArgs {}

export class FindManyOpWorkProjectResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkProjectResponse {
  @ApiProperty({ type: () => [OpWorkProject] })
  items!: OpWorkProject[];

  @ApiProperty({ type: () => FindManyOpWorkProjectResponseMeta })
  meta!: FindManyOpWorkProjectResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/project')
export class OpWorkProjectController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkProjectResponse })
  async findMany(@Query() args: FindManyOpWorkProjectArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkProjectScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkProjectWhereInput: Prisma.OpWorkProjectWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
            ],
          }
        : {}),
    };

    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkProject.findMany({
          where: opWorkProjectWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkProject.count({
          where: opWorkProjectWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkProjectDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkProjectDto,
  ) {
    return await this.prismaservice.opWorkProject.create({
      data: {
        ...args,

        profileId: req.currentProfileId,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkProjectDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkProjectDto,
  ) {
    return await this.prismaservice.opWorkProject.update({
      data: {
        ...args,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkProject.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkProjectDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkProject.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
