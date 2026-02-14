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
import { OpWorkJobTagDto } from './op-work-job-tag.dto';
import { OpWorkJobTag } from './op-work-job-tag.entity';
import { CreateOpWorkJobTagDto } from './create-op-work-job-tag.dto';
import { UpdateOpWorkJobTagDto } from './update-op-work-job-tag.dto';

export class FindManyOpWorkJobTagArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobId?: string;}

export class FindManyOpWorkJobTagResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobTagResponse {
  @ApiProperty({ type: () => [OpWorkJobTag] })
  items!: OpWorkJobTag[];

  @ApiProperty({ type: () => FindManyOpWorkJobTagResponseMeta })
  meta!: FindManyOpWorkJobTagResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-tag')
export class OpWorkJobTagController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobTagResponse })
  async findMany(@Query() args: FindManyOpWorkJobTagArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobTagScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobTagWhereInput: Prisma.OpWorkJobTagWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { name: { contains: searchText, mode: 'insensitive' } },
{ color: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.jobId)
            ? [{ jobId: { equals: otherArgs.jobId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobTag.findMany({
          include:{
OpWorkJob: true
          },
          where: opWorkJobTagWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobTag.count({
          where: opWorkJobTagWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobTagDto })
  async createOne(
    @Body() args: CreateOpWorkJobTagDto,
  ) {    
    return await this.prismaService.opWorkJobTag.create({
      data: { 
        ...args,
        OpWorkJob:{connect:{id:args.OpWorkJob?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobTagDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobTagDto,
  ) {
    return await this.prismaService.opWorkJobTag.update({
      data: {
        ...args,
        
        
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
    await this.prismaService.opWorkJobTag.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobTagDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJobTag.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
