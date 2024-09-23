/*
  Warnings:

  - You are about to drop the `ProductAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelatedProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantAttribute` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_relatedProductId_fkey";

-- DropForeignKey
ALTER TABLE "VariantAttribute" DROP CONSTRAINT "VariantAttribute_variantId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "ProductAttribute";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "RelatedProducts";

-- DropTable
DROP TABLE "VariantAttribute";

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatedProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedProducts_AB_unique" ON "_RelatedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedProducts_B_index" ON "_RelatedProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategories_AB_unique" ON "_ProductCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "_ProductCategories"("B");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
