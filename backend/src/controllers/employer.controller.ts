import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkEmployer } from '../generated/rest/op-work-employer.entity';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetEmployerProfileArgs } from '../types/employer-types';
import { AppRequest } from '../types/request';

@ApiTags('employer')
@Controller('employer')
export class EmployerController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkEmployer })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkEmployer | null> {
    return await this.prismaService.opWorkEmployer.findFirstOrThrow({
      include: {
        OpWorkJob: {
          include: {
            OpWorkJobSkill: { include: { OpWorkSkill: true } },
            opWorkJobTags: { include: { OpWorkJob: true } },
          },
        },
      },
      where: {
        profileId: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkEmployer })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetEmployerProfileArgs,
  ): Promise<OpWorkEmployer> {
    let opWorkEmployer = await this.prismaService.opWorkEmployer.findFirst({
      where: {
        profileId: req.opWorkProfileId,
      },
    });
    if (opWorkEmployer) {
      opWorkEmployer = await this.prismaService.opWorkEmployer.update({
        include: {
          OpWorkJob: {
            include: {
              OpWorkJobSkill: { include: { OpWorkSkill: true } },
              opWorkJobTags: { include: { OpWorkJob: true } },
            },
          },
        },
        where: {
          profileId: req.opWorkProfileId,
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
              opWorkJobTags: { include: { OpWorkJob: true } },
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
