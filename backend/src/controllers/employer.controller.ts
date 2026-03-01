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
import { OpWorkEmployer } from '../generated/rest/op-work-employer.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import {
  DetEmployerProfileArgs,
  SetEmployerProfileArgs,
} from '../types/employer-types';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

@ApiTags('employer')
@Controller('employer')
export class EmployerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get('all')
  @ApiOkResponse({ type: OpWorkEmployer, isArray: true })
  async getProfiles(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkEmployer[]> {
    if (!req.opWorkProfileId) {
      return [];
    }
    const result = await this.prismaService.opWorkEmployer.findMany({
      include: {
        OpWorkJob: {
          include: {
            OpWorkJobSkill: { include: { OpWorkSkill: true } },
            opWorkJobTags: true,
          },
        },
      },
      where: {
        profileId: req.opWorkProfileId,
      },
    });
    return result;
  }

  @Get(':employer_id')
  @ApiOkResponse({ type: OpWorkEmployer })
  async getProfile(
    @Param('employer_id', new ParseUUIDPipe()) employerId: string,
  ): Promise<OpWorkEmployer | null> {
    return await this.prismaService.opWorkEmployer.findFirstOrThrow({
      include: {
        OpWorkJob: {
          include: {
            OpWorkJobSkill: { include: { OpWorkSkill: true } },
            opWorkJobTags: true,
          },
        },
      },
      where: {
        id: employerId,
      },
    });
  }

  @Delete()
  @ApiOkResponse({ type: StatusResponse })
  async delProfile(
    @Body() args: DetEmployerProfileArgs,
  ): Promise<StatusResponse> {
    if (args.id) {
      await this.prismaService.opWorkExperience.deleteMany({
        where: {
          jobSeekerId: args.id,
        },
      });
      await this.prismaService.opWorkEducation.deleteMany({
        where: {
          jobSeekerId: args.id,
        },
      });
      await this.prismaService.opWorkJobSeekerSkill.deleteMany({
        where: {
          jobSeekerId: args.id,
        },
      });
      await this.prismaService.opWorkApplication.deleteMany({
        where: {
          jobSeekerId: args.id,
        },
      });
      await this.prismaService.opWorkJobSeeker.delete({
        where: {
          id: args.id,
        },
      });
    }
    return { message: 'ok' };
  }

  @Put()
  @ApiOkResponse({ type: OpWorkEmployer })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetEmployerProfileArgs,
  ): Promise<OpWorkEmployer> {
    let opWorkEmployer = !args.id
      ? undefined
      : await this.prismaService.opWorkEmployer.findFirst({
          where: {
            profileId: args.id,
          },
        });
    if (opWorkEmployer) {
      opWorkEmployer = await this.prismaService.opWorkEmployer.update({
        include: {
          OpWorkJob: {
            include: {
              OpWorkJobSkill: { include: { OpWorkSkill: true } },
              opWorkJobTags: true,
            },
          },
        },
        where: {
          id: opWorkEmployer.id,
        },
        data: {
          companyEmail: args.companyEmail,
          companyPhone: args.companyPhone,
          companyWebsite: args.companyWebsite,
          companyName: args.companyName,
          coverImageUrl: args.coverImageUrl,
          culture: args.culture,
          description: args.description,
          facebookUrl: args.facebookUrl,
          foundedYear: args.foundedYear,
          headquarters: args.headquarters,
          industry: args.industry,
          linkedinUrl: args.linkedinUrl,
          logoUrl: args.logoUrl,
          mission: args.mission,
          twitterUrl: args.twitterUrl,
        },
      });
    } else {
      opWorkEmployer = await this.prismaService.opWorkEmployer.create({
        include: {
          OpWorkJob: {
            include: {
              OpWorkJobSkill: { include: { OpWorkSkill: true } },
              opWorkJobTags: true,
            },
          },
        },
        data: {
          profileId: req.opWorkProfileId,
          companyEmail: args.companyEmail,
          companyPhone: args.companyPhone,
          companyWebsite: args.companyWebsite,
          companyName: args.companyName || '',
          coverImageUrl: args.coverImageUrl,
          culture: args.culture,
          description: args.description,
          facebookUrl: args.facebookUrl,
          foundedYear: args.foundedYear,
          headquarters: args.headquarters,
          industry: args.industry,
          linkedinUrl: args.linkedinUrl,
          logoUrl: args.logoUrl,
          mission: args.mission,
          twitterUrl: args.twitterUrl,
        },
      });
    }

    return opWorkEmployer;
  }
}
