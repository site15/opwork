import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DefaultDataBootstrapService implements OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const adminApiKey = process.env.ADMIN_API_KEY;
    const apiKey = await this.prismaService.authApiKey.findFirst({
      where: { apiKey: adminApiKey },
    });
    if (!apiKey) {
      await this.prismaService.authApiKey.create({
        data: {
          apiKey: adminApiKey,
          isActive: true,
          AuthUser: {
            create: { isActive: true },
          },
        },
      });
    }
    if (!apiKey?.isActive && apiKey?.id) {
      await this.prismaService.authApiKey.update({
        where: { id: apiKey.id },
        data: {
          isActive: true,
        },
      });
    }
  }
}
