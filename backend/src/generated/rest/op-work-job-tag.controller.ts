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
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkJobTagDto } from './op-work-job-tag.dto';
import { OpWorkJobTag } from './op-work-job-tag.entity';
import { CreateOpWorkJobTagDto } from './create-op-work-job-tag.dto';
import { UpdateOpWorkJobTagDto } from './update-op-work-job-tag.dto';

export class FindManyOpWorkJobTagArgs extends FindManyArgs {}

export class FindManyOpWorkJobTagResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobTagResponse {
  @ApiProperty({ type: () => [OpWorkJobTag] })
  items!: OpWorkJobTag[];

  @ApiProperty({ type: () => FindManyOpWorkJobTagResponseMeta })
  meta!: FindManyOpWorkJobTagResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-tag')
export class OpWorkJobTagController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobTagResponse })
  async findMany(@Query() args: FindManyOpWorkJobTagArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobTagScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobTagWhereInput: Prisma.OpWorkJobTagWhereInput = {
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
        items: await prisma.opWorkJobTag.findMany({
          where: opWorkJobTagWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobTag.count({
          where: opWorkJobTagWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobTagDto })
  async createOne(@Body() args: CreateOpWorkJobTagDto) {
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
    /*
    return await this.prismaservice.opWorkJobTag.create({
      data: {
        ...args,
      },
    });
    */
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobTagDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobTagDto,
  ) {
    return await this.prismaservice.opWorkJobTag.update({
      data: {
        ...args,
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkJobTag.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobTagDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJobTag.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
