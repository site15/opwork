import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { OpWorkProfileType, OpWorkUserType } from '../generated/prisma/client';
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
      const email = `test_${OpWorkUserType.ADMIN.toLowerCase()}@example.com`;
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: adminApiKey,
        userType: OpWorkUserType.ADMIN,
        email,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.ADMIN,
        email,
      });
    }
    const employerApiKeys = process.env.EMPLOYER_API_KEYS?.split(',') || [];
    for (const employerApiKey of employerApiKeys) {
      const email = `test_${OpWorkUserType.EMPLOYER.toLowerCase()}@example.com`;
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: employerApiKey,
        userType: OpWorkUserType.EMPLOYER,
        email,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.EMPLOYER,
        email,
      });
    }
    const jobSeekerApiKeys = process.env.JOB_SEEKER_API_KEYS?.split(',') || [];
    for (const jobSeekerApiKey of jobSeekerApiKeys) {
      const email = `test_${OpWorkUserType.JOB_SEEKER.toLowerCase()}@example.com`;
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: jobSeekerApiKey,
        userType: OpWorkUserType.JOB_SEEKER,
        email,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.SPECIALIST,
        userType: OpWorkUserType.JOB_SEEKER,
        email,
      });
    }
  }

  private async getOrCreateOpWorkProfileByUserId({
    userId,
    profileType,
    userType,
    email,
  }: {
    userId: string;
    profileType: OpWorkProfileType;
    userType: OpWorkUserType;
    email: string;
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
          email,
        },
      });
    }
    if (
      (!opWorkProfile?.isActive ||
        opWorkProfile?.type !== profileType ||
        opWorkProfile?.userType !== userType ||
        opWorkProfile.email !== email) &&
      opWorkProfile?.id
    ) {
      opWorkProfile = await this.prismaService.opWorkProfile.update({
        where: { id: opWorkProfile.id },
        data: {
          isActive: true,
          type: profileType,
          userType: userType,
          email,
        },
      });
    }
    return opWorkProfile;
  }

  private async getOrCreateAuthApiKeyByApiKey({
    apiKey,
    userType,
    email,
  }: {
    apiKey: string | undefined;
    userType: OpWorkUserType;
    email: string;
  }) {
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
