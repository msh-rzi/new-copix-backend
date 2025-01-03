/*
  Warnings:

  - You are about to drop the `Assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricalChartData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricalData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Indicator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoricalChartData" DROP CONSTRAINT "HistoricalChartData_coinId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricalData" DROP CONSTRAINT "HistoricalData_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_coinId_fkey";

-- DropTable
DROP TABLE "Assets";

-- DropTable
DROP TABLE "HistoricalChartData";

-- DropTable
DROP TABLE "HistoricalData";

-- DropTable
DROP TABLE "Indicator";

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "market_cap_rank" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinPrice" (
    "id" SERIAL NOT NULL,
    "coin_id" TEXT NOT NULL,
    "price_usd" DECIMAL(65,30) NOT NULL,
    "volume_24h" DECIMAL(65,30),
    "market_cap" DECIMAL(65,30),
    "change_24h" DECIMAL(65,30),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalPrice" (
    "id" SERIAL NOT NULL,
    "coin_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "low" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "volume" DECIMAL(65,30),
    "market_cap" DECIMAL(65,30),

    CONSTRAINT "HistoricalPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_id_key" ON "Coin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_symbol_key" ON "Coin"("symbol");

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_coin_id_fkey" FOREIGN KEY ("coin_id") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalPrice" ADD CONSTRAINT "HistoricalPrice_coin_id_fkey" FOREIGN KEY ("coin_id") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
