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
import { OpWorkSavedSearchDto } from './op-work-saved-search.dto';
import { OpWorkSavedSearch } from './op-work-saved-search.entity';
import { CreateOpWorkSavedSearchDto } from './create-op-work-saved-search.dto';
import { UpdateOpWorkSavedSearchDto } from './update-op-work-saved-search.dto';

export class FindManyOpWorkSavedSearchArgs extends FindManyArgs {}

export class FindManyOpWorkSavedSearchResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSavedSearchResponse {
  @ApiProperty({ type: () => [OpWorkSavedSearch] })
  items!: OpWorkSavedSearch[];

  @ApiProperty({ type: () => FindManyOpWorkSavedSearchResponseMeta })
  meta!: FindManyOpWorkSavedSearchResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/saved-search')
export class OpWorkSavedSearchController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSavedSearchResponse })
  async findMany(@Query() args: FindManyOpWorkSavedSearchArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSavedSearchScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSavedSearchWhereInput: Prisma.OpWorkSavedSearchWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { name: { contains: searchText, mode: 'insensitive' } },
{ query: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkSavedSearch.findMany({
          include:{
OpWorkProfile: true
          },
          where: opWorkSavedSearchWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSavedSearch.count({
          where: opWorkSavedSearchWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSavedSearchDto })
  async createOne(
    @Body() args: CreateOpWorkSavedSearchDto,
  ) {    
    return await this.prismaService.opWorkSavedSearch.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSavedSearchDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSavedSearchDto,
  ) {
    return await this.prismaService.opWorkSavedSearch.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
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
    await this.prismaService.opWorkSavedSearch.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSavedSearchDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkSavedSearch.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
