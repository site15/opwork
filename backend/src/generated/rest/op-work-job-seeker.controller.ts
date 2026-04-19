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
import { OpWorkJobSeekerDto } from './op-work-job-seeker.dto';
import { OpWorkJobSeeker } from './op-work-job-seeker.entity';
import { CreateOpWorkJobSeekerDto } from './create-op-work-job-seeker.dto';
import { UpdateOpWorkJobSeekerDto } from './update-op-work-job-seeker.dto';

export class FindManyOpWorkJobSeekerArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;}

export class FindManyOpWorkJobSeekerResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobSeekerResponse {
  @ApiProperty({ type: () => [OpWorkJobSeeker] })
  items!: OpWorkJobSeeker[];

  @ApiProperty({ type: () => FindManyOpWorkJobSeekerResponseMeta })
  meta!: FindManyOpWorkJobSeekerResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-seeker')
export class OpWorkJobSeekerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSeekerResponse })
  async findMany(@Query() args: FindManyOpWorkJobSeekerArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .map(
        ([key, value]) => ({
          ...(key in PrismaSdk.Prisma.OpWorkJobSeekerScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobSeekerWhereInput: Prisma.OpWorkJobSeekerWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { firstName: { contains: searchText, mode: 'insensitive' } },
{ lastName: { contains: searchText, mode: 'insensitive' } },
{ middleName: { contains: searchText, mode: 'insensitive' } },
{ currentPosition: { contains: searchText, mode: 'insensitive' } },
{ currentCompany: { contains: searchText, mode: 'insensitive' } },
{ summary: { contains: searchText, mode: 'insensitive' } },
{ salaryCurrency: { contains: searchText, mode: 'insensitive' } },
{ preferredLocations: { contains: searchText, mode: 'insensitive' } },
{ linkedinUrl: { contains: searchText, mode: 'insensitive' } },
{ githubUrl: { contains: searchText, mode: 'insensitive' } },
{ portfolioUrl: { contains: searchText, mode: 'insensitive' } }
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
        items: await prisma.opWorkJobSeeker.findMany({
          include:{
OpWorkProfile: true
          },
          where: opWorkJobSeekerWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobSeeker.count({
          where: opWorkJobSeekerWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobSeekerDto })
  async createOne(
    @Body() args: CreateOpWorkJobSeekerDto,
  ) {    
    return await this.prismaService.opWorkJobSeeker.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobSeekerDto,
  ) {
    return await this.prismaService.opWorkJobSeeker.update({
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
    await this.prismaService.opWorkJobSeeker.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
