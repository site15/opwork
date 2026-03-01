import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Logger,
  MessageEvent,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  isUUID,
} from 'class-validator';
import { filter, map, Observable, tap } from 'rxjs';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkNotificationType, Prisma } from '../generated/prisma/client';
import { OpWorkNotification } from '../generated/rest/op-work-notification.entity';
import { NotificationService } from '../services/notification.service';
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
import { StatusResponse } from '../types/status-response';

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

export class NotificationMarkAsReadArgs {
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  ids!: string[];
}

//

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  private logger = new Logger(NotificationController.name);

  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  @HttpCode(200)
  @Post('mark-as-read')
  @ApiOkResponse({ type: StatusResponse })
  async markAsRead(
    @Body() args: NotificationMarkAsReadArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    this.notificationService.markAsRead(args.ids, req.opWorkProfileId);
    return { message: 'ok' };
  }

  @HttpCode(200)
  @Post('mark-as-archived')
  @ApiOkResponse({ type: StatusResponse })
  async markAsArchived(
    @Body() args: NotificationMarkAsReadArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    this.notificationService.markAsArchived(args.ids, req.opWorkProfileId);
    return { message: 'ok' };
  }

  @Sse('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  stream(@CurrentAppRequest() req: AppRequest): Observable<MessageEvent> {
    this.logger.log(`Stream requested for ${req.authUserId}`);
    return this.notificationService.events.pipe(
      tap((e) => this.logger.log(`Event received: ${JSON.stringify(e)}`)),
      filter(
        (e) => !!(req.authUserId && e.OpWorkProfile?.userId === req.authUserId),
      ),
      tap((e) => this.logger.log(`Event filtered: ${JSON.stringify(e)}`)),
      map(
        (e) => ({ data: e, type: 'OpWorkNotification' }) satisfies MessageEvent,
      ),
    );
  }

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
      profileId: req.opWorkProfileId || null,
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
