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
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkSearchHistoryDto } from './op-work-search-history.dto';
import { OpWorkSearchHistory } from './op-work-search-history.entity';
import { CreateOpWorkSearchHistoryDto } from './create-op-work-search-history.dto';
import { UpdateOpWorkSearchHistoryDto } from './update-op-work-search-history.dto';

export class FindManyOpWorkSearchHistoryArgs extends FindManyArgs {}

export class FindManyOpWorkSearchHistoryResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSearchHistoryResponse {
  @ApiProperty({ type: () => [OpWorkSearchHistory] })
  items!: OpWorkSearchHistory[];

  @ApiProperty({ type: () => FindManyOpWorkSearchHistoryResponseMeta })
  meta!: FindManyOpWorkSearchHistoryResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/search-history')
export class OpWorkSearchHistoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSearchHistoryResponse })
  async findMany(@Query() args: FindManyOpWorkSearchHistoryArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSearchHistoryScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSearchHistoryWhereInput: Prisma.OpWorkSearchHistoryWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkSearchHistory.findMany({
          where: opWorkSearchHistoryWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSearchHistory.count({
          where: opWorkSearchHistoryWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSearchHistoryDto })
  async createOne(
    @Body() args: CreateOpWorkSearchHistoryDto,
  ) {    
    return await this.prismaService.opWorkSearchHistory.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSearchHistoryDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSearchHistoryDto,
  ) {
    return await this.prismaService.opWorkSearchHistory.update({
      data: {
        ...args,
        
        
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
    await this.prismaService.opWorkSearchHistory.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSearchHistoryDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkSearchHistory.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
