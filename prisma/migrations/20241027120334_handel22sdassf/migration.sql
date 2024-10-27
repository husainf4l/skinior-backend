/*
  Warnings:

  - You are about to drop the column `countryId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_countryId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "countryId",
DROP COLUMN "region",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropTable
DROP TABLE "Country";
