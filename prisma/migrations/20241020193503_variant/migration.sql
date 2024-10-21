/*
  Warnings:

  - You are about to drop the column `variantId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `image` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "variantId";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "productId",
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ProductVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVariant_AB_unique" ON "_ProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVariant_B_index" ON "_ProductVariant"("B");

-- AddForeignKey
ALTER TABLE "_ProductVariant" ADD CONSTRAINT "_ProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariant" ADD CONSTRAINT "_ProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
