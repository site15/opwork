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
import { OpWorkExperienceDto } from '../generated/rest/op-work-experience.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerExperienceArgs } from '../types/job-seeker-types';
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
@Controller('job-seeker/experience')
export class JobSeekerExperienceController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkExperienceDto, isArray: true })
  async getExperiences(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkExperienceDto[]> {
    if (!req.firstOpWorkJobSeeker?.id) {
      return [];
    }
    return await this.prismaService.opWorkExperience.findMany({
      where: {
        jobSeekerId: req.firstOpWorkJobSeeker?.id,
        profileId: req.opWorkProfileId,
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
        where: {
          id: args.id,
          OpWorkJobSeeker: { id: req.firstOpWorkJobSeeker?.id },
          profileId: req.opWorkProfileId,
        },
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
            profileId: req.opWorkProfileId,
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

  @Delete(':experience_id')
  @ApiOkResponse({ type: StatusResponse })
  async delExperience(
    @CurrentAppRequest() req: AppRequest,
    @Param('experience_id', new ParseUUIDPipe()) experienceId: string,
  ): Promise<StatusResponse> {
    await this.prismaService.opWorkExperience.deleteMany({
      where: {
        id: experienceId,
        OpWorkJobSeeker: { id: req.firstOpWorkJobSeeker?.id },
        profileId: req.opWorkProfileId,
      },
    });
    return { message: 'ok' };
  }
}
