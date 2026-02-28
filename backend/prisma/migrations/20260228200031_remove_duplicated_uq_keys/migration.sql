/*
  Warnings:

  - You are about to drop the column `opWorkProfileId` on the `OpWorkEmployer` table. All the data in the column will be lost.
  - You are about to drop the column `opWorkProfileId` on the `OpWorkJobSeeker` table. All the data in the column will be lost.
  - You are about to drop the column `opWorkProfileId` on the `OpWorkProject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpWorkEmployer" DROP CONSTRAINT "FK_OPWORK_EMPLOYER__PROFILE_ID";

-- DropForeignKey
ALTER TABLE "OpWorkJobSeeker" DROP CONSTRAINT "FK_OPWORK_JOB_SEEKER__PROFILE_ID";

-- DropForeignKey
ALTER TABLE "OpWorkProject" DROP CONSTRAINT "FK_OPWORK_PROJECT__PROFILE_ID";

-- AlterTable
ALTER TABLE "OpWorkEmployer" DROP COLUMN "opWorkProfileId";

-- AlterTable
ALTER TABLE "OpWorkJobSeeker" DROP COLUMN "opWorkProfileId";

-- AlterTable
ALTER TABLE "OpWorkProject" DROP COLUMN "opWorkProfileId";

-- AddForeignKey
ALTER TABLE "OpWorkJobSeeker" ADD CONSTRAINT "FK_OPWORK_JOB_SEEKER__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpWorkEmployer" ADD CONSTRAINT "FK_OPWORK_EMPLOYER__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpWorkProject" ADD CONSTRAINT "FK_OPWORK_PROJECT__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
