import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, isUUID } from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkNotificationType, Prisma } from '../generated/prisma/client';
import { OpWorkNotification } from '../generated/rest/op-work-notification.entity';
import {
  PRISMA_SERVICE,
  PrismaSdk,
  PrismaService,
} from '../services/prisma.service';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
} from '../types/prisma-types';
import { AppRequest } from '../types/request';

//
export class FindManyNotificationArgs extends FindManyArgs {
  @ApiProperty({
    type: 'boolean',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value !== undefined ? (value === 'true' ? true : false) : undefined,
  )
  isRead?: boolean | null;

  @ApiProperty({
    type: 'boolean',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value !== undefined ? (value === 'true' ? true : false) : undefined,
  )
  isArchived?: boolean | null;

  @ApiProperty({
    enum: OpWorkNotificationType,
    enumName: 'OpWorkNotificationType',
    required: false,
    nullable: true,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(OpWorkNotificationType, { each: true })
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  experienceLevels?: OpWorkNotificationType[];
}

export class FindManyNotificationResponse {
  @ApiProperty({ type: () => [OpWorkNotification] })
  items!: OpWorkNotification[];

  @ApiProperty({ type: () => FindManyResponseMeta })
  meta!: FindManyResponseMeta;
}

//

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyNotificationResponse })
  async findMany(
    @Query() args: FindManyNotificationArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

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

    const opWorkNotificationWhereInput: Prisma.OpWorkNotificationWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              {
                title: { contains: searchText, mode: 'insensitive' },
              },
              { message: { contains: searchText, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(otherArgs.isRead !== undefined
        ? { isRead: { equals: otherArgs.isRead } }
        : {}),
      ...(otherArgs.isArchived !== undefined
        ? { isArchived: { equals: otherArgs.isArchived } }
        : {}),
    };

    return {
      items: await this.prismaService.opWorkNotification.findMany({
        where: opWorkNotificationWhereInput,
        take,
        skip,
        orderBy,
      }),
      meta: {
        totalResults: await this.prismaService.opWorkNotification.count({
          where: opWorkNotificationWhereInput,
        }),
        curPage,
        perPage,
      },
    };
  }
}
