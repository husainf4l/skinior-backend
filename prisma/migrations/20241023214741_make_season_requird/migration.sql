/*
  Warnings:

  - You are about to drop the column `totalQuantity` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "totalQuantity";

-- AlterTable
ALTER TABLE "ShoppingCart" ADD COLUMN     "totalQuantity" INTEGER NOT NULL DEFAULT 0;
