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
import { OpWorkJobSeekerSkillDto } from './op-work-job-seeker-skill.dto';
import { OpWorkJobSeekerSkill } from './op-work-job-seeker-skill.entity';
import { CreateOpWorkJobSeekerSkillDto } from './create-op-work-job-seeker-skill.dto';
import { UpdateOpWorkJobSeekerSkillDto } from './update-op-work-job-seeker-skill.dto';

export class FindManyOpWorkJobSeekerSkillArgs extends FindManyArgs {}

export class FindManyOpWorkJobSeekerSkillResponseMeta extends FindManyResponseMeta {}

export class FindManyOpWorkJobSeekerSkillResponse {
  @ApiProperty({ type: () => [OpWorkJobSeekerSkill] })
  items!: OpWorkJobSeekerSkill[];

  @ApiProperty({ type: () => FindManyOpWorkJobSeekerSkillResponseMeta })
  meta!: FindManyOpWorkJobSeekerSkillResponseMeta;
}

@ApiTags('op-work')
@Controller('op-work/job-seeker-skill')
export class OpWorkJobSeekerSkillController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSeekerSkillResponse })
  async findMany(@Query() args: FindManyOpWorkJobSeekerSkillArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.OpWorkJobSeekerSkillScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const opWorkJobSeekerSkillWhereInput: Prisma.OpWorkJobSeekerSkillWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
            ],
          }
        : {}),
      
    };

    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobSeekerSkill.findMany({
          where: opWorkJobSeekerSkillWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.opWorkJobSeekerSkill.count({
          where: opWorkJobSeekerSkillWhereInput,
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
  @ApiCreatedResponse({ type: OpWorkJobSeekerSkillDto })
  async createOne(
    @Body() args: CreateOpWorkJobSeekerSkillDto,
  ) {    
    return await this.prismaservice.opWorkJobSeekerSkill.create({
      data: { 
        ...args,
        OpWorkJobSeeker:{connect:{id:args.OpWorkJobSeeker?.connect.id}},
        OpWorkSkill:{connect:{id:args.OpWorkSkill?.connect.id}}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerSkillDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateOpWorkJobSeekerSkillDto,
  ) {
    return await this.prismaservice.opWorkJobSeekerSkill.update({
      data: {
        ...args,
        
        
        OpWorkJobSeeker: { connect: { id: args.OpWorkJobSeeker?.connect.id } },
        OpWorkSkill: { connect: { id: args.OpWorkSkill?.connect.id } }
      },
      where: {
        id,
        
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.opWorkJobSeekerSkill.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerSkillDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.opWorkJobSeekerSkill.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
