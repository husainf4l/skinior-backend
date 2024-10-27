/*
  Warnings:

  - Made the column `handle` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "handle" SET NOT NULL;
