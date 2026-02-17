/*
  Warnings:

  - You are about to alter the column `coverLetter` on the `OpWorkApplication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `statusNotes` on the `OpWorkApplication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `description` on the `OpWorkEducation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `description` on the `OpWorkEmployer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `mission` on the `OpWorkEmployer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `culture` on the `OpWorkEmployer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `description` on the `OpWorkExperience` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `description` on the `OpWorkJob` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `requirements` on the `OpWorkJob` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `responsibilities` on the `OpWorkJob` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `summary` on the `OpWorkJobSeeker` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000)`.
  - You are about to alter the column `preferredLocations` on the `OpWorkJobSeeker` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `message` on the `OpWorkNotification` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `description` on the `OpWorkProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `description` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6000)`.
  - You are about to alter the column `technologies` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `architecture` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `plannedDatesDescription` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `implementationDescription` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `launchDescription` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `completionDescription` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `maintenanceDescription` on the `OpWorkProject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `notes` on the `OpWorkSavedJob` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `description` on the `OpWorkSkill` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.

*/
-- AlterTable
ALTER TABLE "OpWorkApplication" ALTER COLUMN "coverLetter" SET DATA TYPE VARCHAR(6000),
ALTER COLUMN "statusNotes" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkEducation" ALTER COLUMN "description" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkEmployer" ALTER COLUMN "description" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "mission" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "culture" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkExperience" ALTER COLUMN "description" SET DATA TYPE VARCHAR(6000);

-- AlterTable
ALTER TABLE "OpWorkJob" ALTER COLUMN "description" SET DATA TYPE VARCHAR(6000),
ALTER COLUMN "requirements" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "responsibilities" SET DATA TYPE VARCHAR(6000);

-- AlterTable
ALTER TABLE "OpWorkJobSeeker" ALTER COLUMN "summary" SET DATA TYPE VARCHAR(10000),
ALTER COLUMN "preferredLocations" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "OpWorkNotification" ALTER COLUMN "message" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkProfile" ALTER COLUMN "description" SET DATA TYPE VARCHAR(6000);

-- AlterTable
ALTER TABLE "OpWorkProject" ALTER COLUMN "description" SET DATA TYPE VARCHAR(6000),
ALTER COLUMN "technologies" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "architecture" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "plannedDatesDescription" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "implementationDescription" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "launchDescription" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "completionDescription" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "maintenanceDescription" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkSavedJob" ALTER COLUMN "notes" SET DATA TYPE VARCHAR(4000);

-- AlterTable
ALTER TABLE "OpWorkSkill" ALTER COLUMN "description" SET DATA TYPE VARCHAR(4000);
