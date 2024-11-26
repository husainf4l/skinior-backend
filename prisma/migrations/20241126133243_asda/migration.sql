/*
  Warnings:

  - Added the required column `transactionId` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyPointsTransactions" ADD COLUMN     "transactionId" TEXT NOT NULL;
