import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { SKILL_CATEGORIES } from '../constants/skill-categories';
import {
  OpWorkProfileType,
  OpWorkSkillType,
  OpWorkUserType,
} from '../generated/prisma/client';
import { verifyPassword } from '../utils/hashPassword';
import { PRISMA_SERVICE, PrismaService } from './prisma.service';
import { getRandomSha7 } from '../../test/utils/utils';

@Injectable()
export class DefaultDataBootstrapService implements OnApplicationBootstrap {
  private logger = new Logger(DefaultDataBootstrapService.name);

  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Bootstraping default data...');
    await this.createOrUpdateDefaultApiKeys();
    await this.createOrUpdateDefaultUsers();
    await this.createOrUpdateDefaultSkills();
  }

  private async createOrUpdateDefaultSkills() {
    for (const skillCategory of Object.values(OpWorkSkillType)) {
      for (const name of SKILL_CATEGORIES[skillCategory]) {
        const [, category] = skillCategory.split('__');
        const exist = await this.prismaService.opWorkSkill.findFirst({
          where: { name },
        });
        if (!exist) {
          await this.prismaService.opWorkSkill.create({
            data: { type: skillCategory, category, name, popularity: 0 },
          });
        } else {
          await this.prismaService.opWorkSkill.updateMany({
            where: { name },
            data: { type: skillCategory, category },
          });
        }
      }
    }
  }

  private async createOrUpdateDefaultUsers() {
    //
    const admins =
      process.env.ADMINS?.split(',').map((user) => (user + ':').split(':')) ||
      [];
    for (const [email, password] of admins) {
      const authUser = await this.getOrCreateAuthAuthUser({
        userType: OpWorkUserType.ADMIN,
        email,
        password,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authUser.id,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.ADMIN,
        email,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authUser.id,
        profileType: OpWorkProfileType.SPECIALIST,
        userType: OpWorkUserType.ADMIN,
        email,
      });
    }
    //
    const employers =
      process.env.EMPLOYERS?.split(',').map((user) =>
        (user + ':').split(':'),
      ) || [];
    for (const [email, password] of employers) {
      const authUser = await this.getOrCreateAuthAuthUser({
        userType: OpWorkUserType.EMPLOYER,
        email,
        password,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authUser.id,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.EMPLOYER,
        email,
      });
    }
    //
    const jobSeekers =
      process.env.JOB_SEEKERS?.split(',').map((user) =>
        (user + ':').split(':'),
      ) || [];
    for (const [email, password] of jobSeekers) {
      const authUser = await this.getOrCreateAuthAuthUser({
        userType: OpWorkUserType.JOB_SEEKER,
        email,
        password,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authUser.id,
        profileType: OpWorkProfileType.SPECIALIST,
        userType: OpWorkUserType.JOB_SEEKER,
        email,
      });
    }
  }

  private async createOrUpdateDefaultApiKeys() {
    //
    const adminApiKeys = process.env.ADMIN_API_KEYS?.split(',') || [];
    for (const adminApiKey of adminApiKeys) {
      const email = `test_${OpWorkUserType.ADMIN.toLowerCase()}@example.com`;
      const authApiKey = await this.getOrCreateAuthApiKeyByApiKey({
        apiKey: adminApiKey,
        userType: OpWorkUserType.ADMIN,
        email,
        password: getRandomSha7(),
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.EMPLOYER,
        userType: OpWorkUserType.ADMIN,
        email,
      });
      await this.getOrCreateOpWorkProfileByUserId({
        userId: authApiKey.userId,
        profileType: OpWorkProfileType.SPECIALIST,
        userType: OpWorkUserType.ADMIN,
        email,
      });
    }
    //
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
    //
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
    password,
  }: {
    apiKey: string | undefined;
    userType: OpWorkUserType;
    email: string;
    password?: string;
  }) {
    let authApiKey =
      await this.prismaService.$withoutUniversalPasswordHashing.authApiKey.findFirst(
        {
          include: { AuthUser: true },
          where: { apiKey },
        },
      );
    if (!authApiKey) {
      authApiKey =
        await this.prismaService.$withoutUniversalPasswordHashing.authApiKey.create(
          {
            include: { AuthUser: true },
            data: {
              apiKey,
              isActive: true,
              AuthUser: {
                create: {
                  isActive: true,
                  email,
                  password,
                },
              },
            },
          },
        );
    }
    if (!authApiKey?.isActive && authApiKey?.id) {
      authApiKey =
        await this.prismaService.$withoutUniversalPasswordHashing.authApiKey.update(
          {
            include: { AuthUser: true },
            where: { id: authApiKey.id },
            data: {
              isActive: true,
            },
          },
        );
    }
    if (
      authApiKey.AuthUser.email !== email ||
      !verifyPassword(password, authApiKey.AuthUser.password)
    ) {
      const authUser = await this.prismaService.authUser.update({
        where: { id: authApiKey.AuthUser.id },
        data: {
          password: password || '',
          email,
        },
      });
      authApiKey.AuthUser = authUser;
    }
    return authApiKey;
  }

  private async getOrCreateAuthAuthUser({
    email,
    password,
  }: {
    userType: OpWorkUserType;
    email: string;
    password?: string;
  }) {
    let authUser =
      await this.prismaService.$withoutUniversalPasswordHashing.authUser.findFirst(
        { where: { email } },
      );
    if (!authUser) {
      authUser = await this.prismaService.authUser.create({
        data: {
          isActive: true,
          email,
          password,
        },
      });
    }
    if (
      (!authUser?.isActive || !verifyPassword(password, authUser?.password)) &&
      authUser?.id
    ) {
      authUser = await this.prismaService.authUser.update({
        where: { id: authUser.id },
        data: {
          isActive: true,
          password,
        },
      });
    }
    return authUser;
  }
}
