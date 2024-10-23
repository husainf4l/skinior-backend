-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "_OrderCartItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderCartItems_AB_unique" ON "_OrderCartItems"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderCartItems_B_index" ON "_OrderCartItems"("B");

-- AddForeignKey
ALTER TABLE "_OrderCartItems" ADD CONSTRAINT "_OrderCartItems_A_fkey" FOREIGN KEY ("A") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderCartItems" ADD CONSTRAINT "_OrderCartItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
