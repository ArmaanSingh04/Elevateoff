-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "lastBumped" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
