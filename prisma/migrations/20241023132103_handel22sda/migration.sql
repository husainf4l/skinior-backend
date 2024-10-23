-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_shoppingCartId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "shoppingCartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
