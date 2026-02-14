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
import { OpWorkEmployerDto } from './op-work-employer.dto';
import { OpWorkEmployer } from './op-work-employer.entity';
import { CreateOpWorkEmployerDto } from './create-op-work-employer.dto';
import { UpdateOpWorkEmployerDto } from './update-op-work-employer.dto';

export class FindManyOpWorkEmployerArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;}

export class FindManyOpWorkEmployerResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkEmployerResponse {
  @ApiProperty({ type: () => [OpWorkEmployer] })
  items!: OpWorkEmployer[];

  @ApiProperty({ type: () => FindManyOpWorkEmployerResponseMeta })
  meta!: FindManyOpWorkEmployerResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/employer')
export class OpWorkEmployerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkEmployerResponse })
  async findMany(@Query() args: FindManyOpWorkEmployerArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkEmployerScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkEmployerWhereInput: Prisma.OpWorkEmployerWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { companyName: { contains: searchText, mode: 'insensitive' } },
{ industry: { contains: searchText, mode: 'insensitive' } },
{ description: { contains: searchText, mode: 'insensitive' } },
{ mission: { contains: searchText, mode: 'insensitive' } },
{ culture: { contains: searchText, mode: 'insensitive' } },
{ headquarters: { contains: searchText, mode: 'insensitive' } },
{ logoUrl: { contains: searchText, mode: 'insensitive' } },
{ coverImageUrl: { contains: searchText, mode: 'insensitive' } },
{ companyEmail: { contains: searchText, mode: 'insensitive' } },
{ companyPhone: { contains: searchText, mode: 'insensitive' } },
{ companyWebsite: { contains: searchText, mode: 'insensitive' } },
{ linkedinUrl: { contains: searchText, mode: 'insensitive' } },
{ twitterUrl: { contains: searchText, mode: 'insensitive' } },
{ facebookUrl: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkEmployer.findMany({
          include:{
OpWorkProfile: true
          },
          where: opWorkEmployerWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkEmployer.count({
          where: opWorkEmployerWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkEmployerDto })
  async createOne(
    @Body() args: CreateOpWorkEmployerDto,
  ) {    
    return await this.prismaService.opWorkEmployer.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkEmployerDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkEmployerDto,
  ) {
    return await this.prismaService.opWorkEmployer.update({
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
    await this.prismaService.opWorkEmployer.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkEmployerDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkEmployer.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
