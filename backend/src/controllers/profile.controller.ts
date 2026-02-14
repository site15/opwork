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
import { OpWorkProfileType, OpWorkUserType } from '../generated/prisma/enums';
import { PRISMA_SERVICE, PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';

class UpdateProfileDto {
  title?: string;
  location?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  coverImage?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  type?: OpWorkProfileType;
  userType?: OpWorkUserType;
  isActive?: boolean;
}

class ProfileResponse {
  id!: string;
  userId!: string;
  type!: OpWorkProfileType;
  userType!: OpWorkUserType;
  title!: string | null;
  description!: string | null;
  isActive!: boolean | null;
  isEmailVerified!: boolean | null;
  email!: string | null;
  phone!: string | null;
  website!: string | null;
  location!: string | null;
  avatarUrl!: string | null;
  coverImage!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

class UpdateProfileResponse {
  message!: string;
  profile!: ProfileResponse;
}

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ProfileResponse })
  async getProfile(
    @CurrentAppRequest() req: AppRequest,
  ): Promise<ProfileResponse | null> {
    const profile = await this.prismaService.opWorkProfile.findFirst({
      where: {
        userId: req.user.id,
      },
    });

    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      userId: profile.userId,
      type: profile.type,
      userType: profile.userType,
      title: profile.title,
      location: profile.location,
      description: profile.description,
      avatarUrl: profile.avatarUrl,
      coverImage: profile.coverImage,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      isActive: profile.isActive,
      isEmailVerified: profile.isEmailVerified,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  @Put()
  @ApiOkResponse({ type: UpdateProfileResponse })
  async updateProfile(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: UpdateProfileDto,
  ): Promise<UpdateProfileResponse> {
    let profile = await this.prismaService.opWorkProfile.findFirst({
      where: {
        userId: req.user.id,
      },
    });

    if (profile) {
      profile = await this.prismaService.opWorkProfile.update({
        where: {
          id: profile.id,
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
          isActive: args.isActive,
          ...(args.type && { type: args.type }),
          ...(args.userType && { userType: args.userType }),
        },
      });
    } else {
      profile = await this.prismaService.opWorkProfile.create({
        data: {
          userId: req.user.id,
          title: args.title,
          location: args.location,
          description: args.description,
          avatarUrl: args.avatarUrl,
          coverImage: args.coverImage,
          email: args.email,
          phone: args.phone,
          website: args.website,
          isActive: args.isActive ?? true,
          type: args.type ?? OpWorkProfileType.SPECIALIST,
          userType: args.userType ?? OpWorkUserType.JOB_SEEKER,
        },
      });
    }

    return {
      message: 'Profile updated successfully',
      profile: {
        id: profile.id,
        userId: profile.userId,
        type: profile.type,
        userType: profile.userType,
        title: profile.title,
        location: profile.location,
        description: profile.description,
        avatarUrl: profile.avatarUrl,
        coverImage: profile.coverImage,
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        isActive: profile.isActive,
        isEmailVerified: profile.isEmailVerified,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ProfileResponse })
  async getProfileById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ProfileResponse> {
    const profile = await this.prismaService.opWorkProfile.findFirstOrThrow({
      where: {
        id,
      },
    });

    return {
      id: profile.id,
      userId: profile.userId,
      type: profile.type,
      userType: profile.userType,
      title: profile.title,
      location: profile.location,
      description: profile.description,
      avatarUrl: profile.avatarUrl,
      coverImage: profile.coverImage,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      isActive: profile.isActive,
      isEmailVerified: profile.isEmailVerified,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
