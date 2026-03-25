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
import {
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
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
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';

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
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @IsUUID('4')
  jobSeekerId?: string;

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

  @CheckOpWorkUserTypes([
    {
      userTypes: ['JOB_SEEKER'],
    },
  ])
  @HttpCode(200)
  @Post(':job_id/apply')
  @ApiOkResponse({ type: StatusResponse })
  async apply(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
    @Body() args: VacanyApplicationApplyArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    const jobSeekerId = args.jobSeekerId || req.firstOpWorkJobSeeker?.id;
    if (!jobSeekerId) {
      throw new Error('Job seeker not found');
    }
    const createdApplication =
      await this.prismaService.opWorkApplication.create({
        data: {
          jobSeekerId,
          profileId: req.opWorkProfileId,
          coverLetter: args.coverLetter,
          jobId: jobId,
          status: OpWorkApplicationStatus.PENDING,
          appliedAt: new Date(),
        },
      });
    const updatedJob = await this.prismaService.opWorkJob.update({
      where: { id: jobId },
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
          params: { jobId },
          body: args,
          request: getAppRequestData(req),
        },
      },
      autoMarkReadAtIds: [createdApplication.id],
    });
    return { message: 'ok' };
  }

  @CheckOpWorkUserTypes([
    {
      userTypes: ['EMPLOYER'],
    },
  ])
  @Put(':job_id/applications/:id/change-status')
  @ApiOkResponse({ type: StatusResponse })
  async changeStatus(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: VacanyApplicationChangeStatusArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    await this.prismaService.opWorkApplication.update({
      data: {
        status: args.status,
        statusNotes: args.statusNotes,
        statusUpdatedAt: new Date(),
      },
      where: {
        id,
        OpWorkJob: { id: jobId, profileId: req.opWorkProfileId },
      },
    });
    return { message: 'ok' };
  }

  @CheckOpWorkUserTypes([
    {
      userTypes: ['EMPLOYER'],
    },
  ])
  @Get(':job_id/applications')
  @ApiOkResponse({ type: FindManyVacanyApplicationResponse })
  async findMany(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
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
      OpWorkJob: { id: jobId, profileId: req.opWorkProfileId },
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
