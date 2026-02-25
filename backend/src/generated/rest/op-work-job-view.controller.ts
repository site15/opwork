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
import { OpWorkJobViewDto } from './op-work-job-view.dto';
import { OpWorkJobView } from './op-work-job-view.entity';
import { CreateOpWorkJobViewDto } from './create-op-work-job-view.dto';
import { UpdateOpWorkJobViewDto } from './update-op-work-job-view.dto';

export class FindManyOpWorkJobViewArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobId?: string;}

export class FindManyOpWorkJobViewResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobViewResponse {
  @ApiProperty({ type: () => [OpWorkJobView] })
  items!: OpWorkJobView[];

  @ApiProperty({ type: () => FindManyOpWorkJobViewResponseMeta })
  meta!: FindManyOpWorkJobViewResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-view')
export class OpWorkJobViewController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobViewResponse })
  async findMany(@Query() args: FindManyOpWorkJobViewArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .map(
        ([key, value]) => ({
          ...(key in PrismaSdk.Prisma.OpWorkJobViewScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobViewWhereInput: Prisma.OpWorkJobViewWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { ipAddress: { contains: searchText, mode: 'insensitive' } },
{ userAgent: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),

          ...(isUUID(otherArgs.jobId)
            ? [{ jobId: { equals: otherArgs.jobId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobView.findMany({
          include:{
OpWorkProfile: true,
OpWorkJob: true
          },
          where: opWorkJobViewWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobView.count({
          where: opWorkJobViewWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobViewDto })
  async createOne(
    @Body() args: CreateOpWorkJobViewDto,
  ) {    
    return await this.prismaService.opWorkJobView.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}},
        OpWorkJob:{connect:{id:args.OpWorkJob?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobViewDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobViewDto,
  ) {
    return await this.prismaService.opWorkJobView.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: args.OpWorkProfile?.connect
          ? { connect: { id: args.OpWorkProfile?.connect.id } }
          : { disconnect: true }}),
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
    await this.prismaService.opWorkJobView.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobViewDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJobView.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
