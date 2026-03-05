/*
  Warnings:

  - You are about to drop the column `description` on the `OpWorkProfile` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `OpWorkProfile` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `OpWorkProfile` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `OpWorkProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "IDX_OPWORK_PROFILE__IS_ACTIVE";

-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "isEmailVerified" BOOLEAN;

-- AlterTable
ALTER TABLE "OpWorkProfile" DROP COLUMN "description",
DROP COLUMN "isActive",
DROP COLUMN "isEmailVerified",
DROP COLUMN "title";
