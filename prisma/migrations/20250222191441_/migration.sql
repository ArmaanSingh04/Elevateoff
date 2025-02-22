/*
  Warnings:

  - You are about to drop the column `contributeable` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "contributeable",
ADD COLUMN     "contributable" BOOLEAN NOT NULL DEFAULT false;
