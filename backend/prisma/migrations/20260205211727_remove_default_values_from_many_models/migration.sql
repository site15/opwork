-- AlterTable
ALTER TABLE "OpWorkApplication" ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "appliedAt" DROP NOT NULL,
ALTER COLUMN "appliedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkEducation" ALTER COLUMN "isCurrent" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkExperience" ALTER COLUMN "isCurrent" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkJob" ALTER COLUMN "salaryCurrency" DROP DEFAULT,
ALTER COLUMN "isRemote" DROP DEFAULT,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "viewsCount" DROP DEFAULT,
ALTER COLUMN "applicationsCount" DROP DEFAULT,
ALTER COLUMN "savesCount" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkJobSeeker" ALTER COLUMN "salaryCurrency" DROP DEFAULT,
ALTER COLUMN "isOpenToWork" DROP DEFAULT,
ALTER COLUMN "isOpenToRemote" DROP DEFAULT,
ALTER COLUMN "isOpenToRelocation" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkJobSeekerSkill" ALTER COLUMN "level" DROP DEFAULT,
ALTER COLUMN "isPrimary" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkJobSkill" ALTER COLUMN "isRequired" DROP DEFAULT,
ALTER COLUMN "importance" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkNotification" ALTER COLUMN "isRead" DROP DEFAULT,
ALTER COLUMN "isArchived" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkNotificationSettings" ALTER COLUMN "emailApplicationUpdates" DROP DEFAULT,
ALTER COLUMN "emailJobAlerts" DROP DEFAULT,
ALTER COLUMN "emailNewsletter" DROP DEFAULT,
ALTER COLUMN "pushApplicationUpdates" DROP DEFAULT,
ALTER COLUMN "pushJobAlerts" DROP DEFAULT,
ALTER COLUMN "jobAlertFrequency" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkProfile" ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "isEmailVerified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkSavedSearch" ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "frequency" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkSearchHistory" ALTER COLUMN "resultsCount" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpWorkSkill" ALTER COLUMN "popularity" DROP DEFAULT;
