-- CreateTable
CREATE TABLE "HistoricalChartData" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total_volumes" DOUBLE PRECISION NOT NULL,
    "market_caps" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistoricalChartData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoricalChartData_coinId_timestamp_idx" ON "HistoricalChartData"("coinId", "timestamp");

-- AddForeignKey
ALTER TABLE "HistoricalChartData" ADD CONSTRAINT "HistoricalChartData_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
