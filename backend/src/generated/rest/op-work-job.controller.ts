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
import { OpWorkJobDto } from './op-work-job.dto';
import { OpWorkJob } from './op-work-job.entity';
import { CreateOpWorkJobDto } from './create-op-work-job.dto';
import { UpdateOpWorkJobDto } from './update-op-work-job.dto';

export class FindManyOpWorkJobArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  employerId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;}

export class FindManyOpWorkJobResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobResponse {
  @ApiProperty({ type: () => [OpWorkJob] })
  items!: OpWorkJob[];

  @ApiProperty({ type: () => FindManyOpWorkJobResponseMeta })
  meta!: FindManyOpWorkJobResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job')
export class OpWorkJobController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobResponse })
  async findMany(@Query() args: FindManyOpWorkJobArgs) {
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
{ responsibilities: { contains: searchText, mode: 'insensitive' } },
{ department: { contains: searchText, mode: 'insensitive' } },
{ salaryCurrency: { contains: searchText, mode: 'insensitive' } },
{ location: { contains: searchText, mode: 'insensitive' } }
            ],
            AND: [
              
          ...(isUUID(otherArgs.employerId)
            ? [{ employerId: { equals: otherArgs.employerId } }]
            : []),

          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJob.findMany({
          include:{
OpWorkEmployer: true,
OpWorkProfile: true
          },
          where: opWorkJobWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJob.count({
          where: opWorkJobWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobDto })
  async createOne(
    @Body() args: CreateOpWorkJobDto,
  ) {    
    return await this.prismaService.opWorkJob.create({
      data: { 
        ...args,
        OpWorkEmployer:{connect:{id:args.OpWorkEmployer?.connect.id}},
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobDto,
  ) {
    return await this.prismaService.opWorkJob.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
        ...(!args.OpWorkEmployer?{OpWorkEmployer:undefined}:{OpWorkEmployer: { connect: { id: args.OpWorkEmployer?.connect.id } }}),
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkJob.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJob.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
