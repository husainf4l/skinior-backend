/*
  Warnings:

  - You are about to drop the column `categoryHandle` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryHandle_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryHandle",
ADD COLUMN     "categoryHandle2" TEXT NOT NULL DEFAULT 'hair-care';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryHandle2_fkey" FOREIGN KEY ("categoryHandle2") REFERENCES "Category"("handle") ON DELETE RESTRICT ON UPDATE CASCADE;
