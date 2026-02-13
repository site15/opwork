import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Inject,
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
import { IsOptional, isUUID } from 'class-validator';
import {
  PRISMA_SERVICE,
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkSavedJobDto } from './op-work-saved-job.dto';
import { OpWorkSavedJob } from './op-work-saved-job.entity';
import { CreateOpWorkSavedJobDto } from './create-op-work-saved-job.dto';
import { UpdateOpWorkSavedJobDto } from './update-op-work-saved-job.dto';

export class FindManyOpWorkSavedJobArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobId?: string;}

export class FindManyOpWorkSavedJobResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSavedJobResponse {
  @ApiProperty({ type: () => [OpWorkSavedJob] })
  items!: OpWorkSavedJob[];

  @ApiProperty({ type: () => FindManyOpWorkSavedJobResponseMeta })
  meta!: FindManyOpWorkSavedJobResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/saved-job')
export class OpWorkSavedJobController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSavedJobResponse })
  async findMany(@Query() args: FindManyOpWorkSavedJobArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSavedJobScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSavedJobWhereInput: Prisma.OpWorkSavedJobWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { notes: { contains: searchText, mode: 'insensitive' } }
            ],
            AND: [
              
          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),

          ...(isUUID(otherArgs.jobId)
            ? [{ jobId: { equals: otherArgs.jobId } }]
            : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkSavedJob.findMany({
          include:{
OpWorkProfile: true,
OpWorkJob: true
          },
          where: opWorkSavedJobWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSavedJob.count({
          where: opWorkSavedJobWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSavedJobDto })
  async createOne(
    @Body() args: CreateOpWorkSavedJobDto,
  ) {    
    return await this.prismaService.opWorkSavedJob.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}},
        OpWorkJob:{connect:{id:args.OpWorkJob?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSavedJobDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSavedJobDto,
  ) {
    return await this.prismaService.opWorkSavedJob.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } }}),
        ...(!args.OpWorkJob?{OpWorkJob:undefined}:{OpWorkJob: { connect: { id: args.OpWorkJob?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkSavedJob.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSavedJobDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkSavedJob.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
