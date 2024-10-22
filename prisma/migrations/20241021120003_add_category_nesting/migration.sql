/*
  Warnings:

  - The primary key for the `Brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brandName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandId",
ADD COLUMN     "brandName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
