import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
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

  @Get()
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobSeeker | null> {
    return await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
      include: {
        OpWorkEducation: true,
        OpWorkExperience: true,
        OpWorkJobSeekerSkill: true,
      },
      where: {
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkJobSeeker })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerProfileArgs,
  ): Promise<OpWorkJobSeeker> {
    let opWorkJobSeeker = await this.prismaService.opWorkJobSeeker.findFirst({
      where: {
        profileId: req.opWorkProfileId,
      },
    });
    if (opWorkJobSeeker) {
      opWorkJobSeeker = await this.prismaService.opWorkJobSeeker.update({
        include: {
          OpWorkEducation: true,
          OpWorkExperience: true,
          OpWorkJobSeekerSkill: true,
        },
        where: {
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
          OpWorkJobSeekerSkill: true,
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
