/*
  Warnings:

  - You are about to drop the column `seasonId` on the `ShoppingCart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShoppingCart" DROP COLUMN "seasonId",
ADD COLUMN     "sessionsId" TEXT;
