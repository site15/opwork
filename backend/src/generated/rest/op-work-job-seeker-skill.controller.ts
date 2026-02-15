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
import { OpWorkJobSeekerSkillDto } from './op-work-job-seeker-skill.dto';
import { OpWorkJobSeekerSkill } from './op-work-job-seeker-skill.entity';
import { CreateOpWorkJobSeekerSkillDto } from './create-op-work-job-seeker-skill.dto';
import { UpdateOpWorkJobSeekerSkillDto } from './update-op-work-job-seeker-skill.dto';

export class FindManyOpWorkJobSeekerSkillArgs extends FindManyArgs {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  profileId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  jobSeekerId?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  skillId?: string;}

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
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyOpWorkJobSeekerSkillResponse })
  async findMany(@Query() args: FindManyOpWorkJobSeekerSkillArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const { searchText, ...otherArgs } = args;

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
      AND: [
        
          ...(isUUID(otherArgs.profileId)
            ? [{ profileId: { equals: otherArgs.profileId } }]
            : []),

          ...(isUUID(otherArgs.jobSeekerId)
            ? [{ jobSeekerId: { equals: otherArgs.jobSeekerId } }]
            : []),

          ...(isUUID(otherArgs.skillId)
            ? [{ skillId: { equals: otherArgs.skillId } }]
            : []),
      ],
      
    };

    const result = await this.prismaService.$transaction(async (prisma) => {
      return {
        items: await prisma.opWorkJobSeekerSkill.findMany({
          include:{
OpWorkProfile: true,
OpWorkJobSeeker: true,
OpWorkSkill: true
          },
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
    return await this.prismaService.opWorkJobSeekerSkill.create({
      data: { 
        ...args,
        OpWorkProfile:{connect:{id:args.OpWorkProfile?.connect.id}},
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
    return await this.prismaService.opWorkJobSeekerSkill.update({
      data: {
        ...args,
        
        
        ...(!args.OpWorkProfile?{OpWorkProfile:undefined}:{OpWorkProfile: { connect: { id: args.OpWorkProfile?.connect.id } }}),
        ...(!args.OpWorkJobSeeker?{OpWorkJobSeeker:undefined}:{OpWorkJobSeeker: { connect: { id: args.OpWorkJobSeeker?.connect.id } }}),
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
    await this.prismaService.opWorkJobSeekerSkill.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: OpWorkJobSeekerSkillDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaService.opWorkJobSeekerSkill.findFirstOrThrow({
      where: {
        id,
        
      },
    });
  }
}
