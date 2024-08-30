-- CreateTable
CREATE TABLE "measurement" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_type" TEXT NOT NULL,
    "confirmed_value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_pkey" PRIMARY KEY ("id")
);
