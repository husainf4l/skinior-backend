/*
  Warnings:

  - You are about to drop the column `compareAtPrice` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'SEEN';

-- DropIndex
DROP INDEX "Variant_sku_key";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "compareAtPrice",
DROP COLUMN "price",
DROP COLUMN "sku",
DROP COLUMN "stock";
