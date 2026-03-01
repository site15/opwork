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
import { OpWorkJobSeeker } from '../generated/rest/op-work-job-seeker.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import {
  DelJobSeekerProfileArgs,
  SetJobSeekerProfileArgs,
} from '../types/job-seeker-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

@ApiTags('job-seeker')
@Controller('job-seeker')
export class JobSeekerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('all')
  @ApiOkResponse({ type: OpWorkJobSeeker, isArray: true })
  async getProfiles(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobSeeker[]> {
    if (!req.opWorkProfileId) {
      return [];
    }
    return await this.prismaService.opWorkJobSeeker.findMany({
      include: {
        OpWorkEducation: true,
        OpWorkExperience: true,
        OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
      },
      where: {
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Get(':job_seeker_id')
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_seeker_id', new ParseUUIDPipe({ optional: true }))
    jobSeekerId: string,
  ): Promise<OpWorkJobSeeker | null> {
    return await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
      include: {
        OpWorkEducation: true,
        OpWorkExperience: true,
        OpWorkJobSeekerSkill: {
          include: { OpWorkSkill: true },
          where: { jobSeekerId },
        },
      },
      where: {
        id: jobSeekerId,
      },
    });
  }

  @Delete()
  @ApiOkResponse({ type: StatusResponse })
  async delProfile(
    @Body() args: DelJobSeekerProfileArgs,
  ): Promise<StatusResponse> {
    if (args.id) {
      await this.prismaService.opWorkJobSeeker.delete({
        where: {
          id: args.id,
        },
      });
    }
    return { message: 'ok' };
  }

  @Put()
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerProfileArgs,
  ): Promise<OpWorkJobSeeker> {
    let opWorkJobSeeker = args.jobSeekerId
      ? await this.prismaService.opWorkJobSeeker.findFirst({
          where: {
            id: args.jobSeekerId,
          },
        })
      : null;
    if (opWorkJobSeeker) {
      opWorkJobSeeker = await this.prismaService.opWorkJobSeeker.update({
        include: {
          OpWorkEducation: true,
          OpWorkExperience: true,
          OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
        },
        where: {
          id: opWorkJobSeeker.id,
        },
        data: {
          currentCompany: args.currentCompany,
          currentPosition: args.currentPosition,
          expectedSalary: args.expectedSalary,
          githubUrl: args.githubUrl,
          linkedinUrl: args.linkedinUrl,
          portfolioUrl: args.portfolioUrl,
          preferredLocations: args.preferredLocations,
          salaryCurrency: args.salaryCurrency,
          isOpenToRelocation: args.isOpenToRelocation,
          isOpenToRemote: args.isOpenToRemote,
          isOpenToWork: args.isOpenToWork,
          summary: args.summary,
        },
      });
    } else {
      opWorkJobSeeker = await this.prismaService.opWorkJobSeeker.create({
        include: {
          OpWorkEducation: true,
          OpWorkExperience: true,
          OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
        },
        data: {
          profileId: req.opWorkProfileId,
          currentCompany: args.currentCompany,
          currentPosition: args.currentPosition,
          expectedSalary: args.expectedSalary,
          githubUrl: args.githubUrl,
          linkedinUrl: args.linkedinUrl,
          portfolioUrl: args.portfolioUrl,
          preferredLocations: args.preferredLocations,
          salaryCurrency: args.salaryCurrency,
          isOpenToRelocation: args.isOpenToRelocation,
          isOpenToRemote: args.isOpenToRemote,
          isOpenToWork: args.isOpenToWork,
          summary: args.summary,
        },
      });
    }

    return opWorkJobSeeker;
  }
}
