/*
  Warnings:

  - A unique constraint covering the columns `[profileId,name]` on the table `OpWorkSkill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OpWorkSkill" ADD COLUMN     "profileId" UUID;

-- CreateIndex
CREATE INDEX "IDX_OPWORK_SKILL__PROFILE_ID" ON "OpWorkSkill"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_SKILL__PROFILE_ID_NAME" ON "OpWorkSkill"("profileId", "name");

-- AddForeignKey
ALTER TABLE "OpWorkSkill" ADD CONSTRAINT "FK_OPWORK_SAVED_JOB__PROFILE_ID" FOREIGN KEY ("profileId") REFERENCES "OpWorkProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
