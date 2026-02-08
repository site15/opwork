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
import { OpWorkNotificationDto } from './op-work-notification.dto';
import { OpWorkNotification } from './op-work-notification.entity';
import { CreateOpWorkNotificationDto } from './create-op-work-notification.dto';
import { UpdateOpWorkNotificationDto } from './update-op-work-notification.dto';

export class FindManyOpWorkNotificationArgs extends FindManyArgs {}

export class FindManyOpWorkNotificationResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkNotificationResponse {
  @ApiProperty({ type: () => [OpWorkNotification] })
  items!: OpWorkNotification[];

  @ApiProperty({ type: () => FindManyOpWorkNotificationResponseMeta })
  meta!: FindManyOpWorkNotificationResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/notification')
export class OpWorkNotificationController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkNotificationResponse })
  async findMany(@Query() args: FindManyOpWorkNotificationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkNotificationScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkNotificationWhereInput: Prisma.OpWorkNotificationWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { title: { contains: searchText, mode: 'insensitive' } },
{ message: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkNotification.findMany({
          include:{
AuthUser: true,
OpWorkProfile: true
          },
          where: opWorkNotificationWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkNotification.count({
          where: opWorkNotificationWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkNotificationDto })
  async createOne(
    @Body() args: CreateOpWorkNotificationDto,
  ) {    
    return await this.prismaService.opWorkNotification.create({
      data: { 
        ...args,
        AuthUser:{connect:{id:args.AuthUser?.connect.id}},
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkNotificationDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkNotificationDto,
  ) {
    return await this.prismaService.opWorkNotification.update({
      data: {
        ...args,
        
        
        ...(!args.AuthUser?{AuthUser:undefined}:{AuthUser: { connect: { id: args.AuthUser?.connect.id } }}),
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: args.OpWorkProfile?.connect
          ? { connect: { id: args.OpWorkProfile?.connect.id } }
          : { disconnect: true }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkNotification.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkNotificationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkNotification.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
