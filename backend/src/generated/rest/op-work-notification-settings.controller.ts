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
import { OpWorkNotificationSettingsDto } from './op-work-notification-settings.dto';
import { OpWorkNotificationSettings } from './op-work-notification-settings.entity';
import { CreateOpWorkNotificationSettingsDto } from './create-op-work-notification-settings.dto';
import { UpdateOpWorkNotificationSettingsDto } from './update-op-work-notification-settings.dto';

export class FindManyOpWorkNotificationSettingsArgs extends FindManyArgs {}

export class FindManyOpWorkNotificationSettingsResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkNotificationSettingsResponse {
  @ApiProperty({ type: () => [OpWorkNotificationSettings] })
  items!: OpWorkNotificationSettings[];

  @ApiProperty({ type: () => FindManyOpWorkNotificationSettingsResponseMeta })
  meta!: FindManyOpWorkNotificationSettingsResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/notification-settings')
export class OpWorkNotificationSettingsController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkNotificationSettingsResponse })
  async findMany(@Query() args: FindManyOpWorkNotificationSettingsArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkNotificationSettingsScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkNotificationSettingsWhereInput: Prisma.OpWorkNotificationSettingsWhereInput = {
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
        items: await prisma.opWorkNotificationSettings.findMany({
          where: opWorkNotificationSettingsWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkNotificationSettings.count({
          where: opWorkNotificationSettingsWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkNotificationSettingsDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateOpWorkNotificationSettingsDto,
  ) {    
    return await this.prismaservice.opWorkNotificationSettings.create({
      data: { 
        ...args,
        
        profileId: req.currentProfileId,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkNotificationSettingsDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkNotificationSettingsDto,
  ) {
    return await this.prismaservice.opWorkNotificationSettings.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkNotificationSettings.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkNotificationSettingsDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkNotificationSettings.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
