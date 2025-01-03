/*
  Warnings:

  - You are about to drop the `Coin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoricalData" DROP CONSTRAINT "HistoricalData_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_coinId_fkey";

-- DropTable
DROP TABLE "Coin";

-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assets_id_key" ON "Assets"("id");

-- AddForeignKey
ALTER TABLE "HistoricalData" ADD CONSTRAINT "HistoricalData_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
