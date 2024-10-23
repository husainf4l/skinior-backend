/*
  Warnings:

  - You are about to drop the column `itemId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `OrderLine` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `UserReview` table. All the data in the column will be lost.
  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariationOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `OrderLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `UserReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_optionId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserReview" DROP CONSTRAINT "UserReview_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_productId_fkey";

-- DropForeignKey
ALTER TABLE "VariationOption" DROP CONSTRAINT "VariationOption_variationId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "itemId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "variantId" INTEGER;

-- AlterTable
ALTER TABLE "OrderLine" DROP COLUMN "itemId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "variantId" INTEGER;

-- AlterTable
ALTER TABLE "UserReview" DROP COLUMN "itemId",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Configuration";

-- DropTable
DROP TABLE "ProductItem";

-- DropTable
DROP TABLE "Variation";

-- DropTable
DROP TABLE "VariationOption";

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
