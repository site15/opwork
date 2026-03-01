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
import { OpWorkEducationDto } from '../generated/rest/op-work-education.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetJobSeekerEducationArgs } from '../types/job-seeker-types';
import { AppRequest } from '../types/request';

@ApiTags('job-seeker')
@Controller('job-seeker/education')
export class JobSeekerEducationController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get(':job_seeker_id')
  @ApiOkResponse({ type: OpWorkEducationDto, isArray: true })
  async getEducations(
    @Param('job_seeker_id', new ParseUUIDPipe()) jobSeekerId: string,
  ): Promise<OpWorkEducationDto[]> {
    return await this.prismaService.opWorkEducation.findMany({
      where: {
        jobSeekerId: jobSeekerId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkEducationDto })
  async setEducation(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetJobSeekerEducationArgs,
  ): Promise<OpWorkEducationDto> {
    if (args.id) {
      return await this.prismaService.opWorkEducation.update({
        where: { id: args.id },
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
            id: args.jobSeekerId,
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
}
