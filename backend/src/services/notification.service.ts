import { Inject, Injectable, Logger } from '@nestjs/common';
import assert from 'assert';
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
    notification: Omit<CreateOpWorkNotificationDto, 'OpWorkProfile'> & {
      profileId: string;
    },
  ) {
    const createdNotification =
      await this.prismaService.opWorkNotification.create({
        include: { OpWorkProfile: true },
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
