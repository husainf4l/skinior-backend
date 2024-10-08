/*
  Warnings:

  - You are about to drop the column `shippingState` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingZipCode` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingState",
DROP COLUMN "shippingZipCode",
ALTER COLUMN "shippingCountry" SET DEFAULT 'Jordan';
