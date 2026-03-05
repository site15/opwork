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
import { OpWorkProfileDto } from './op-work-profile.dto';
import { OpWorkProfile } from './op-work-profile.entity';
import { CreateOpWorkProfileDto } from './create-op-work-profile.dto';
import { UpdateOpWorkProfileDto } from './update-op-work-profile.dto';

export class FindManyOpWorkProfileArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  userId?: string;}

export class FindManyOpWorkProfileResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkProfileResponse {
  @ApiProperty({ type: () => [OpWorkProfile] })
  items!: OpWorkProfile[];

  @ApiProperty({ type: () => FindManyOpWorkProfileResponseMeta })
  meta!: FindManyOpWorkProfileResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/profile')
export class OpWorkProfileController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkProfileResponse })
  async findMany(@Query() args: FindManyOpWorkProfileArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .map(
        ([key, value]) => ({
          ...(key in PrismaSdk.Prisma.OpWorkProfileScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkProfileWhereInput: Prisma.OpWorkProfileWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { email: { contains: searchText, mode: 'insensitive' } },
{ phone: { contains: searchText, mode: 'insensitive' } },
{ website: { contains: searchText, mode: 'insensitive' } },
{ location: { contains: searchText, mode: 'insensitive' } },
{ avatarUrl: { contains: searchText, mode: 'insensitive' } },
{ coverImage: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.userId)
            ? [{ userId: { equals: otherArgs.userId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkProfile.findMany({
          include:{
AuthUser: true
          },
          where: opWorkProfileWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkProfile.count({
          where: opWorkProfileWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkProfileDto })
  async createOne(
    @Body() args: CreateOpWorkProfileDto,
  ) {    
    return await this.prismaService.opWorkProfile.create({
      data: { 
        ...args,
        AuthUser:{connect:{id:args.AuthUser?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkProfileDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkProfileDto,
  ) {
    return await this.prismaService.opWorkProfile.update({
      data: {
        ...args,
        updatedAt: new Date(),
        
        ...(!args.AuthUser?{AuthUser:undefined}:{AuthUser: { connect: { id: args.AuthUser?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkProfile.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkProfileDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkProfile.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
