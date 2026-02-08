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
import { OpWorkJobViewDto } from './op-work-job-view.dto';
import { OpWorkJobView } from './op-work-job-view.entity';
import { CreateOpWorkJobViewDto } from './create-op-work-job-view.dto';
import { UpdateOpWorkJobViewDto } from './update-op-work-job-view.dto';

export class FindManyOpWorkJobViewArgs extends FindManyArgs {}

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
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobViewResponse })
  async findMany(@Query() args: FindManyOpWorkJobViewArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
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
            ],
          }
        : {}),
      
    };

    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobView.findMany({
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
    return await this.prismaservice.opWorkJobView.create({
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
    return await this.prismaservice.opWorkJobView.update({
      data: {
        ...args,
        
        
        
        
        OpWorkProfile: args.OpWorkProfile?.connect
          ? { connect: { id: args.OpWorkProfile?.connect.id } }
          : { disconnect: true },
        OpWorkJob: { connect: { id: args.OpWorkJob?.connect.id } }
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkJobView.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobViewDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJobView.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
