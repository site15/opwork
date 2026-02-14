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
import { OpWorkSkillSynonymDto } from './op-work-skill-synonym.dto';
import { OpWorkSkillSynonym } from './op-work-skill-synonym.entity';
import { CreateOpWorkSkillSynonymDto } from './create-op-work-skill-synonym.dto';
import { UpdateOpWorkSkillSynonymDto } from './update-op-work-skill-synonym.dto';

export class FindManyOpWorkSkillSynonymArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  skillId?: string;}

export class FindManyOpWorkSkillSynonymResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkSkillSynonymResponse {
  @ApiProperty({ type: () => [OpWorkSkillSynonym] })
  items!: OpWorkSkillSynonym[];

  @ApiProperty({ type: () => FindManyOpWorkSkillSynonymResponseMeta })
  meta!: FindManyOpWorkSkillSynonymResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/skill-synonym')
export class OpWorkSkillSynonymController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkSkillSynonymResponse })
  async findMany(@Query() args: FindManyOpWorkSkillSynonymArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkSkillSynonymScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkSkillSynonymWhereInput: Prisma.OpWorkSkillSynonymWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
              { synonym: { contains: searchText, mode: 'insensitive' } }
            ],
          }
        : {}),
      AND: [
        
          ...(isUUID(otherArgs.skillId)
            ? [{ skillId: { equals: otherArgs.skillId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkSkillSynonym.findMany({
          include:{
OpWorkSkill: true
          },
          where: opWorkSkillSynonymWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkSkillSynonym.count({
          where: opWorkSkillSynonymWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkSkillSynonymDto })
  async createOne(
    @Body() args: CreateOpWorkSkillSynonymDto,
  ) {    
    return await this.prismaService.opWorkSkillSynonym.create({
      data: { 
        ...args,
        OpWorkSkill:{connect:{id:args.OpWorkSkill?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkSkillSynonymDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkSkillSynonymDto,
  ) {
    return await this.prismaService.opWorkSkillSynonym.update({
      data: {
        ...args,
        
        
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
    await this.prismaService.opWorkSkillSynonym.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkSkillSynonymDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkSkillSynonym.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
