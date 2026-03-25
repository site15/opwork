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
import { OpWorkEducationDto } from '../generated/rest/op-work-education.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerEducationArgs } from '../types/job-seeker-types';
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
@Controller('job-seeker/education')
export class JobSeekerEducationController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkEducationDto, isArray: true })
  async getEducations(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkEducationDto[]> {
    if (!req.firstOpWorkJobSeeker?.id) {
      return [];
    }
    return await this.prismaService.opWorkEducation.findMany({
      where: {
        jobSeekerId: req.firstOpWorkJobSeeker?.id,
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkEducationDto })
  async setEducation(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerEducationArgs,
  ): Promise<OpWorkEducationDto> {
    const jobSeekerId = args.jobSeekerId || req.firstOpWorkJobSeeker?.id;
    if (!jobSeekerId) {
      throw new Error('Job seeker not found');
    }
    if (args.id) {
      return await this.prismaService.opWorkEducation.update({
        where: {
          id: args.id,
          OpWorkJobSeeker: { id: jobSeekerId },
          profileId: req.opWorkProfileId,
        },
        data: {
          degree: args.degree,
          description: args.description,
          institution: args.institution,
          fieldOfStudy: args.fieldOfStudy,
          startDate: args.startDate,
          endDate: args.endDate,
          grade: args.grade,
          isCurrent: args.isCurrent,
        },
      });
    } else {
      const opWorkJobSeeker =
        await this.prismaService.opWorkJobSeeker.findFirstOrThrow({
          where: {
            id: jobSeekerId,
            profileId: req.opWorkProfileId,
          },
        });
      return await this.prismaService.opWorkEducation.create({
        data: {
          degree: args.degree,
          description: args.description,
          institution: args.institution,
          fieldOfStudy: args.fieldOfStudy,
          startDate: args.startDate,
          endDate: args.endDate,
          grade: args.grade,
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

  @Delete(':education_id')
  @ApiOkResponse({ type: StatusResponse })
  async delEducation(
    @CurrentAppRequest() req: AppRequest,
    @Param('education_id', new ParseUUIDPipe()) educationId: string,
  ): Promise<StatusResponse> {
    await this.prismaService.opWorkEducation.deleteMany({
      where: {
        id: educationId,
        OpWorkJobSeeker: { id: req.firstOpWorkJobSeeker?.id },
        profileId: req.opWorkProfileId,
      },
    });
    return { message: 'ok' };
  }
}
