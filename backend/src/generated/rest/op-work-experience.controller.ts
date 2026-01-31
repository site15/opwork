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
import { OpWorkExperienceDto } from './op-work-experience.dto';
import { OpWorkExperience } from './op-work-experience.entity';
import { CreateOpWorkExperienceDto } from './create-op-work-experience.dto';
import { UpdateOpWorkExperienceDto } from './update-op-work-experience.dto';

export class FindManyOpWorkExperienceArgs extends FindManyArgs {}

export class FindManyOpWorkExperienceResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkExperienceResponse {
  @ApiProperty({ type: () => [OpWorkExperience] })
  items!: OpWorkExperience[];

  @ApiProperty({ type: () => FindManyOpWorkExperienceResponseMeta })
  meta!: FindManyOpWorkExperienceResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/experience')
export class OpWorkExperienceController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkExperienceResponse })
  async findMany(@Query() args: FindManyOpWorkExperienceArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkExperienceScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkExperienceWhereInput: Prisma.OpWorkExperienceWhereInput = {
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
        items: await prisma.opWorkExperience.findMany({
          where: opWorkExperienceWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkExperience.count({
          where: opWorkExperienceWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkExperienceDto })
  async createOne(@Body() args: CreateOpWorkExperienceDto) {
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
    /*
    return await this.prismaservice.opWorkExperience.create({
      data: {
        ...args,
      },
    });
    */
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkExperienceDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkExperienceDto,
  ) {
    return await this.prismaservice.opWorkExperience.update({
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
    await this.prismaservice.opWorkExperience.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkExperienceDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkExperience.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
