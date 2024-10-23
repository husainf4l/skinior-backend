/*
  Warnings:

  - A unique constraint covering the columns `[sessionsId]` on the table `ShoppingCart` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sessionsId` on table `ShoppingCart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ShoppingCart" ALTER COLUMN "sessionsId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_sessionsId_key" ON "ShoppingCart"("sessionsId");
