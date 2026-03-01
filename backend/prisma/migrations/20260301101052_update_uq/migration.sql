/*
  Warnings:

  - A unique constraint covering the columns `[profileId,jobSeekerId,jobId]` on the table `OpWorkApplication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,jobSeekerId,skillId]` on the table `OpWorkJobSeekerSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,jobId,skillId]` on the table `OpWorkJobSkill` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UQ_OPWORK_APPLICATION__JOB_SEEKER_ID_JOB_ID";

-- DropIndex
DROP INDEX "UQ_OPWORK_JOB_SEEKER_SKILL__JOB_SEEKER_ID_SKILL_ID";

-- DropIndex
DROP INDEX "UQ_OPWORK_JOB_SKILL__JOB_ID_SKILL_ID";

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_APPLICATION__JOB_SEEKER_ID_JOB_ID" ON "OpWorkApplication"("profileId", "jobSeekerId", "jobId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_SEEKER_SKILL__JOB_SEEKER_ID_SKILL_ID" ON "OpWorkJobSeekerSkill"("profileId", "jobSeekerId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_OPWORK_JOB_SKILL__JOB_ID_SKILL_ID" ON "OpWorkJobSkill"("profileId", "jobId", "skillId");
