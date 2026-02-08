import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
import { isUUID } from 'class-validator';
import { CurrentAppRequest } from '../../decorators/current-app-request.decorator';import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { AppRequest } from '../../types/request';import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkJobDto } from './op-work-job.dto';
import { OpWorkJob } from './op-work-job.entity';
import { CreateOpWorkJobDto } from './create-op-work-job.dto';
import { UpdateOpWorkJobDto } from './update-op-work-job.dto';

export class FindManyOpWorkJobArgs extends FindManyArgs {}

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
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobResponse })
  async findMany(@Query() args: FindManyOpWorkJobArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

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
            ],
          }
        : {}),
      
    };

    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJob.findMany({
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
    return await this.prismaservice.opWorkJob.create({
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
    return await this.prismaservice.opWorkJob.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
        
        
        OpWorkEmployer: { connect: { id: args.OpWorkEmployer?.connect.id } },
        OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } }
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkJob.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJob.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
