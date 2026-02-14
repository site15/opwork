import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiSecurity } from '@nestjs/swagger';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { AppExceptionsFilter } from './filters/app.filter';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataBootstrapService } from './services/default-data-bootstrap.service';
import { PrismaToolsService } from './services/prisma-tools.service';
import { providePrismaService } from './services/prisma.service';

const controllers = [...CONTROLLERS, AuthController];
for (const controller of controllers) {
  ApiSecurity('api_key')(controller);
  ApiSecurity('session_id')(controller);
}

@Module({
  imports: [
    JwtModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers,
  providers: [
    providePrismaService(process.env.DATABASE_URL!),
    PrismaToolsService,
    DefaultDataBootstrapService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AppExceptionsFilter },
  ],
})
export class AppModule {}
