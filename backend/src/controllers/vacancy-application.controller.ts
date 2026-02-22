import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  isUUID,
  MaxLength,
} from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkApplicationStatus, Prisma } from '../generated/prisma/client';
import { OpWorkJob } from '../generated/rest/op-work-job.entity';
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
import { AppRequest, getAppRequestData } from '../types/request';
import { StatusResponse } from '../types/status-response';

//
export class FindManyVacanyApplicationArgs extends FindManyArgs {
  @ApiProperty({
    enum: OpWorkApplicationStatus,
    enumName: 'OpWorkApplicationStatus',
    required: false,
    nullable: true,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(OpWorkApplicationStatus, { each: true })
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  opWorkApplicationStatuses?: OpWorkApplicationStatus[];
}

export class FindManyVacanyApplicationResponseMeta extends FindManyResponseMeta {}
export class FindManyVacanyApplicationResponse {
  @ApiProperty({ type: () => [OpWorkJob] })
  items!: OpWorkJob[];

  @ApiProperty({ type: () => FindManyVacanyApplicationResponseMeta })
  meta!: FindManyVacanyApplicationResponseMeta;
}

//

export class VacanyApplicationApplyArgs {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4', { each: true })
  jobSeekerId!: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  coverLetter?: string;
}

//

export class VacanyApplicationChangeStatusArgs {
  @ApiProperty({
    enum: OpWorkApplicationStatus,
    enumName: 'OpWorkApplicationStatus',
    required: false,
  })
  @IsOptional()
  @IsEnum(OpWorkApplicationStatus)
  status?: OpWorkApplicationStatus;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  statusNotes?: string | null;
}

//

@ApiTags('vacancy')
@Controller('vacancy')
export class VacanyApplicationController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  @HttpCode(200)
  @Post(':vacancy_id/apply')
  @ApiOkResponse({ type: StatusResponse })
  async apply(
    @Param('vacancy_id', new ParseUUIDPipe()) vacancyId: string,
    @Body() args: VacanyApplicationApplyArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    const createdApplication =
      await this.prismaService.opWorkApplication.create({
        data: {
          jobSeekerId: args.jobSeekerId,
          profileId: req.opWorkProfileId,
          coverLetter: args.coverLetter,
          jobId: vacancyId,
          status: OpWorkApplicationStatus.PENDING,
          appliedAt: new Date(),
        },
      });
    const updatedJob = await this.prismaService.opWorkJob.update({
      where: { id: vacancyId },
      data: { applicationsCount: { increment: 1 } },
    });
    await this.notificationService.create({
      profileId: updatedJob.profileId,
      type: 'APPLICATION_RECEIVED',
      title: 'New Application Received',
      message: `You have received a new application for your job listing.`,
      data: {
        class: 'VacanyApplicationController',
        method: 'apply',
        options: {
          params: { vacancyId },
          body: args,
          request: getAppRequestData(req),
        },
      },
      autoMarkReadAtIds: [createdApplication.id],
    });
    return { message: 'ok' };
  }

  @Put(':vacancy_id/applications/:id/change-status')
  @ApiOkResponse({ type: StatusResponse })
  async changeStatus(
    @Param('vacancy_id', new ParseUUIDPipe()) vacancyId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: VacanyApplicationChangeStatusArgs,
  ) {
    await this.prismaService.opWorkApplication.update({
      data: {
        status: args.status,
        statusNotes: args.statusNotes,
        statusUpdatedAt: new Date(),
      },
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':vacancy_id/applications')
  @ApiOkResponse({ type: FindManyVacanyApplicationResponse })
  async findMany(
    @Param('vacancy_id', new ParseUUIDPipe()) vacancyId: string,
    @Query() args: FindManyVacanyApplicationArgs,
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
          ...(key in PrismaSdk.Prisma.OpWorkApplicationScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkApplicationWhereInput: Prisma.OpWorkApplicationWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { coverLetter: { contains: searchText, mode: 'insensitive' } },
              { resumeUrl: { contains: searchText, mode: 'insensitive' } },
              { portfolioUrl: { contains: searchText, mode: 'insensitive' } },
              { statusNotes: { contains: searchText, mode: 'insensitive' } },
            ],
          }
        : {}),
      AND: [
        // opWorkApplicationStatuses
        ...(otherArgs.opWorkApplicationStatuses?.length &&
        otherArgs.opWorkApplicationStatuses?.length > 0
          ? [
              {
                status: {
                  in: otherArgs.opWorkApplicationStatuses,
                },
              },
            ]
          : []),
      ],
      OpWorkJob: { id: vacancyId },
    };

    const result = {
      items: await this.prismaService.opWorkApplication.findMany({
        include: {
          OpWorkJobSeeker: { include: { OpWorkProfile: true } },
          OpWorkJob: true,
        },
        where: opWorkApplicationWhereInput,
        take,
        skip,
        orderBy,
      }),
      meta: {
        totalResults: await this.prismaService.opWorkApplication.count({
          where: opWorkApplicationWhereInput,
        }),
        curPage,
        perPage,
      },
    };
    await this.notificationService.markAsReadAllWithAutoMarkReadAtIds(
      result.items.map((item) => item.id),
      req.opWorkProfileId,
    );
    return result;
  }
}
