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
import { OpWorkSkillSynonymDto } from './op-work-skill-synonym.dto';
import { OpWorkSkillSynonym } from './op-work-skill-synonym.entity';
import { CreateOpWorkSkillSynonymDto } from './create-op-work-skill-synonym.dto';
import { UpdateOpWorkSkillSynonymDto } from './update-op-work-skill-synonym.dto';

export class FindManyOpWorkSkillSynonymArgs extends FindManyArgs {}

export class FindManyOpWorkSkillSynonymResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSkillSynonymResponse {
  @ApiProperty({ type: () => [OpWorkSkillSynonym] })
  items!: OpWorkSkillSynonym[];

  @ApiProperty({ type: () => FindManyOpWorkSkillSynonymResponseMeta })
  meta!: FindManyOpWorkSkillSynonymResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/skill-synonym')
export class OpWorkSkillSynonymController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSkillSynonymResponse })
  async findMany(@Query() args: FindManyOpWorkSkillSynonymArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSkillSynonymScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSkillSynonymWhereInput: Prisma.OpWorkSkillSynonymWhereInput = {
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
        items: await prisma.opWorkSkillSynonym.findMany({
          where: opWorkSkillSynonymWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSkillSynonym.count({
          where: opWorkSkillSynonymWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSkillSynonymDto })
  async createOne(
    @Body() args: CreateOpWorkSkillSynonymDto,
  ) {    
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSkillSynonymDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSkillSynonymDto,
  ) {
    return await this.prismaservice.opWorkSkillSynonym.update({
      data: {
        ...args,
        
        
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkSkillSynonym.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSkillSynonymDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkSkillSynonym.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
