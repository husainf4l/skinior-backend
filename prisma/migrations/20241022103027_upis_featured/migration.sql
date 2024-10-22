/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "handle" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Product_handle_key" ON "Product"("handle");

