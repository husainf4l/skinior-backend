-- CreateTable
CREATE TABLE "AuthorizedPointOfSale" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationlink" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "phone" TEXT,
    "category" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT NOT NULL,
    "altLogo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthorizedPointOfSale_pkey" PRIMARY KEY ("id")
);
