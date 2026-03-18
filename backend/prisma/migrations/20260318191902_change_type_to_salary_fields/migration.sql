/*
  Warnings:

  - The `level` column on the `OpWorkJobSeekerSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `importance` column on the `OpWorkJobSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minLevel` column on the `OpWorkJobSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OpWorkSkillLevel" AS ENUM ('BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "OpWorkSkillImportance" AS ENUM ('LOW', 'BELOW_MEDIUM', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "OpWorkJob" ALTER COLUMN "salaryMin" SET DATA TYPE REAL,
ALTER COLUMN "salaryMax" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "OpWorkJobSeeker" ALTER COLUMN "expectedSalary" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "OpWorkJobSeekerSkill" DROP COLUMN "level",
ADD COLUMN     "level" "OpWorkSkillLevel";

-- AlterTable
ALTER TABLE "OpWorkJobSkill" DROP COLUMN "importance",
ADD COLUMN     "importance" "OpWorkSkillImportance",
DROP COLUMN "minLevel",
ADD COLUMN     "minLevel" "OpWorkSkillLevel";

-- CreateIndex
CREATE INDEX "IDX_OPWORK_JOB_SEEKER_SKILL__LEVEL" ON "OpWorkJobSeekerSkill"("level");
