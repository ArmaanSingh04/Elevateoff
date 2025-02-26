/*
  Warnings:

  - You are about to drop the column `link` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "link",
ADD COLUMN     "contrubutionLink" TEXT,
ADD COLUMN     "projectLink" TEXT NOT NULL DEFAULT '';
