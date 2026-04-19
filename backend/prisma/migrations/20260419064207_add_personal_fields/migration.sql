-- CreateEnum
CREATE TYPE "OpWorkJobSeekerGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "OpWorkJobSeeker" ADD COLUMN     "birthDate" DATE,
ADD COLUMN     "firstName" VARCHAR(100),
ADD COLUMN     "gender" "OpWorkJobSeekerGender",
ADD COLUMN     "lastName" VARCHAR(100),
ADD COLUMN     "middleName" VARCHAR(100);
