/*
  Warnings:

  - Added the required column `profileId` to the `OpWorkJobTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OpWorkJobTag" ADD COLUMN     "profileId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "OpWorkJobTag" ADD CONSTRAINT "FK_OPWORK_JOB_TAG__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
