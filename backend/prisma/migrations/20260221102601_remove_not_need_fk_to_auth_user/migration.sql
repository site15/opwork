/*
  Warnings:

  - You are about to drop the column `authUserId` on the `OpWorkNotification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpWorkNotification" DROP CONSTRAINT "OpWorkNotification_authUserId_fkey";

-- AlterTable
ALTER TABLE "OpWorkNotification" DROP COLUMN "authUserId";
