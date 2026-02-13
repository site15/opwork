import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Inject,
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
import { IsOptional, isUUID } from 'class-validator';
import {
  PRISMA_SERVICE,
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { OpWorkNotificationSettingsDto } from './op-work-notification-settings.dto';
import { OpWorkNotificationSettings } from './op-work-notification-settings.entity';
import { CreateOpWorkNotificationSettingsDto } from './create-op-work-notification-settings.dto';
import { UpdateOpWorkNotificationSettingsDto } from './update-op-work-notification-settings.dto';

export class FindManyOpWorkNotificationSettingsArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;}

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
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkNotificationSettingsResponse })
  async findMany(@Query() args: FindManyOpWorkNotificationSettingsArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

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
            AND: [
              
          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkNotificationSettings.findMany({
          include:{
OpWorkProfile: true
          },
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
    @Body() args: CreateOpWorkNotificationSettingsDto,
  ) {    
    return await this.prismaService.opWorkNotificationSettings.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkNotificationSettingsDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkNotificationSettingsDto,
  ) {
    return await this.prismaService.opWorkNotificationSettings.update({
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
    await this.prismaService.opWorkNotificationSettings.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkNotificationSettingsDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkNotificationSettings.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
