import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkExperienceDto } from '../generated/rest/op-work-experience.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerExperienceArgs } from '../types/job-seeker-types';
import { AppRequest } from '../types/request';

@ApiTags('job-seeker')
@Controller('job-seeker/experience')
export class JobSeekerExperienceController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get(':job_seeker_id')
  @ApiOkResponse({ type: OpWorkExperienceDto, isArray: true })
  async getExperiences(
    @CurrentAppRequest() req: AppRequest,
    @Param('job_seeker_id') jobSeekerId: string,
  ): Promise<OpWorkExperienceDto[]> {
    return await this.prismaService.opWorkExperience.findMany({
      where: {
        jobSeekerId: jobSeekerId || req.firstOpWorkJobSeeker?.id,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkExperienceDto })
  async setExperience(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerExperienceArgs,
  ): Promise<OpWorkExperienceDto> {
    if (args.id) {
      return await this.prismaService.opWorkExperience.update({
        where: { id: args.id },
        data: {
          company: args.company,
          description: args.description,
          employmentType: args.employmentType,
          endDate: args.endDate,
          location: args.location,
          position: args.position,
          startDate: args.startDate,
          isCurrent: args.isCurrent,
        },
      });
    } else {
      const opWorkJobSeeker =
        await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
          where: {
            id: args.jobSeekerId || req.firstOpWorkJobSeeker?.id,
          },
        });
      return await this.prismaService.opWorkExperience.create({
        data: {
          company: args.company,
          description: args.description,
          employmentType: args.employmentType,
          endDate: args.endDate,
          location: args.location,
          position: args.position,
          startDate: args.startDate,
          isCurrent: args.isCurrent,
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
}
