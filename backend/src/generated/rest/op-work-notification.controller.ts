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
import { OpWorkNotificationDto } from './op-work-notification.dto';
import { OpWorkNotification } from './op-work-notification.entity';
import { CreateOpWorkNotificationDto } from './create-op-work-notification.dto';
import { UpdateOpWorkNotificationDto } from './update-op-work-notification.dto';

export class FindManyOpWorkNotificationArgs extends FindManyArgs {}

export class FindManyOpWorkNotificationResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkNotificationResponse {
  @ApiProperty({ type: () => [OpWorkNotification] })
  items!: OpWorkNotification[];

  @ApiProperty({ type: () => FindManyOpWorkNotificationResponseMeta })
  meta!: FindManyOpWorkNotificationResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/notification')
export class OpWorkNotificationController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkNotificationResponse })
  async findMany(@Query() args: FindManyOpWorkNotificationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkNotificationScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkNotificationWhereInput: Prisma.OpWorkNotificationWhereInput = {
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
        items: await prisma.opWorkNotification.findMany({
          where: opWorkNotificationWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkNotification.count({
          where: opWorkNotificationWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkNotificationDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkNotificationDto,
  ) {
    return await this.prismaservice.opWorkNotification.create({
      data: {
        ...args,
        userId: req.userId,
        profileId: req.currentProfileId,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkNotificationDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkNotificationDto,
  ) {
    return await this.prismaservice.opWorkNotification.update({
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
    await this.prismaservice.opWorkNotification.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkNotificationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkNotification.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
