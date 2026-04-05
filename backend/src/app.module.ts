import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiSecurity } from '@nestjs/swagger';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { EmployerWorkSkillController } from './controllers/employer-job-skill.controller';
import { EmployerJobTagsController } from './controllers/employer-job-tags.controller';
import { EmployeJobController } from './controllers/employer-job.controller';
import { EmployerController } from './controllers/employer.controller';
import { JobSeekerEducationController } from './controllers/job-seeker-education.controller';
import { JobSeekerExperienceController } from './controllers/job-seeker-experience.controller';
import { JobSeekerSkillController } from './controllers/job-seeker-skill.controller';
import { JobSeekerController } from './controllers/job-seeker.controller';
import { NotificationController } from './controllers/notification.controller';
import { ProfileController } from './controllers/profile.controller';
import { ResumeController } from './controllers/resume.controller';
import { VacanyApplicationController } from './controllers/vacancy-application.controller';
import { VacancyController } from './controllers/vacancy.controller';
import { CheckOpWorkUserTypes } from './decorators/check-op-work-user-type';
import { AppExceptionsFilter } from './filters/app.filter';
import { OpWorkUserType } from './generated/prisma/enums';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataBootstrapService } from './services/default-data-bootstrap.service';
import { NotificationService } from './services/notification.service';
import { PrismaToolsService } from './services/prisma-tools.service';
import { providePrismaService } from './services/prisma.service';
import { TimeController } from './controllers/time.controller';
import { ResumeApplicationController } from './controllers/resume-application.controller';

const generatedControllers = CONTROLLERS;
const appControllers = [
  AuthController,
  ProfileController,
  JobSeekerController,
  JobSeekerSkillController,
  JobSeekerEducationController,
  JobSeekerExperienceController,
  EmployerController,
  EmployeJobController,
  EmployerWorkSkillController,
  EmployerJobTagsController,
  VacanyApplicationController,
  ResumeApplicationController,
  VacancyController,
  ResumeController,
  NotificationController,
  TimeController,
];
const controllers = [...generatedControllers, ...appControllers];

// Apply ApiSecurity to all controllers
for (const controller of controllers) {
  ApiSecurity('api_key')(controller);
  ApiSecurity('session_id')(controller);
}

for (const controller of generatedControllers) {
  CheckOpWorkUserTypes([
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
    NotificationService,
    DefaultDataBootstrapService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AppExceptionsFilter },
  ],
})
export class AppModule {}
