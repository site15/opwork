import {
  Controller,
  Get,
  Header,
  Logger,
  MessageEvent,
  Sse,
} from '@nestjs/common';

import { ApiOkResponse } from '@nestjs/swagger';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { interval, map, Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('time')
@Controller('time')
export class TimeController {
  private logger = new Logger(TimeController.name);
  @Get()
  @ApiOkResponse({ type: Date })
  time() {
    return new Date();
  }

  @Sse('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  stream(): Observable<MessageEvent> {
    this.logger.log('Streaming started');
    return interval(1000).pipe(
      map(() => ({ data: new Date(), type: 'Date' }) satisfies MessageEvent),
    );
  }
}
