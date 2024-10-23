/*
  Warnings:

  - The values [SEEN,PROCESSING,SHIPPED,DELIVERED] on the enum `OrderStatusenm` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_OrderCartItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatusenm_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatusenm_new" USING ("status"::text::"OrderStatusenm_new");
ALTER TYPE "OrderStatusenm" RENAME TO "OrderStatusenm_old";
ALTER TYPE "OrderStatusenm_new" RENAME TO "OrderStatusenm";
DROP TYPE "OrderStatusenm_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_OrderCartItems" DROP CONSTRAINT "_OrderCartItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderCartItems" DROP CONSTRAINT "_OrderCartItems_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" INTEGER,
ALTER COLUMN "status" DROP DEFAULT;

-- DropTable
DROP TABLE "_OrderCartItems";

-- CreateTable
CREATE TABLE "_CartItemToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartItemToOrder_AB_unique" ON "_CartItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_CartItemToOrder_B_index" ON "_CartItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToOrder" ADD CONSTRAINT "_CartItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToOrder" ADD CONSTRAINT "_CartItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
