CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "OpWorkUserType" AS ENUM ('JOB_SEEKER', 'EMPLOYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OpWorkJobStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OpWorkEmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE', 'FREELANCE');

-- CreateEnum
CREATE TYPE "OpWorkExperienceLevel" AS ENUM ('INTERNSHIP', 'ENTRY_LEVEL', 'JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'EXPERT');

-- CreateEnum
CREATE TYPE "OpWorkApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'SHORTLISTED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "OpWorkProfileType" AS ENUM ('PROJECT', 'SPECIALIST', 'EMPLOYER');

-- CreateEnum
CREATE TYPE "OpWorkSkillType" AS ENUM ('PROGRAMMING_LANGUAGE', 'FRAMEWORK', 'DATABASE', 'TOOL', 'PLATFORM', 'LANGUAGE', 'SOFT_SKILL');

-- CreateEnum
CREATE TYPE "OpWorkEducationDegree" AS ENUM ('HIGH_SCHOOL', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'CERTIFICATE', 'DIPLOMA', 'POSTGRADUATE');

-- CreateEnum
CREATE TYPE "OpWorkGrade" AS ENUM ('A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS', 'D_PLUS', 'D', 'D_MINUS', 'F', 'PASS', 'FAIL', 'INCOMPLETE', 'AUDIT');

-- CreateEnum
CREATE TYPE "OpWorkProjectType" AS ENUM ('MVP', 'STARTUP', 'PRODUCT', 'SERVICE', 'CONSULTING', 'AGENCY', 'SAAS', 'ECOMMERCE', 'MOBILE_APP', 'WEB_APP', 'ENTERPRISE', 'NON_PROFIT', 'EDUCATION', 'HEALTHCARE', 'FINTECH', 'GAMING', 'AI_ML', 'BLOCKCHAIN', 'IOT', 'MARKETING');

-- CreateEnum
CREATE TYPE "OpWorkProjectStatus" AS ENUM ('IDEA', 'PLANNING', 'DEVELOPMENT', 'TESTING', 'LAUNCH_READY', 'LIVE', 'MAINTENANCE', 'ON_HOLD', 'CANCELLED', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OpWorkNotificationType" AS ENUM ('APPLICATION_RECEIVED', 'APPLICATION_SHORTLISTED', 'INTERVIEW_SCHEDULED', 'JOB_OFFER', 'JOB_MATCH', 'JOB_STATUS_CHANGED', 'NEW_PROJECT', 'MESSAGE_RECEIVED', 'REMINDER', 'SYSTEM_ALERT', 'PROFILE_UPDATE', 'NETWORK_ACTIVITY');

-- CreateEnum
CREATE TYPE "OpWorkFrequency" AS ENUM ('MINUTELY', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'ON_DEMAND');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "anonymousId" TEXT,
    "supabaseUserId" TEXT,
    "supabaseUserData" JSONB,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_AUTH_USER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthApiKey" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "apiKey" VARCHAR(255),
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_AUTH_API_KEY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_AUTH_SESSION" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkProfile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "type" "OpWorkProfileType" NOT NULL,
    "userType" "OpWorkUserType" NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "isEmailVerified" BOOLEAN DEFAULT false,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "website" VARCHAR(500),
    "location" VARCHAR(255),
    "avatarUrl" VARCHAR(500),
    "coverImage" VARCHAR(500),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_PROFILE" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJobSeeker" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "currentPosition" VARCHAR(255),
    "currentCompany" VARCHAR(255),
    "summary" TEXT,
    "expectedSalary" INTEGER,
    "salaryCurrency" VARCHAR(3) DEFAULT 'USD',
    "isOpenToWork" BOOLEAN DEFAULT true,
    "isOpenToRemote" BOOLEAN DEFAULT false,
    "isOpenToRelocation" BOOLEAN DEFAULT false,
    "preferredLocations" TEXT,
    "linkedinUrl" VARCHAR(500),
    "githubUrl" VARCHAR(500),
    "portfolioUrl" VARCHAR(500),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_JOB_SEEKER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkExperience" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobSeekerId" UUID NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6),
    "isCurrent" BOOLEAN DEFAULT false,
    "location" VARCHAR(255),
    "employmentType" "OpWorkEmploymentType",
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_EXPERIENCE" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkEducation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobSeekerId" UUID NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "degree" "OpWorkEducationDegree",
    "fieldOfStudy" VARCHAR(255),
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6),
    "isCurrent" BOOLEAN DEFAULT false,
    "description" TEXT,
    "grade" "OpWorkGrade",
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_EDUCATION" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkEmployer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "industry" VARCHAR(255),
    "description" TEXT,
    "mission" TEXT,
    "culture" TEXT,
    "foundedYear" SMALLINT,
    "headquarters" VARCHAR(255),
    "logoUrl" VARCHAR(500),
    "coverImageUrl" VARCHAR(500),
    "companyEmail" VARCHAR(255),
    "companyPhone" VARCHAR(50),
    "companyWebsite" VARCHAR(500),
    "linkedinUrl" VARCHAR(500),
    "twitterUrl" VARCHAR(500),
    "facebookUrl" VARCHAR(500),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_EMPLOYER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkProject" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "OpWorkProjectStatus",
    "type" "OpWorkProjectType",
    "githubRepoUrl" VARCHAR(512),
    "technologies" TEXT,
    "architecture" TEXT,
    "plannedDatesDescription" TEXT,
    "plannedStartDate" TIMESTAMP(6),
    "plannedEndDate" TIMESTAMP(6),
    "implementationDescription" TEXT,
    "actualStartDate" TIMESTAMP(6),
    "developmentStart" TIMESTAMP(6),
    "testingStart" TIMESTAMP(6),
    "launchDescription" TEXT,
    "launchDate" TIMESTAMP(6),
    "goLiveDate" TIMESTAMP(6),
    "completionDescription" TEXT,
    "actualEndDate" TIMESTAMP(6),
    "completionDate" TIMESTAMP(6),
    "maintenanceDescription" TEXT,
    "maintenanceStart" TIMESTAMP(6),
    "maintenanceEnd" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_PROJECT" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJob" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "employerId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "employmentType" "OpWorkEmploymentType" NOT NULL,
    "experienceLevel" "OpWorkExperienceLevel" NOT NULL,
    "department" VARCHAR(255),
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryCurrency" VARCHAR(3) DEFAULT 'USD',
    "location" VARCHAR(255),
    "isRemote" BOOLEAN DEFAULT false,
    "status" "OpWorkJobStatus" NOT NULL DEFAULT 'DRAFT',
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "applicationsCount" INTEGER NOT NULL DEFAULT 0,
    "savesCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(6),
    "expiresAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_JOB" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkApplication" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobSeekerId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "jobId" UUID NOT NULL,
    "coverLetter" TEXT,
    "resumeUrl" VARCHAR(500),
    "portfolioUrl" VARCHAR(500),
    "status" "OpWorkApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "statusNotes" TEXT,
    "appliedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusUpdatedAt" TIMESTAMP(6),

    CONSTRAINT "PK_OPWORK_APPLICATION" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkSavedJob" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "jobId" UUID NOT NULL,
    "savedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "PK_OPWORK_SAVED_JOB" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkSkill" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" "OpWorkSkillType",
    "category" VARCHAR(255),
    "icon" VARCHAR(500),
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_SKILL" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJobSeekerSkill" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobSeekerId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "level" SMALLINT NOT NULL DEFAULT 3,
    "yearsOfExp" SMALLINT,
    "isPrimary" BOOLEAN DEFAULT false,
    "lastUsed" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_JOB_SEEKER_SKILL" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJobSkill" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "isRequired" BOOLEAN DEFAULT true,
    "importance" SMALLINT NOT NULL DEFAULT 3,
    "minLevel" SMALLINT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_JOB_SKILL" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkNotification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "profileId" UUID,
    "type" "OpWorkNotificationType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "isRead" BOOLEAN DEFAULT false,
    "isArchived" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(6),

    CONSTRAINT "PK_OPWORK_NOTIFICATION" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkNotificationSettings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "emailApplicationUpdates" BOOLEAN DEFAULT true,
    "emailJobAlerts" BOOLEAN DEFAULT true,
    "emailNewsletter" BOOLEAN DEFAULT false,
    "pushApplicationUpdates" BOOLEAN DEFAULT true,
    "pushJobAlerts" BOOLEAN DEFAULT true,
    "jobAlertFrequency" "OpWorkFrequency" DEFAULT 'DAILY',
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_NOTIFICATION_SETTINGS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkSearchHistory" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "query" VARCHAR(500) NOT NULL,
    "filters" JSONB,
    "resultsCount" INTEGER DEFAULT 0,
    "searchedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_SEARCH_HISTORY" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJobView" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID,
    "jobId" UUID NOT NULL,
    "viewedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(500),

    CONSTRAINT "PK_OPWORK_JOB_VIEW" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkSavedSearch" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "query" VARCHAR(500) NOT NULL,
    "filters" JSONB,
    "isActive" BOOLEAN DEFAULT true,
    "frequency" "OpWorkFrequency" DEFAULT 'DAILY',
    "lastSentAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_SAVED_SEARCH" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkSkillSynonym" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "skillId" UUID NOT NULL,
    "synonym" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_SKILL_SYNONYM" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpWorkJobTag" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "color" VARCHAR(7),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_OPWORK_JOB_TAG" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_AUTH_USER__SUPABASE_USER_ID" ON "AuthUser"("supabaseUserId");

-- CreateIndex
CREATE INDEX "IDX_AUTH_API_KEY__USER_ID" ON "AuthApiKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_AUTH_API_KEY__API_KEY" ON "AuthApiKey"("apiKey");

-- CreateIndex
CREATE INDEX "IDX_AUTH_SESSION__USER_ID" ON "AuthSession"("userId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROFILE__USER_ID" ON "OpWorkProfile"("userId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROFILE__TYPE" ON "OpWorkProfile"("type");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROFILE__USER_TYPE" ON "OpWorkProfile"("userType");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROFILE__IS_ACTIVE" ON "OpWorkProfile"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_PROFILE__USER_ID_TYPE" ON "OpWorkProfile"("userId", "type");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER__PROFILE_ID" ON "OpWorkJobSeeker"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER__IS_OPEN_TO_WORK" ON "OpWorkJobSeeker"("isOpenToWork");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_SEEKER__PROFILE_ID" ON "OpWorkJobSeeker"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EXPERIENCE__JOB_SEEKER_ID" ON "OpWorkExperience"("jobSeekerId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EXPERIENCE__COMPANY" ON "OpWorkExperience"("company");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EXPERIENCE__START_DATE" ON "OpWorkExperience"("startDate");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EDUCATION__JOB_SEEKER_ID" ON "OpWorkEducation"("jobSeekerId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EDUCATION__INSTITUTION" ON "OpWorkEducation"("institution");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EMPLOYER__PROFILE_ID" ON "OpWorkEmployer"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EMPLOYER__COMPANY_NAME" ON "OpWorkEmployer"("companyName");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_EMPLOYER__INDUSTRY" ON "OpWorkEmployer"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_EMPLOYER__PROFILE_ID" ON "OpWorkEmployer"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROJECT__PROFILE_ID" ON "OpWorkProject"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_PROJECT__TITLE" ON "OpWorkProject"("title");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_PROJECT__PROFILE_ID" ON "OpWorkProject"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__EMPLOYER_ID" ON "OpWorkJob"("employerId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__PROFILE_ID" ON "OpWorkJob"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__STATUS" ON "OpWorkJob"("status");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__EMPLOYMENT_TYPE" ON "OpWorkJob"("employmentType");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__EXPERIENCE_LEVEL" ON "OpWorkJob"("experienceLevel");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__LOCATION" ON "OpWorkJob"("location");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__IS_REMOTE" ON "OpWorkJob"("isRemote");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB__CREATED_AT" ON "OpWorkJob"("createdAt");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_APPLICATION__JOB_SEEKER_ID" ON "OpWorkApplication"("jobSeekerId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_APPLICATION__PROFILE_ID" ON "OpWorkApplication"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_APPLICATION__JOB_ID" ON "OpWorkApplication"("jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_APPLICATION__STATUS" ON "OpWorkApplication"("status");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_APPLICATION__APPLIED_AT" ON "OpWorkApplication"("appliedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_APPLICATION__JOB_SEEKER_ID_JOB_ID" ON "OpWorkApplication"("jobSeekerId", "jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SAVED_JOB__PROFILE_ID" ON "OpWorkSavedJob"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SAVED_JOB__JOB_ID" ON "OpWorkSavedJob"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_SAVED_JOB__PROFILE_ID_JOB_ID" ON "OpWorkSavedJob"("profileId", "jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL__TYPE" ON "OpWorkSkill"("type");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL__CATEGORY" ON "OpWorkSkill"("category");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL__POPULARITY" ON "OpWorkSkill"("popularity");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_SKILL__NAME" ON "OpWorkSkill"("name");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER_SKILL__JOB_SEEKER_ID" ON "OpWorkJobSeekerSkill"("jobSeekerId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER_SKILL__SKILL_ID" ON "OpWorkJobSeekerSkill"("skillId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER_SKILL__LEVEL" ON "OpWorkJobSeekerSkill"("level");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_SEEKER_SKILL__JOB_SEEKER_ID_SKILL_ID" ON "OpWorkJobSeekerSkill"("jobSeekerId", "skillId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SKILL__JOB_ID" ON "OpWorkJobSkill"("jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SKILL__SKILL_ID" ON "OpWorkJobSkill"("skillId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SKILL__IS_REQUIRED" ON "OpWorkJobSkill"("isRequired");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_SKILL__JOB_ID_SKILL_ID" ON "OpWorkJobSkill"("jobId", "skillId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_NOTIFICATION__USER_ID" ON "OpWorkNotification"("userId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_NOTIFICATION__PROFILE_ID" ON "OpWorkNotification"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_NOTIFICATION__TYPE" ON "OpWorkNotification"("type");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_NOTIFICATION__IS_READ" ON "OpWorkNotification"("isRead");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_NOTIFICATION__CREATED_AT" ON "OpWorkNotification"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_NOTIFICATION_SETTINGS__PROFILE_ID" ON "OpWorkNotificationSettings"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SEARCH_HISTORY__PROFILE_ID" ON "OpWorkSearchHistory"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SEARCH_HISTORY__SEARCHED_AT" ON "OpWorkSearchHistory"("searchedAt");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_VIEW__PROFILE_ID" ON "OpWorkJobView"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_VIEW__JOB_ID" ON "OpWorkJobView"("jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_VIEW__VIEWED_AT" ON "OpWorkJobView"("viewedAt");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SAVED_SEARCH__PROFILE_ID" ON "OpWorkSavedSearch"("profileId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SAVED_SEARCH__IS_ACTIVE" ON "OpWorkSavedSearch"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_SAVED_SEARCH__PROFILE_ID_NAME" ON "OpWorkSavedSearch"("profileId", "name");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL_SYNONYM__SKILL_ID" ON "OpWorkSkillSynonym"("skillId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL_SYNONYM__SYNONYM" ON "OpWorkSkillSynonym"("synonym");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_SKILL_SYNONYM__SKILL_ID_SYNONYM" ON "OpWorkSkillSynonym"("skillId", "synonym");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_TAG__JOB_ID" ON "OpWorkJobTag"("jobId");

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_TAG__NAME" ON "OpWorkJobTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_TAG__JOB_ID_NAME" ON "OpWorkJobTag"("jobId", "name");

-- AddForeignKey
ALTER TABLE "AuthApiKey" ADD CONSTRAINT "FK_AUTH_API_KEY__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "FK_AUTH_SESSION__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkProfile" ADD CONSTRAINT "FK_OPWORK_PROFILE__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSeeker" ADD CONSTRAINT "FK_OPWORK_JOB_SEEKER__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkExperience" ADD CONSTRAINT "FK_OPWORK_EXPERIENCE__JOB_SEEKER_ID" FOREIGN KEY ("jobSeekerId") REFERENCES "OpWorkJobSeeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkEducation" ADD CONSTRAINT "FK_OPWORK_EDUCATION__JOB_SEEKER_ID" FOREIGN KEY ("jobSeekerId") REFERENCES "OpWorkJobSeeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkEmployer" ADD CONSTRAINT "FK_OPWORK_EMPLOYER__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkProject" ADD CONSTRAINT "FK_OPWORK_PROJECT__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJob" ADD CONSTRAINT "FK_OPWORK_JOB__EMPLOYER_ID" FOREIGN KEY ("employerId") REFERENCES "OpWorkEmployer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJob" ADD CONSTRAINT "FK_OPWORK_JOB__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkApplication" ADD CONSTRAINT "FK_OPWORK_APPLICATION__JOB_SEEKER_ID" FOREIGN KEY ("jobSeekerId") REFERENCES "OpWorkJobSeeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkApplication" ADD CONSTRAINT "FK_OPWORK_APPLICATION__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkApplication" ADD CONSTRAINT "FK_OPWORK_APPLICATION__JOB_ID" FOREIGN KEY ("jobId") REFERENCES "OpWorkJob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkSavedJob" ADD CONSTRAINT "FK_OPWORK_SAVED_JOB__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkSavedJob" ADD CONSTRAINT "FK_OPWORK_SAVED_JOB__JOB_ID" FOREIGN KEY ("jobId") REFERENCES "OpWorkJob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSeekerSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SEEKER_SKILL__JOB_SEEKER_ID" FOREIGN KEY ("jobSeekerId") REFERENCES "OpWorkJobSeeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSeekerSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SEEKER_SKILL__SKILL_ID" FOREIGN KEY ("skillId") REFERENCES "OpWorkSkill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SKILL__JOB_ID" FOREIGN KEY ("jobId") REFERENCES "OpWorkJob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SKILL__SKILL_ID" FOREIGN KEY ("skillId") REFERENCES "OpWorkSkill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkNotification" ADD CONSTRAINT "FK_OPWORK_NOTIFICATION__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkNotification" ADD CONSTRAINT "FK_OPWORK_NOTIFICATION__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkNotificationSettings" ADD CONSTRAINT "FK_OPWORK_NOTIFICATION_SETTINGS__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkSearchHistory" ADD CONSTRAINT "FK_OPWORK_SEARCH_HISTORY__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobView" ADD CONSTRAINT "FK_OPWORK_JOB_VIEW__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobView" ADD CONSTRAINT "FK_OPWORK_JOB_VIEW__JOB_ID" FOREIGN KEY ("jobId") REFERENCES "OpWorkJob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkSavedSearch" ADD CONSTRAINT "FK_OPWORK_SAVED_SEARCH__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkSkillSynonym" ADD CONSTRAINT "FK_OPWORK_SKILL_SYNONYM__SKILL_ID" FOREIGN KEY ("skillId") REFERENCES "OpWorkSkill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobTag" ADD CONSTRAINT "FK_OPWORK_JOB_TAG__JOB_ID" FOREIGN KEY ("jobId") REFERENCES "OpWorkJob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
