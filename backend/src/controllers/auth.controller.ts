import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { AuthUser } from '../generated/rest/auth-user.entity';
import { AppRequest } from '../types/request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Get('profile')
  @ApiOkResponse({ type: AuthUser })
  async profile(@CurrentAppRequest() req: AppRequest): Promise<AuthUser> {
    return req.user;
  }
}
