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
import { OpWorkJobSkillDto } from './op-work-job-skill.dto';
import { OpWorkJobSkill } from './op-work-job-skill.entity';
import { CreateOpWorkJobSkillDto } from './create-op-work-job-skill.dto';
import { UpdateOpWorkJobSkillDto } from './update-op-work-job-skill.dto';

export class FindManyOpWorkJobSkillArgs extends FindManyArgs {}

export class FindManyOpWorkJobSkillResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobSkillResponse {
  @ApiProperty({ type: () => [OpWorkJobSkill] })
  items!: OpWorkJobSkill[];

  @ApiProperty({ type: () => FindManyOpWorkJobSkillResponseMeta })
  meta!: FindManyOpWorkJobSkillResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-skill')
export class OpWorkJobSkillController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSkillResponse })
  async findMany(@Query() args: FindManyOpWorkJobSkillArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobSkillScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobSkillWhereInput: Prisma.OpWorkJobSkillWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              
            ],
          }
        : {}),
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobSkill.findMany({
          include:{
OpWorkJob: true,
OpWorkSkill: true
          },
          where: opWorkJobSkillWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobSkill.count({
          where: opWorkJobSkillWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobSkillDto })
  async createOne(
    @Body() args: CreateOpWorkJobSkillDto,
  ) {    
    return await this.prismaService.opWorkJobSkill.create({
      data: { 
        ...args,
        OpWorkJob:{connect:{id:args.OpWorkJob?.connect.id}},
        OpWorkSkill:{connect:{id:args.OpWorkSkill?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobSkillDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobSkillDto,
  ) {
    return await this.prismaService.opWorkJobSkill.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkJob?{OpWorkJob:undefined}:{OpWorkJob: { connect: { id: args.OpWorkJob?.connect.id } }}),
        ...(!args.OpWorkSkill?{OpWorkSkill:undefined}:{OpWorkSkill: { connect: { id: args.OpWorkSkill?.connect.id } }})
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaService.opWorkJobSkill.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSkillDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJobSkill.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
