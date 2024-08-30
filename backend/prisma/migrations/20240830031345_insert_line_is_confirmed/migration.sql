/*
  Warnings:

  - You are about to drop the column `confirmed_value` on the `measurement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "measurement" DROP COLUMN "confirmed_value",
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;
