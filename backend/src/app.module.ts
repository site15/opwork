import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiSecurity } from '@nestjs/swagger';
import { join } from 'path';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataBootstrapService } from './services/default-data-bootstrap.service';
import { PrismaService } from './services/prisma.service';

const controllers = [...CONTROLLERS];
for (const controller of controllers) {
  ApiSecurity('api_key')(controller);
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
    PrismaService,
    DefaultDataBootstrapService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
