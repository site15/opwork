import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiSecurity } from '@nestjs/swagger';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { JobSeekerEducationController } from './controllers/job-seeker-education.controller';
import { JobSeekerExperienceController } from './controllers/job-seeker-experience.controller';
import { JobSeekerSkillController } from './controllers/job-seeker-skill.controller';
import { JobSeekerController } from './controllers/job-seeker.controller';
import { ProfileController } from './controllers/profile.controller';
import { CheckOpWorkUserType } from './decorators/check-op-work-user-type';
import { AppExceptionsFilter } from './filters/app.filter';
import { OpWorkUserType } from './generated/prisma/enums';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataBootstrapService } from './services/default-data-bootstrap.service';
import { PrismaToolsService } from './services/prisma-tools.service';
import { providePrismaService } from './services/prisma.service';
import { EmployerController } from './controllers/employer.controller';

const generatedControllers = CONTROLLERS;
const appControllers = [
  AuthController,
  ProfileController,
  JobSeekerController,
  JobSeekerSkillController,
  JobSeekerEducationController,
  JobSeekerExperienceController,
  EmployerController,
];
const controllers = [...generatedControllers, ...appControllers];

// Apply ApiSecurity to all controllers
for (const controller of controllers) {
  ApiSecurity('api_key')(controller);
  ApiSecurity('session_id')(controller);
}

for (const controller of generatedControllers) {
  CheckOpWorkUserType([
    { method: 'POST', userTypes: [OpWorkUserType.ADMIN] },
    { method: 'PUT', userTypes: [OpWorkUserType.ADMIN] },
    { method: 'DELETE', userTypes: [OpWorkUserType.ADMIN] },
    {
      method: 'GET',
      userTypes: [
        OpWorkUserType.ADMIN,
        OpWorkUserType.EMPLOYER,
        OpWorkUserType.JOB_SEEKER,
      ],
    },
  ])(controller);
}

// Register controllers
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
