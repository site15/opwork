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
import { OpWorkJobSeekerDto } from './op-work-job-seeker.dto';
import { OpWorkJobSeeker } from './op-work-job-seeker.entity';
import { CreateOpWorkJobSeekerDto } from './create-op-work-job-seeker.dto';
import { UpdateOpWorkJobSeekerDto } from './update-op-work-job-seeker.dto';

export class FindManyOpWorkJobSeekerArgs extends FindManyArgs {}

export class FindManyOpWorkJobSeekerResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobSeekerResponse {
  @ApiProperty({ type: () => [OpWorkJobSeeker] })
  items!: OpWorkJobSeeker[];

  @ApiProperty({ type: () => FindManyOpWorkJobSeekerResponseMeta })
  meta!: FindManyOpWorkJobSeekerResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-seeker')
export class OpWorkJobSeekerController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSeekerResponse })
  async findMany(@Query() args: FindManyOpWorkJobSeekerArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobSeekerScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobSeekerWhereInput: Prisma.OpWorkJobSeekerWhereInput = {
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
        items: await prisma.opWorkJobSeeker.findMany({
          where: opWorkJobSeekerWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobSeeker.count({
          where: opWorkJobSeekerWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobSeekerDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkJobSeekerDto,
  ) {
    return await this.prismaservice.opWorkJobSeeker.create({
      data: {
        ...args,

        profileId: req.currentProfileId,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobSeekerDto,
  ) {
    return await this.prismaservice.opWorkJobSeeker.update({
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
    await this.prismaservice.opWorkJobSeeker.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJobSeeker.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
