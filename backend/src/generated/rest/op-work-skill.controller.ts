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
import { OpWorkSkillDto } from './op-work-skill.dto';
import { OpWorkSkill } from './op-work-skill.entity';
import { CreateOpWorkSkillDto } from './create-op-work-skill.dto';
import { UpdateOpWorkSkillDto } from './update-op-work-skill.dto';

export class FindManyOpWorkSkillArgs extends FindManyArgs {}

export class FindManyOpWorkSkillResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSkillResponse {
  @ApiProperty({ type: () => [OpWorkSkill] })
  items!: OpWorkSkill[];

  @ApiProperty({ type: () => FindManyOpWorkSkillResponseMeta })
  meta!: FindManyOpWorkSkillResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/skill')
export class OpWorkSkillController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSkillResponse })
  async findMany(@Query() args: FindManyOpWorkSkillArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSkillScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSkillWhereInput: Prisma.OpWorkSkillWhereInput = {
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
        items: await prisma.opWorkSkill.findMany({
          where: opWorkSkillWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSkill.count({
          where: opWorkSkillWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSkillDto })
  async createOne(@Body() args: CreateOpWorkSkillDto) {
    return await this.prismaservice.opWorkSkill.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSkillDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSkillDto,
  ) {
    return await this.prismaservice.opWorkSkill.update({
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
    await this.prismaservice.opWorkSkill.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSkillDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkSkill.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
