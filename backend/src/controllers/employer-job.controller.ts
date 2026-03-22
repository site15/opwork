import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkJobDto } from '../generated/rest/op-work-job.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import {
  DelEmployerJobArgs,
  SetEmployerJobArgs,
} from '../types/employer-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';
import { OpWorkUserType } from '../generated/prisma/enums';

@CheckOpWorkUserTypes([
  {
    userTypes: [OpWorkUserType.EMPLOYER],
  },
])
@ApiTags('employer')
@Controller('employer/job')
export class EmployeJobController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get(':employer_id')
  @ApiOkResponse({ type: OpWorkJobDto, isArray: true })
  async getJobs(
    @CurrentAppRequest() req: AppRequest,
    @Param('employer_id') employerId: string,
  ): Promise<OpWorkJobDto[]> {
    return await this.prismaService.opWorkJob.findMany({
      include: {
        OpWorkJobSkill: { include: { OpWorkSkill: true } },
        opWorkJobTags: true,
      },
      where: {
        employerId: employerId || req.firstOpWorkEmployer?.id,
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Delete()
  @ApiOkResponse({ type: StatusResponse })
  async delJob(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: DelEmployerJobArgs,
  ): Promise<StatusResponse> {
    if (args.id) {
      await this.prismaService.opWorkJob.delete({
        where: {
          id: args.id,
          profileId: req.opWorkProfileId,
        },
      });
    }
    return { message: 'ok' };
  }

  @Put()
  @ApiOkResponse({ type: OpWorkJobDto })
  async setJob(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetEmployerJobArgs,
  ): Promise<OpWorkJobDto> {
    if (args.id) {
      return await this.prismaService.opWorkJob.update({
        include: {
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          opWorkJobTags: true,
        },
        where: {
          id: args.id,
          profileId: req.opWorkProfileId,
        },
        data: {
          title: args.title,
          description: args.description,
          requirements: args.requirements,
          responsibilities: args.responsibilities,
          salaryMin: args.salaryMin,
          salaryMax: args.salaryMax,
          salaryCurrency: args.salaryCurrency,
          isRemote: args.isRemote,
          location: args.location,
          department: args.department,
          employmentType: args.employmentType,
          experienceLevel: args.experienceLevel,
          expiresAt: args.expiresAt,
          publishedAt: args.publishedAt,
          status: args.status,
        },
      });
    } else {
      const opWorkEmployer =
        await this.prismaService.opWorkEmployer.findFirstOrThrow({
          where: {
            id: args.employerId || req.firstOpWorkEmployer?.id,
            profileId: req.opWorkProfileId,
          },
        });
      return await this.prismaService.opWorkJob.create({
        include: {
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          opWorkJobTags: true,
        },
        data: {
          title: args.title,
          description: args.description,
          requirements: args.requirements,
          responsibilities: args.responsibilities,
          salaryMin: args.salaryMin,
          salaryMax: args.salaryMax,
          salaryCurrency: args.salaryCurrency,
          isRemote: args.isRemote,
          location: args.location,
          department: args.department,
          employmentType: args.employmentType,
          experienceLevel: args.experienceLevel,
          expiresAt: args.expiresAt,
          publishedAt: args.publishedAt,
          status: args.status,
          applicationsCount: 0,
          savesCount: 0,
          viewsCount: 0,
          OpWorkEmployer: {
            connect: {
              id: opWorkEmployer.id,
            },
          },
          OpWorkProfile: { connect: { id: req.opWorkProfileId } },
        },
      });
    }
  }
}
