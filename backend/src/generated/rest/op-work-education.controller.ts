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
import { OpWorkEducationDto } from './op-work-education.dto';
import { OpWorkEducation } from './op-work-education.entity';
import { CreateOpWorkEducationDto } from './create-op-work-education.dto';
import { UpdateOpWorkEducationDto } from './update-op-work-education.dto';

export class FindManyOpWorkEducationArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobSeekerId?: string;}

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
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkEducationResponse })
  async findMany(@Query() args: FindManyOpWorkEducationArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

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
              { institution: { contains: searchText, mode: 'insensitive' } },
{ fieldOfStudy: { contains: searchText, mode: 'insensitive' } },
{ description: { contains: searchText, mode: 'insensitive' } }
            ],
            AND: [
              
          ...(isUUID(otherArgs.jobSeekerId)
            ? [{ jobSeekerId: { equals: otherArgs.jobSeekerId } }]
            : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkEducation.findMany({
          include:{
OpWorkJobSeeker: true
          },
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
  async createOne(
    @Body() args: CreateOpWorkEducationDto,
  ) {    
    return await this.prismaService.opWorkEducation.create({
      data: { 
        ...args,
        OpWorkJobSeeker:{connect:{id:args.OpWorkJobSeeker?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkEducationDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkEducationDto,
  ) {
    return await this.prismaService.opWorkEducation.update({
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
    await this.prismaService.opWorkEducation.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkEducationDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkEducation.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
