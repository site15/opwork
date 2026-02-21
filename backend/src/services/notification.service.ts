import { Inject, Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { PRISMA_SERVICE, PrismaService } from './prisma.service';
import { OpWorkNotification } from '../generated/rest/op-work-notification.entity';
import assert from 'assert';

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

  async create(notification: OpWorkNotification) {
    assert(notification.profileId, 'Profile ID is required');

    this.logger.log(`Creating notification ${notification.id}`);
    const createdNotification =
      await this.prismaService.opWorkNotification.create({
        data: {
          message: notification.message,
          type: notification.type,
          title: notification.title,
          data: notification.data || {},
          OpWorkProfile: { connect: { id: notification.profileId } },
          createdAt: new Date(),
        },
      });
    this.events$.next(createdNotification);
    return createdNotification;
  }

  async markAsRead(notificationId: string) {
    this.logger.log(`Marking notification ${notificationId} as read`);
    return this.prismaService.opWorkNotification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }
}
