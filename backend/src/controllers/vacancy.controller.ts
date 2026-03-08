import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, isUUID } from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import {
  OpWorkEmploymentType,
  OpWorkExperienceLevel,
  Prisma,
} from '../generated/prisma/client';
import { OpWorkJob } from '../generated/rest/op-work-job.entity';
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
import { NotificationService } from '../services/notification.service';

//
export class FindManyVacancyArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: () => [String] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  locations?: string[];

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  salaryMin?: number;

  @ApiProperty({
    enum: OpWorkEmploymentType,
    enumName: 'OpWorkEmploymentType',
    required: false,
    nullable: true,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(OpWorkEmploymentType, { each: true })
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  employmentTypes?: OpWorkEmploymentType[];

  @ApiProperty({
    enum: OpWorkExperienceLevel,
    enumName: 'OpWorkExperienceLevel',
    required: false,
    nullable: true,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(OpWorkExperienceLevel, { each: true })
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  experienceLevels?: OpWorkExperienceLevel[];

  @ApiPropertyOptional({ type: () => [String] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  skills?: string[];

  @ApiPropertyOptional({ type: () => [String] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    !value ? [] : !Array.isArray(value) ? value.split(',') : value,
  )
  tags?: string[];
}

export class FindManyVacancyResponseMeta extends FindManyResponseMeta {}
export class FindManyVacancyResponse {
  @ApiProperty({ type: () => [OpWorkJob] })
  items!: OpWorkJob[];

  @ApiProperty({ type: () => FindManyVacancyResponseMeta })
  meta!: FindManyVacancyResponseMeta;
}

//

@ApiTags('vacancy')
@Controller('vacancy')
export class VacancyController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get(':vacancy_id')
  @ApiOkResponse({ type: OpWorkJob })
  async findOne(
    @Param('vacancy_id', new ParseUUIDPipe()) jobId: string,
    @CurrentAppRequest() req: AppRequest,
  ) {
    const result = await this.prismaService.opWorkJob.findFirstOrThrow({
      include: {
        OpWorkApplication: {
          include: { OpWorkJobSeeker: { include: { OpWorkProfile: true } } },
        },
        OpWorkProfile: true,
        OpWorkEmployer: true,
        OpWorkJobSkill: { include: { OpWorkSkill: true } },
        ...(req.opWorkProfile.type === 'EMPLOYER'
          ? { opWorkJobTags: true }
          : {}),
      },
      where: {
        id: jobId,
        ...(req.opWorkProfile.type === 'EMPLOYER'
          ? {
              OpWorkProfile: { type: 'EMPLOYER', id: req.opWorkProfileId },
            }
          : {}),
      },
    });
    await this.notificationService.markAsReadAllWithAutoMarkReadAtIds(
      [result.id],
      req.opWorkProfileId,
    );
    return result;
  }

  @Get()
  @ApiOkResponse({ type: FindManyVacancyResponse })
  async findMany(
    @Query() args: FindManyVacancyArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .map(([key, value]) => {
        if (key === 'salary') {
          key = 'salaryMax';
        }
        return {
          ...(key in PrismaSdk.Prisma.OpWorkJobScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        };
      }, {});

    const opWorkJobWhereInput: Prisma.OpWorkJobWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { title: { contains: searchText, mode: 'insensitive' } },
              { description: { contains: searchText, mode: 'insensitive' } },
              { requirements: { contains: searchText, mode: 'insensitive' } },
              {
                responsibilities: { contains: searchText, mode: 'insensitive' },
              },
              { department: { contains: searchText, mode: 'insensitive' } },
              { salaryCurrency: { contains: searchText, mode: 'insensitive' } },
            ],
          }
        : {}),
      AND: [
        // locations
        ...(otherArgs.locations?.length && otherArgs.locations?.length > 0
          ? [{ location: { in: otherArgs.locations } }]
          : []),
        // salaryMin
        ...(otherArgs.salaryMin
          ? [{ salaryMin: { gte: otherArgs.salaryMin } }]
          : []),
        // employmentTypes
        ...(otherArgs.employmentTypes?.length &&
        otherArgs.employmentTypes?.length > 0
          ? [{ employmentType: { in: otherArgs.employmentTypes } }]
          : []),
        // experienceLevels
        ...(otherArgs.experienceLevels?.length &&
        otherArgs.experienceLevels?.length > 0
          ? [{ experienceLevel: { in: otherArgs.experienceLevels } }]
          : []),
        // skills
        ...(otherArgs.skills?.length && otherArgs.skills?.length > 0
          ? [
              {
                OpWorkJobSkill: {
                  some: { OpWorkSkill: { name: { in: otherArgs.skills } } },
                },
              },
            ]
          : []),
        // tags
        ...(req.opWorkProfile.type === 'EMPLOYER' &&
        otherArgs.tags?.length &&
        otherArgs.tags?.length > 0
          ? [
              {
                opWorkJobTags: {
                  some: { jobId: { in: otherArgs.tags } },
                },
              },
            ]
          : []),
      ],
      ...(req.opWorkProfile.type === 'EMPLOYER'
        ? {
            OpWorkProfile: { type: 'EMPLOYER', id: req.opWorkProfileId },
          }
        : {}),
    };

    return {
      items: await this.prismaService.opWorkJob.findMany({
        include: {
          OpWorkProfile: true,
          OpWorkEmployer: true,
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          ...(req.opWorkProfile.type === 'EMPLOYER'
            ? { opWorkJobTags: true }
            : {}),
        },
        where: opWorkJobWhereInput,
        take,
        skip,
        orderBy,
      }),
      meta: {
        totalResults: await this.prismaService.opWorkJob.count({
          where: opWorkJobWhereInput,
        }),
        curPage,
        perPage,
      },
    };
  }
}
