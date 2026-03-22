import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkJobSkillDto } from '../generated/rest/op-work-job-skill.dto';
import { OpWorkJobSkill } from '../generated/rest/op-work-job-skill.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerJobSkillArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';
import { OpWorkUserType } from '../generated/prisma/enums';

@CheckOpWorkUserTypes([
  { userTypes: [OpWorkUserType.EMPLOYER, OpWorkUserType.ADMIN] },
])
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
    if (!req.opWorkProfileId) {
      return [];
    }
    return await this.prismaService.opWorkJobSkill.findMany({
      include: { OpWorkSkill: true },
      where: {
        OpWorkJob: { profileId: req.opWorkProfileId },
      },
    });
  }

  @Get(':job_id')
  @ApiOkResponse({ type: OpWorkJobSkillDto, isArray: true })
  async getJobSkills(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_id', new ParseUUIDPipe()) jobId: string,
  ): Promise<OpWorkJobSkillDto[]> {
    return await this.prismaService.opWorkJobSkill.findMany({
      include: { OpWorkSkill: true },
      where: {
        OpWorkJob: { id: jobId },
        profileId: req.opWorkProfileId,
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
          include: { OpWorkProfile: true },
          where: {
            name: args.skillName,
            profileId: req.opWorkProfileId,
          },
        })) ||
        (await this.prismaService.opWorkSkill.create({
          include: { OpWorkProfile: true },
          data: {
            name: args.skillName,
            OpWorkProfile: { connect: { id: req.opWorkProfileId } },
            popularity: 0,
          },
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
          OpWorkSkill: { connect: { id: args.skillId } },
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

  @Delete(':job_skill_id')
  @ApiOkResponse({ type: StatusResponse })
  async delJobSkill(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_skill_id', new ParseUUIDPipe()) jobSkillId: string,
  ): Promise<StatusResponse> {
    await this.prismaService.opWorkJobSkill.delete({
      where: {
        id: jobSkillId,
        profileId: req.opWorkProfileId,
      },
    });
    return { message: 'ok' };
  }
}
