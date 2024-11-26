/*
  Warnings:

  - You are about to alter the column `points` on the `companyPointsTransactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `sales` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyPointsTransactions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "points" SET DATA TYPE INTEGER;
