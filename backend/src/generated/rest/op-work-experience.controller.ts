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
import { OpWorkExperienceDto } from './op-work-experience.dto';
import { OpWorkExperience } from './op-work-experience.entity';
import { CreateOpWorkExperienceDto } from './create-op-work-experience.dto';
import { UpdateOpWorkExperienceDto } from './update-op-work-experience.dto';

export class FindManyOpWorkExperienceArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobSeekerId?: string;}

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
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkExperienceResponse })
  async findMany(@Query() args: FindManyOpWorkExperienceArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

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
              { company: { contains: searchText, mode: 'insensitive' } },
{ position: { contains: searchText, mode: 'insensitive' } },
{ description: { contains: searchText, mode: 'insensitive' } },
{ location: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.jobSeekerId)
            ? [{ jobSeekerId: { equals: otherArgs.jobSeekerId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkExperience.findMany({
          include:{
OpWorkJobSeeker: true
          },
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
  async createOne(
    @Body() args: CreateOpWorkExperienceDto,
  ) {    
    return await this.prismaService.opWorkExperience.create({
      data: { 
        ...args,
        OpWorkJobSeeker:{connect:{id:args.OpWorkJobSeeker?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkExperienceDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkExperienceDto,
  ) {
    return await this.prismaService.opWorkExperience.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkJobSeeker?{OpWorkJobSeeker:undefined}:{OpWorkJobSeeker: { connect: { id: args.OpWorkJobSeeker?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkExperience.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkExperienceDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkExperience.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
