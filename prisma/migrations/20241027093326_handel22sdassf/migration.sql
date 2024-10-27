/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `PromotionCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `PromotionCategory` table. All the data in the column will be lost.
  - Added the required column `categoryHandle` to the `PromotionCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionCategory" DROP CONSTRAINT "PromotionCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
ADD COLUMN     "categoryHandle" TEXT;

-- AlterTable
ALTER TABLE "PromotionCategory" DROP CONSTRAINT "PromotionCategory_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryHandle" TEXT NOT NULL,
ADD CONSTRAINT "PromotionCategory_pkey" PRIMARY KEY ("categoryHandle", "promotionId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryHandle_fkey" FOREIGN KEY ("categoryHandle") REFERENCES "Category"("handle") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCategory" ADD CONSTRAINT "PromotionCategory_categoryHandle_fkey" FOREIGN KEY ("categoryHandle") REFERENCES "Category"("handle") ON DELETE RESTRICT ON UPDATE CASCADE;
