import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { OpWorkProfileDto } from '../generated/rest/op-work-profile.dto';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { SetProfileArgs } from '../types/profile-types';
import { AppRequest } from '../types/request';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: OpWorkProfileDto })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<OpWorkProfileDto | null> {
    return await this.prismaService.opWorkProfile.findFirstOrThrow({
      where: {
        id: req.opWorkProfileId,
      },
    });
  }

  @Put()
  @ApiOkResponse({ type: OpWorkProfileDto })
  async setProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SetProfileArgs,
  ): Promise<OpWorkProfileDto> {
    return await this.prismaService.opWorkProfile.update({
      where: {
        id: req.opWorkProfileId,
      },
      data: {
        title: args.title,
        location: args.location,
        description: args.description,
        avatarUrl: args.avatarUrl,
        coverImage: args.coverImage,
        email: args.email,
        phone: args.phone,
        website: args.website,
      },
    });
  }
}
