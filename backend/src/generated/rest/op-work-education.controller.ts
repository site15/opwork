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
import { OpWorkEducationDto } from './op-work-education.dto';
import { OpWorkEducation } from './op-work-education.entity';
import { CreateOpWorkEducationDto } from './create-op-work-education.dto';
import { UpdateOpWorkEducationDto } from './update-op-work-education.dto';

export class FindManyOpWorkEducationArgs extends FindManyArgs {}

export class FindManyOpWorkEducationResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkEducationResponse {
  @ApiProperty({ type: () => [OpWorkEducation] })
  items!: OpWorkEducation[];

  @ApiProperty({ type: () => FindManyOpWorkEducationResponseMeta })
  meta!: FindManyOpWorkEducationResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/education')
export class OpWorkEducationController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkEducationResponse })
  async findMany(@Query() args: FindManyOpWorkEducationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkEducationScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkEducationWhereInput: Prisma.OpWorkEducationWhereInput = {
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
        items: await prisma.opWorkEducation.findMany({
          where: opWorkEducationWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkEducation.count({
          where: opWorkEducationWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkEducationDto })
  async createOne(@Body() args: CreateOpWorkEducationDto) {
    // DO_NOT_CHANGE_WHEN_GENERATING_CODE
    throw new Error('Method not implemented.');
    /*
    return await this.prismaservice.opWorkEducation.create({
      data: {
        ...args,
      },
    });
    */
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkEducationDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkEducationDto,
  ) {
    return await this.prismaservice.opWorkEducation.update({
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
    await this.prismaservice.opWorkEducation.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkEducationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkEducation.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
