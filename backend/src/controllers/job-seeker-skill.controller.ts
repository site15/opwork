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
import { OpWorkJobSeekerSkill } from '../generated/rest/op-work-job-seeker-skill.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerSkillArgs } from '../types/job-seeker-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';
import { OpWorkUserType } from '../generated/prisma/enums';

@CheckOpWorkUserTypes([
  {
    userTypes: [OpWorkUserType.JOB_SEEKER, OpWorkUserType.ADMIN],
  },
])
@ApiTags('job-seeker')
@Controller('job-seeker/skill')
export class JobSeekerSkillController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkJobSeekerSkill, isArray: true })
  async getSkills(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobSeekerSkill[]> {
    if (!req.firstOpWorkJobSeeker?.id) {
      return [];
    }
    return await this.prismaService.opWorkJobSeekerSkill.findMany({
      include: { OpWorkSkill: true },
      where: {
        jobSeekerId: req.firstOpWorkJobSeeker?.id,
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkJobSeekerSkill })
  async setSkill(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerSkillArgs,
  ): Promise<OpWorkJobSeekerSkill> {
    if (args.skillName) {
      args.skillId =
        (
          await this.prismaService.opWorkSkill.findFirst({
            include: { OpWorkProfile: true },
            where: {
              name: args.skillName,
              profileId: req.opWorkProfileId,
            },
          })
        )?.id || undefined;
      if (!args.skillId) {
        args.skillId = (
          await this.prismaService.opWorkSkill.create({
            include: { OpWorkProfile: true },
            data: {
              name: args.skillName,
              popularity: 0,
              OpWorkProfile: { connect: { id: req.opWorkProfileId } },
            },
          })
        ).id;
      }
    }
    if (args.id) {
      return await this.prismaService.opWorkJobSeekerSkill.update({
        include: { OpWorkSkill: true },
        where: {
          id: args.id,
          OpWorkJobSeeker: { id: req.firstOpWorkJobSeeker?.id },
          profileId: req.opWorkProfileId,
        },
        data: {
          isPrimary: args.isPrimary,
          lastUsed: args.lastUsed,
          level: args.level,
          yearsOfExp: args.yearsOfExp,
          OpWorkSkill: { connect: { id: args.skillId } },
        },
      });
    } else {
      const opWorkJobSeeker =
        await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
          where: {
            id: args.jobSeekerId || req.firstOpWorkJobSeeker?.id,
            profileId: req.opWorkProfileId,
          },
        });

      return await this.prismaService.opWorkJobSeekerSkill.create({
        include: { OpWorkSkill: true },
        data: {
          isPrimary: args.isPrimary,
          lastUsed: args.lastUsed,
          level: args.level,
          yearsOfExp: args.yearsOfExp,
          OpWorkSkill: { connect: { id: args.skillId } },
          OpWorkJobSeeker: {
            connect: {
              id: opWorkJobSeeker.id,
            },
          },
          OpWorkProfile: { connect: { id: req.opWorkProfileId } },
        },
      });
    }
  }

  @Delete(':job_seeker_skill_id')
  @ApiOkResponse({ type: StatusResponse })
  async delJobSkill(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_seeker_skill_id', new ParseUUIDPipe()) jobSeekerSkillId: string,
  ): Promise<StatusResponse> {
    await this.prismaService.opWorkJobSeekerSkill.deleteMany({
      where: {
        id: jobSeekerSkillId,
        OpWorkJobSeeker: { id: req.firstOpWorkJobSeeker?.id },
        profileId: req.opWorkProfileId,
      },
    });
    return { message: 'ok' };
  }
}
