-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "metaTitle" TEXT,
ALTER COLUMN "metaDescription" DROP NOT NULL,
ALTER COLUMN "metaDescription" DROP DEFAULT;
