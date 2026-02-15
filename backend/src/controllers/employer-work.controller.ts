import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerWorkArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';
import { OpWorkJobDto } from '../generated/rest/op-work-job.dto';

@ApiTags('employer')
@Controller('employer/work')
export class EmployerWorkController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkJobDto, isArray: true })
  async getWorks(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkJobDto[]> {
    return await this.prismaService.opWorkJob.findMany({
      include: {
        OpWorkJobSkill: { include: { OpWorkSkill: true } },
        opWorkJobTags: { include: { OpWorkJob: true } },
      },
      where: {
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkJobDto })
  async setWork(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetEmployerWorkArgs,
  ): Promise<OpWorkJobDto> {
    if (args.id) {
      return await this.prismaService.opWorkJob.update({
        include: {
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          opWorkJobTags: { include: { OpWorkJob: true } },
        },
        where: { id: args.id },
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
            profileId: req.opWorkProfileId,
          },
        });
      return await this.prismaService.opWorkJob.create({
        include: {
          OpWorkJobSkill: { include: { OpWorkSkill: true } },
          opWorkJobTags: { include: { OpWorkJob: true } },
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
