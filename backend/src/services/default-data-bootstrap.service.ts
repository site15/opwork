import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { OpWorkProfileType, OpWorkUserType } from '../generated/prisma/client';
import { createHashFromString } from '../utils/create-hash-from-string';
import { PRISMA_SERVICE, PrismaService } from './prisma.service';

@Injectable()
export class DefaultDataBootstrapService implements OnApplicationBootstrap {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    const adminApiKeys = process.env.ADMIN_API_KEYS?.split(',') || [];
    for (const adminApiKey of adminApiKeys) {
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: adminApiKey,
        userType: OpWorkUserType.ADMIN,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.ADMIN,
      });
    }
    const employerApiKeys = process.env.EMPLOYER_API_KEYS?.split(',') || [];
    for (const employerApiKey of employerApiKeys) {
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: employerApiKey,
        userType: OpWorkUserType.EMPLOYER,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.EMPLOYER,
      });
    }
    const jobSeekerApiKeys = process.env.JOB_SEEKER_API_KEYS?.split(',') || [];
    for (const jobSeekerApiKey of jobSeekerApiKeys) {
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: jobSeekerApiKey,
        userType: OpWorkUserType.JOB_SEEKER,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.SPECIALIST,
        userType: OpWorkUserType.JOB_SEEKER,
      });
    }
  }

  private async getOrCreateOpWorkProfileByUserId({
    userId,
    profileType,
    userType,
  }: {
    userId: string;
    profileType: OpWorkProfileType;
    userType: OpWorkUserType;
  }) {
    let opWorkProfile = await this.prismaService.opWorkProfile.findFirst({
      where: { userId, type: profileType, userType: userType },
    });
    if (!opWorkProfile) {
      opWorkProfile = await this.prismaService.opWorkProfile.create({
        data: {
          userId,
          isActive: true,
          type: profileType,
          userType: userType,
        },
      });
    }
    if (
      (!opWorkProfile?.isActive ||
        opWorkProfile?.type !== profileType ||
        opWorkProfile?.userType !== userType) &&
      opWorkProfile?.id
    ) {
      opWorkProfile = await this.prismaService.opWorkProfile.update({
        where: { id: opWorkProfile.id },
        data: {
          isActive: true,
          type: profileType,
          userType: userType,
        },
      });
    }
    return opWorkProfile;
  }

  private async getOrCreateAuthApiKeyByApiKey({
    apiKey,
    userType,
  }: {
    apiKey: string | undefined;
    userType: OpWorkUserType;
  }) {
    const email = `${userType.toLowerCase()}_${createHashFromString(apiKey || '').slice(0, 7)}@example.com`;
    let authApiKey = await this.prismaService.authApiKey.findFirst({
      include: { AuthUser: true },
      where: { apiKey },
    });
    if (!authApiKey) {
      authApiKey = await this.prismaService.authApiKey.create({
        include: { AuthUser: true },
        data: {
          apiKey,
          isActive: true,
          AuthUser: {
            create: {
              isActive: true,
              email,
            },
          },
        },
      });
    }
    if (!authApiKey?.isActive && authApiKey?.id) {
      authApiKey = await this.prismaService.authApiKey.update({
        include: { AuthUser: true },
        where: { id: authApiKey.id },
        data: {
          isActive: true,
        },
      });
    }
    if (authApiKey.AuthUser.email !== email) {
      const authUser = await this.prismaService.authUser.update({
        where: { id: authApiKey.AuthUser.id },
        data: {
          email,
        },
      });
      authApiKey.AuthUser = authUser;
    }
    return authApiKey;
  }
}
