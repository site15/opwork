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
import { OpWorkEmployerDto } from './op-work-employer.dto';
import { OpWorkEmployer } from './op-work-employer.entity';
import { CreateOpWorkEmployerDto } from './create-op-work-employer.dto';
import { UpdateOpWorkEmployerDto } from './update-op-work-employer.dto';

export class FindManyOpWorkEmployerArgs extends FindManyArgs {}

export class FindManyOpWorkEmployerResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkEmployerResponse {
  @ApiProperty({ type: () => [OpWorkEmployer] })
  items!: OpWorkEmployer[];

  @ApiProperty({ type: () => FindManyOpWorkEmployerResponseMeta })
  meta!: FindManyOpWorkEmployerResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/employer')
export class OpWorkEmployerController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkEmployerResponse })
  async findMany(@Query() args: FindManyOpWorkEmployerArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkEmployerScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkEmployerWhereInput: Prisma.OpWorkEmployerWhereInput = {
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
        items: await prisma.opWorkEmployer.findMany({
          where: opWorkEmployerWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkEmployer.count({
          where: opWorkEmployerWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkEmployerDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkEmployerDto,
  ) {
    return await this.prismaservice.opWorkEmployer.create({
      data: {
        ...args,

        profileId: req.currentProfileId,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkEmployerDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkEmployerDto,
  ) {
    return await this.prismaservice.opWorkEmployer.update({
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
    await this.prismaservice.opWorkEmployer.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkEmployerDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkEmployer.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
