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
import { OpWorkApplicationDto } from './op-work-application.dto';
import { OpWorkApplication } from './op-work-application.entity';
import { CreateOpWorkApplicationDto } from './create-op-work-application.dto';
import { UpdateOpWorkApplicationDto } from './update-op-work-application.dto';

export class FindManyOpWorkApplicationArgs extends FindManyArgs {}

export class FindManyOpWorkApplicationResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkApplicationResponse {
  @ApiProperty({ type: () => [OpWorkApplication] })
  items!: OpWorkApplication[];

  @ApiProperty({ type: () => FindManyOpWorkApplicationResponseMeta })
  meta!: FindManyOpWorkApplicationResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/application')
export class OpWorkApplicationController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkApplicationResponse })
  async findMany(@Query() args: FindManyOpWorkApplicationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkApplicationScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkApplicationWhereInput: Prisma.OpWorkApplicationWhereInput = {
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
        items: await prisma.opWorkApplication.findMany({
          where: opWorkApplicationWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkApplication.count({
          where: opWorkApplicationWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkApplicationDto })
  async createOne(
    @Body() args: CreateOpWorkApplicationDto,
  ) {    
    return await this.prismaservice.opWorkApplication.create({
      data: { 
        ...args,
        
        
        OpWorkJobSeeker:{connect:{id:args.OpWorkJobSeeker?.connect.id}},
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}},
        OpWorkJob:{connect:{id:args.OpWorkJob?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkApplicationDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkApplicationDto,
  ) {
    return await this.prismaservice.opWorkApplication.update({
      data: {
        ...args,
        
        
        
        
        OpWorkJobSeeker: { connect: { id: args.OpWorkJobSeeker?.connect.id } },
        OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } },
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
    await this.prismaservice.opWorkApplication.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkApplicationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkApplication.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
