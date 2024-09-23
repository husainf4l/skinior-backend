-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "variantId" INTEGER;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
