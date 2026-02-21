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
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  isUUID,
} from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkExperienceLevel, Prisma } from '../generated/prisma/client';
import { OpWorkJobSeeker } from '../generated/rest/op-work-job-seeker.entity';
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
export class FindManyResumeArgs extends FindManyArgs {
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

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  salaryMax?: number;

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
  isOpenToWork?: boolean | null;
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
  isOpenToRemote?: boolean | null;
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
  isOpenToRelocation?: boolean | null;

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

export class FindManyResumeResponseMeta extends FindManyResponseMeta {}
export class FindManyResumeResponse {
  @ApiProperty({ type: () => [OpWorkJobSeeker] })
  items!: OpWorkJobSeeker[];

  @ApiProperty({ type: () => FindManyResumeResponseMeta })
  meta!: FindManyResumeResponseMeta;
}

//

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get(':resume_id')
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async findOne(
    @Param('resume_id', new ParseUUIDPipe()) resumeId: string,
    @CurrentAppRequest() req: AppRequest,
  ) {
    return await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
      include: {
        OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
        OpWorkEducation: true,
        OpWorkExperience: true,
        OpWorkProfile: true,
      },
      where: {
        id: resumeId,
      },
    });
  }

  @Get()
  @ApiOkResponse({ type: FindManyResumeResponse })
  async findMany(
    @Query() args: FindManyResumeArgs,
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

    const opWorkJobWhereInput: Prisma.OpWorkJobSeekerWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              {
                currentPosition: { contains: searchText, mode: 'insensitive' },
              },
              { currentCompany: { contains: searchText, mode: 'insensitive' } },
              { summary: { contains: searchText, mode: 'insensitive' } },
              { salaryCurrency: { contains: searchText, mode: 'insensitive' } },
            ],
          }
        : {}),
      // employmentTypes
      ...(otherArgs.isOpenToRelocation !== undefined
        ? { isOpenToRelocation: { equals: otherArgs.isOpenToRelocation } }
        : {}),
      ...(otherArgs.isOpenToRemote !== undefined
        ? { isOpenToRemote: { equals: otherArgs.isOpenToRemote } }
        : {}),
      ...(otherArgs.isOpenToWork !== undefined
        ? { isOpenToWork: { equals: otherArgs.isOpenToWork } }
        : {}),
      AND: [
        // locations
        {
          OR: otherArgs.locations?.map((location) => ({
            preferredLocations: {
              contains: location,
              mode: 'insensitive',
            },
          })),
        },
        // salaryMin
        ...(otherArgs.salaryMin
          ? [{ expectedSalary: { gte: otherArgs.salaryMin } }]
          : []),
        // salaryMax
        ...(otherArgs.salaryMax
          ? [{ expectedSalary: { lte: otherArgs.salaryMax } }]
          : []),
        // skills
        ...(otherArgs.skills?.length && otherArgs.skills?.length > 0
          ? [
              {
                OpWorkJobSeekerSkill: {
                  some: { OpWorkSkill: { name: { in: otherArgs.skills } } },
                },
              },
            ]
          : []),
      ],
    };

    return {
      items: await this.prismaService.opWorkJobSeeker.findMany({
        include: {
          OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
          OpWorkEducation: true,
          OpWorkExperience: true,
          OpWorkProfile: true,
        },
        where: opWorkJobWhereInput,
        take,
        skip,
        orderBy,
      }),
      meta: {
        totalResults: await this.prismaService.opWorkJobSeeker.count({
          where: opWorkJobWhereInput,
        }),
        curPage,
        perPage,
      },
    };
  }
}
