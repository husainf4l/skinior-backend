-- CreateTable
CREATE TABLE "companyPointsTransactions" (
    "id" TEXT NOT NULL,
    "invRef" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "posName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "companyPointsTransactions_pkey" PRIMARY KEY ("id")
);
