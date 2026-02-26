import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkJobSkillDto } from '../generated/rest/op-work-job-skill.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerJobSkillArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';
import { OpWorkJobSkill } from '../generated/rest/op-work-job-skill.entity';

@ApiTags('employer')
@Controller('employer/job-skill')
export class EmployerWorkSkillController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('all')
  @ApiOkResponse({ type: OpWorkJobSkill, isArray: true })
  async getAllJobSkills(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobSkillDto[]> {
    return await this.prismaService.opWorkJobSkill.findMany({
      include: { OpWorkSkill: true },
      where: {
        OpWorkJob: { id: req.opWorkProfileId },
      },
    });
  }

  @Get(':job_id')
  @ApiOkResponse({ type: OpWorkJobSkillDto, isArray: true })
  async getJobSkills(
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
  ): Promise<OpWorkJobSkillDto[]> {
    return await this.prismaService.opWorkJobSkill.findMany({
      include: { OpWorkSkill: true },
      where: {
        OpWorkJob: { id: jobId },
      },
    });
  }

  @Put(':job_id')
  @ApiOkResponse({ type: OpWorkJobSkillDto })
  async setJobSkill(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
    @Body() args: SetEmployerJobSkillArgs,
  ): Promise<OpWorkJobSkillDto> {
    if (!args.skillId && args.skillName) {
      args.skillId = (
        (await this.prismaService.opWorkSkill.findFirst({
          where: { name: args.skillName },
        })) ||
        (await this.prismaService.opWorkSkill.create({
          data: { name: args.skillName, popularity: -1 },
        }))
      ).id;
    }
    if (args.id) {
      return await this.prismaService.opWorkJobSkill.update({
        include: { OpWorkSkill: true },
        where: { id: args.id },
        data: {
          importance: args.importance,
          isRequired: args.isRequired,
          minLevel: args.minLevel,
        },
      });
    } else {
      return await this.prismaService.opWorkJobSkill.create({
        include: { OpWorkSkill: true },
        data: {
          importance: args.importance,
          isRequired: args.isRequired,
          minLevel: args.minLevel,
          OpWorkSkill: { connect: { id: args.skillId } },
          OpWorkJob: { connect: { id: jobId } },
          OpWorkProfile: { connect: { id: req.opWorkProfileId } },
        },
      });
    }
  }
}
