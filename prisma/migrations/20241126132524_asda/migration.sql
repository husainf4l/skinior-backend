/*
  Warnings:

  - You are about to drop the column `sales` on the `companyPointsTransactions` table. All the data in the column will be lost.
  - Added the required column `lavaSales` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `margoSales` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `papayaSales` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSales` to the `companyPointsTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyPointsTransactions" DROP COLUMN "sales",
ADD COLUMN     "lavaSales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "margoSales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "papayaSales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalSales" DOUBLE PRECISION NOT NULL;
