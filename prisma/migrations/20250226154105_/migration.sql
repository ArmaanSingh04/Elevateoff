/*
  Warnings:

  - You are about to drop the column `contrubutionLink` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "contrubutionLink",
ADD COLUMN     "contributionLink" TEXT;
