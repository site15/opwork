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
import { OpWorkApplicationDto } from './op-work-application.dto';
import { OpWorkApplication } from './op-work-application.entity';
import { CreateOpWorkApplicationDto } from './create-op-work-application.dto';
import { UpdateOpWorkApplicationDto } from './update-op-work-application.dto';

export class FindManyOpWorkApplicationArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobSeekerId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobId?: string;}

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
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkApplicationResponse })
  async findMany(@Query() args: FindManyOpWorkApplicationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .map(
        ([key, value]) => ({
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
              { coverLetter: { contains: searchText, mode: 'insensitive' } },
{ resumeUrl: { contains: searchText, mode: 'insensitive' } },
{ portfolioUrl: { contains: searchText, mode: 'insensitive' } },
{ statusNotes: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.jobSeekerId)
            ? [{ jobSeekerId: { equals: otherArgs.jobSeekerId } }]
            : []),

          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),

          ...(isUUID(otherArgs.jobId)
            ? [{ jobId: { equals: otherArgs.jobId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkApplication.findMany({
          include:{
OpWorkJobSeeker: true,
OpWorkProfile: true,
OpWorkJob: true
          },
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
    return await this.prismaService.opWorkApplication.create({
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
    return await this.prismaService.opWorkApplication.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkJobSeeker?{OpWorkJobSeeker:undefined}:{OpWorkJobSeeker: { connect: { id: args.OpWorkJobSeeker?.connect.id } }}),
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } }}),
        ...(!args.OpWorkJob?{OpWorkJob:undefined}:{OpWorkJob: { connect: { id: args.OpWorkJob?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkApplication.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkApplicationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkApplication.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
