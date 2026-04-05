import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckOpWorkUserTypes } from '../decorators/check-op-work-user-type';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkUserType } from '../generated/prisma/enums';
import { OpWorkJobSeeker } from '../generated/rest/op-work-job-seeker.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerProfileArgs } from '../types/job-seeker-types';
import { AppRequest } from '../types/request';

@ApiTags('job-seeker')
@Controller('job-seeker')
export class JobSeekerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @CheckOpWorkUserTypes([
    {
      userTypes: [OpWorkUserType.JOB_SEEKER, OpWorkUserType.ADMIN],
    },
  ])
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

  @Get()
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
    @Query('jobSeekerId') jobSeekerId?: string,
  ): Promise<OpWorkJobSeeker | null> {
    return await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
      include: {
        OpWorkEducation: true,
        OpWorkExperience: true,
        OpWorkJobSeekerSkill: {
          include: { OpWorkSkill: true },
          where: { jobSeekerId: jobSeekerId || req.firstOpWorkJobSeeker?.id },
        },
      },
      where: {
        id: jobSeekerId || req.firstOpWorkJobSeeker?.id,
      },
    });
  }

  @CheckOpWorkUserTypes([
    {
      userTypes: [OpWorkUserType.JOB_SEEKER, OpWorkUserType.ADMIN],
    },
  ])
  @Put()
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerProfileArgs,
  ): Promise<OpWorkJobSeeker> {
    const jobSeekerId = args.jobSeekerId || req.firstOpWorkJobSeeker?.id;
    if (!jobSeekerId) {
      throw new Error('Job seeker not found');
    }
    let opWorkJobSeeker =
      (await this.prismaService.opWorkJobSeeker.findFirst({
        where: {
          id: jobSeekerId,
          profileId: req.opWorkProfileId,
        },
      })) || null;
    if (opWorkJobSeeker) {
      opWorkJobSeeker = await this.prismaService.opWorkJobSeeker.update({
        include: {
          OpWorkEducation: true,
          OpWorkExperience: true,
          OpWorkJobSeekerSkill: { include: { OpWorkSkill: true } },
        },
        where: {
          id: opWorkJobSeeker.id,
          profileId: req.opWorkProfileId,
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
