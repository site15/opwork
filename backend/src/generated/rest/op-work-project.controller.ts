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
import { OpWorkProjectDto } from './op-work-project.dto';
import { OpWorkProject } from './op-work-project.entity';
import { CreateOpWorkProjectDto } from './create-op-work-project.dto';
import { UpdateOpWorkProjectDto } from './update-op-work-project.dto';

export class FindManyOpWorkProjectArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;}

export class FindManyOpWorkProjectResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkProjectResponse {
  @ApiProperty({ type: () => [OpWorkProject] })
  items!: OpWorkProject[];

  @ApiProperty({ type: () => FindManyOpWorkProjectResponseMeta })
  meta!: FindManyOpWorkProjectResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/project')
export class OpWorkProjectController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkProjectResponse })
  async findMany(@Query() args: FindManyOpWorkProjectArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkProjectScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkProjectWhereInput: Prisma.OpWorkProjectWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { title: { contains: searchText, mode: 'insensitive' } },
{ description: { contains: searchText, mode: 'insensitive' } },
{ githubRepoUrl: { contains: searchText, mode: 'insensitive' } },
{ technologies: { contains: searchText, mode: 'insensitive' } },
{ architecture: { contains: searchText, mode: 'insensitive' } },
{ plannedDatesDescription: { contains: searchText, mode: 'insensitive' } },
{ implementationDescription: { contains: searchText, mode: 'insensitive' } },
{ launchDescription: { contains: searchText, mode: 'insensitive' } },
{ completionDescription: { contains: searchText, mode: 'insensitive' } },
{ maintenanceDescription: { contains: searchText, mode: 'insensitive' } }
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
        items: await prisma.opWorkProject.findMany({
          include:{
OpWorkProfile: true
          },
          where: opWorkProjectWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkProject.count({
          where: opWorkProjectWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkProjectDto })
  async createOne(
    @Body() args: CreateOpWorkProjectDto,
  ) {    
    return await this.prismaService.opWorkProject.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkProjectDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkProjectDto,
  ) {
    return await this.prismaService.opWorkProject.update({
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
    await this.prismaService.opWorkProject.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkProjectDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkProject.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
