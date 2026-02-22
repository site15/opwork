import { Inject, Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { CreateOpWorkNotificationDto } from '../generated/rest/create-op-work-notification.dto';
import { OpWorkNotification } from '../generated/rest/op-work-notification.entity';
import { PRISMA_SERVICE, PrismaService } from './prisma.service';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);
  private events$ = new Subject<OpWorkNotification>();
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  get events() {
    return this.events$.asObservable();
  }

  async create(
    notification: Omit<
      CreateOpWorkNotificationDto,
      'OpWorkProfile' | 'data' | 'autoMarkReadAtIds'
    > & {
      profileId: string;
      data: object;
      autoMarkReadAtIds: string[];
    },
  ) {
    this.logger.log(`Creating notification ${notification.message}`);
    const createdNotification =
      await this.prismaService.opWorkNotification.create({
        include: { OpWorkProfile: true },
        data: {
          message: notification.message,
          type: notification.type,
          title: notification.title,
          data: notification.data || {},
          OpWorkProfile: { connect: { id: notification.profileId } },
          autoMarkReadAtIds: notification.autoMarkReadAtIds?.join(','),
          createdAt: new Date(),
        },
      });
    this.events$.next(createdNotification);
    return createdNotification;
  }

  async markAsReadAllWithAutoMarkReadAtIds(
    autoMarkReadAtIds: string[],
    profileId: string,
  ) {
    this.logger.log(`Marking notifications ${autoMarkReadAtIds} as read`);
    const updatedNotifications =
      await this.prismaService.opWorkNotification.updateManyAndReturn({
        where: {
          profileId: profileId,
          OR: autoMarkReadAtIds.map((autoMarkReadAtId) => ({
            autoMarkReadAtIds: { contains: autoMarkReadAtId },
          })),
        },
        data: { isRead: true, readAt: new Date() },
      });
    for (const updatedNotification of updatedNotifications) {
      this.events$.next(updatedNotification);
    }
    return updatedNotifications;
  }

  async markAsRead(notificationIds: string[], profileId: string) {
    this.logger.log(`Marking notifications ${notificationIds} as read`);
    const updatedNotifications =
      await this.prismaService.opWorkNotification.updateManyAndReturn({
        where: {
          profileId: profileId,
          id: { in: notificationIds },
        },
        data: { isRead: true, readAt: new Date() },
      });
    for (const updatedNotification of updatedNotifications) {
      this.events$.next(updatedNotification);
    }
    return updatedNotifications;
  }

  async markAsArchived(notificationIds: string[], profileId: string) {
    this.logger.log(`Marking notifications ${notificationIds} as archived`);
    const updatedNotifications =
      await this.prismaService.opWorkNotification.updateManyAndReturn({
        where: {
          profileId: profileId,
          id: { in: notificationIds },
        },
        data: { isArchived: true },
      });
    for (const updatedNotification of updatedNotifications) {
      this.events$.next(updatedNotification);
    }
    return updatedNotifications;
  }
}
