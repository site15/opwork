import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
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
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isUUID,
  MaxLength,
} from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import {
  OpWorkApplicationStatus,
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
import { StatusResponse } from '../types/status-response';

//
export class FindManyVacanciesArgs extends FindManyArgs {
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
}

export class FindManyVacanciesResponseMeta extends FindManyResponseMeta {}
export class FindManyVacanciesResponse {
  @ApiProperty({ type: () => [OpWorkJob] })
  items!: OpWorkJob[];

  @ApiProperty({ type: () => FindManyVacanciesResponseMeta })
  meta!: FindManyVacanciesResponseMeta;
}

//

export class VacanciesApplyArgs {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
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

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @HttpCode(200)
  @Post(':job_id')
  @ApiOkResponse({ type: StatusResponse })
  async apply(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
    @Body() args: VacanciesApplyArgs,
    @CurrentAppRequest() req: AppRequest,
  ) {
    await this.prismaService.opWorkApplication.create({
      data: {
        jobSeekerId: args.jobSeekerId,
        profileId: req.opWorkProfileId,
        coverLetter: args.coverLetter,
        jobId: jobId,
        status: OpWorkApplicationStatus.PENDING,
        appliedAt: new Date(),
      },
    });
    await this.prismaService.opWorkJob.update({
      where: { id: jobId },
      data: { applicationsCount: { increment: 1 } },
    });
    return { message: 'ok' };
  }

  @Get()
  @ApiOkResponse({ type: FindManyVacanciesResponse })
  async findMany(
    @Query() args: FindManyVacanciesArgs,
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
          ...(key in PrismaSdk.Prisma.OpWorkJobScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

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
      ],
    };

    return {
      items: await this.prismaService.opWorkJob.findMany({
        include: {
          OpWorkEmployer: true,
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          OpWorkApplication: { where: { profileId: req.opWorkProfileId } },
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
