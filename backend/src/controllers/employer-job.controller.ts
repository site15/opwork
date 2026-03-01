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
import { OpWorkJobDto } from '../generated/rest/op-work-job.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerJobArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';

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
    @Param('employer_id', new ParseUUIDPipe()) employerId: string,
  ): Promise<OpWorkJobDto[]> {
    return await this.prismaService.opWorkJob.findMany({
      include: {
        OpWorkJobSkill: { include: { OpWorkSkill: true } },
        opWorkJobTags: true,
      },
      where: {
        employerId: employerId,
      },
    });
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
            id: args.employerId,
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
