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
import { OpWorkJobSkillDto } from './op-work-job-skill.dto';
import { OpWorkJobSkill } from './op-work-job-skill.entity';
import { CreateOpWorkJobSkillDto } from './create-op-work-job-skill.dto';
import { UpdateOpWorkJobSkillDto } from './update-op-work-job-skill.dto';

export class FindManyOpWorkJobSkillArgs extends FindManyArgs {}

export class FindManyOpWorkJobSkillResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobSkillResponse {
  @ApiProperty({ type: () => [OpWorkJobSkill] })
  items!: OpWorkJobSkill[];

  @ApiProperty({ type: () => FindManyOpWorkJobSkillResponseMeta })
  meta!: FindManyOpWorkJobSkillResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-skill')
export class OpWorkJobSkillController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSkillResponse })
  async findMany(@Query() args: FindManyOpWorkJobSkillArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobSkillScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobSkillWhereInput: Prisma.OpWorkJobSkillWhereInput = {
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
        items: await prisma.opWorkJobSkill.findMany({
          where: opWorkJobSkillWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobSkill.count({
          where: opWorkJobSkillWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobSkillDto })
  async createOne(
    @Body() args: CreateOpWorkJobSkillDto,
  ) {    
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobSkillDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobSkillDto,
  ) {
    return await this.prismaservice.opWorkJobSkill.update({
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
    await this.prismaservice.opWorkJobSkill.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSkillDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJobSkill.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
