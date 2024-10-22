/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `variantId` on the `CartItem` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `variantId` on the `OrderItem` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RelatedProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WishlistProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductTags" DROP CONSTRAINT "_ProductTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductTags" DROP CONSTRAINT "_ProductTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariant" DROP CONSTRAINT "_ProductVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariant" DROP CONSTRAINT "_ProductVariant_B_fkey";

-- DropForeignKey
ALTER TABLE "_RelatedProducts" DROP CONSTRAINT "_RelatedProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_RelatedProducts" DROP CONSTRAINT "_RelatedProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "_WishlistProducts" DROP CONSTRAINT "_WishlistProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_WishlistProducts" DROP CONSTRAINT "_WishlistProducts_B_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cart_id_seq";

-- AlterTable
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_pkey",
DROP COLUMN "variantId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "cartId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CartItem_id_seq";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "description",
DROP COLUMN "images",
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "variantId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "quantity" SET DEFAULT 1,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OrderItem_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "brand",
DROP COLUMN "description",
DROP COLUMN "isFeatured",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "discountedPrice" DOUBLE PRECISION,
ADD COLUMN     "inStock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "parentProductId" TEXT,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Variant";

-- DropTable
DROP TABLE "Wishlist";

-- DropTable
DROP TABLE "_ProductTags";

-- DropTable
DROP TABLE "_ProductVariant";

-- DropTable
DROP TABLE "_RelatedProducts";

-- DropTable
DROP TABLE "_WishlistProducts";

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parentProductId_fkey" FOREIGN KEY ("parentProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
