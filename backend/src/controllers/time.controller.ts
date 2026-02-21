import { Controller, Get, Header, MessageEvent, Sse } from '@nestjs/common';

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
  @Get()
  @ApiOkResponse({ type: Date })
  time() {
    return new Date();
  }

  @Sse('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  stream(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: new Date(), type: 'message' }) satisfies MessageEvent),
    );
  }
}
