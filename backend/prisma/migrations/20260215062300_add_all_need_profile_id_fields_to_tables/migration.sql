/*
  Warnings:

  - You are about to drop the column `userId` on the `OpWorkNotification` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `OpWorkEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OpWorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OpWorkJobSeekerSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OpWorkJobSkill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpWorkNotification" DROP CONSTRAINT "FK_OPWORK_NOTIFICATION__USER_ID";

-- DropIndex
DROP INDEX "IDX_OPWORK_NOTIFICATION__USER_ID";

-- AlterTable
ALTER TABLE "OpWorkEducation" ADD COLUMN     "profileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OpWorkExperience" ADD COLUMN     "profileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OpWorkJobSeekerSkill" ADD COLUMN     "profileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OpWorkJobSkill" ADD COLUMN     "profileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OpWorkNotification" DROP COLUMN "userId",
ADD COLUMN     "authUserId" UUID;

-- AddForeignKey
ALTER TABLE "OpWorkExperience" ADD CONSTRAINT "FK_OPWORK_EXPERIENCE__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkEducation" ADD CONSTRAINT "FK_OPWORK_EDUCATION__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSeekerSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SEEKER_SKILL__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkJobSkill" ADD CONSTRAINT "FK_OPWORK_JOB_SKILL__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OpWorkNotification" ADD CONSTRAINT "OpWorkNotification_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "AuthUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
