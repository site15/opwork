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
import { OpWorkSavedJobDto } from './op-work-saved-job.dto';
import { OpWorkSavedJob } from './op-work-saved-job.entity';
import { CreateOpWorkSavedJobDto } from './create-op-work-saved-job.dto';
import { UpdateOpWorkSavedJobDto } from './update-op-work-saved-job.dto';

export class FindManyOpWorkSavedJobArgs extends FindManyArgs {}

export class FindManyOpWorkSavedJobResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSavedJobResponse {
  @ApiProperty({ type: () => [OpWorkSavedJob] })
  items!: OpWorkSavedJob[];

  @ApiProperty({ type: () => FindManyOpWorkSavedJobResponseMeta })
  meta!: FindManyOpWorkSavedJobResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/saved-job')
export class OpWorkSavedJobController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSavedJobResponse })
  async findMany(@Query() args: FindManyOpWorkSavedJobArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSavedJobScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSavedJobWhereInput: Prisma.OpWorkSavedJobWhereInput = {
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
        items: await prisma.opWorkSavedJob.findMany({
          where: opWorkSavedJobWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSavedJob.count({
          where: opWorkSavedJobWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSavedJobDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkSavedJobDto,
  ) {
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
    /*
    return await this.prismaservice.opWorkSavedJob.create({
      data: {
        ...args,

        profileId: req.currentProfileId,
      },
    });
    */
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSavedJobDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSavedJobDto,
  ) {
    return await this.prismaservice.opWorkSavedJob.update({
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
    await this.prismaservice.opWorkSavedJob.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSavedJobDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkSavedJob.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
