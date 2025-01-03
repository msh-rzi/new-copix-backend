/*
  Warnings:

  - The `fully_diluted_valuation` column on the `Cryptocurrency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total_supply` column on the `Cryptocurrency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `max_supply` column on the `Cryptocurrency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Cryptocurrency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ath` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ath_change_percentage` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ath_date` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atl` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atl_change_percentage` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atl_date` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `current_price` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `market_cap` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `market_cap_rank` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `total_volume` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `high_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `low_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price_change_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price_change_percentage_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `market_cap_change_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `market_cap_change_percentage_24h` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `circulating_supply` on the `Cryptocurrency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cryptocurrency" ADD COLUMN     "ath" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ath_change_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ath_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "atl" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "atl_change_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "atl_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "last_updated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "roi" JSONB,
DROP COLUMN "current_price",
ADD COLUMN     "current_price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "market_cap",
ADD COLUMN     "market_cap" DOUBLE PRECISION NOT NULL,
DROP COLUMN "market_cap_rank",
ADD COLUMN     "market_cap_rank" INTEGER NOT NULL,
DROP COLUMN "fully_diluted_valuation",
ADD COLUMN     "fully_diluted_valuation" DOUBLE PRECISION,
DROP COLUMN "total_volume",
ADD COLUMN     "total_volume" DOUBLE PRECISION NOT NULL,
DROP COLUMN "high_24h",
ADD COLUMN     "high_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "low_24h",
ADD COLUMN     "low_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "price_change_24h",
ADD COLUMN     "price_change_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "price_change_percentage_24h",
ADD COLUMN     "price_change_percentage_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "market_cap_change_24h",
ADD COLUMN     "market_cap_change_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "market_cap_change_percentage_24h",
ADD COLUMN     "market_cap_change_percentage_24h" DOUBLE PRECISION NOT NULL,
DROP COLUMN "circulating_supply",
ADD COLUMN     "circulating_supply" DOUBLE PRECISION NOT NULL,
DROP COLUMN "total_supply",
ADD COLUMN     "total_supply" DOUBLE PRECISION,
DROP COLUMN "max_supply",
ADD COLUMN     "max_supply" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_id_key" ON "Cryptocurrency"("id");
