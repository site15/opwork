import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, isUUID } from 'class-validator';
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';
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
import { AppRequest } from '../types/request';
import { OpWorkApplication } from '../generated/rest/op-work-application.entity';

//
export class FindManyResumeApplicationArgs extends FindManyArgs {
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

export class FindManyResumeApplicationResponseMeta extends FindManyResponseMeta {}
export class FindManyResumeApplicationResponse {
  @ApiProperty({ type: () => [OpWorkApplication] })
  items!: OpWorkApplication[];

  @ApiProperty({ type: () => FindManyResumeApplicationResponseMeta })
  meta!: FindManyResumeApplicationResponseMeta;
}

//

@ApiTags('resume')
@Controller('resume')
export class ResumeApplicationController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  @CheckOpWorkUserTypes([
    {
      types: ['SPECIALIST'],
    },
  ])
  @Get('applications')
  @ApiOkResponse({ type: FindManyResumeApplicationResponse })
  async findMany(
    @Query() args: FindManyResumeApplicationArgs,
    @CurrentAppRequest() req: AppRequest,
  ): Promise<FindManyResumeApplicationResponse> {
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
      profileId: req.opWorkProfileId,
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
