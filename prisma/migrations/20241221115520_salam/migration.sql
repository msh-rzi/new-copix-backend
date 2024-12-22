/*
  Warnings:

  - You are about to drop the column `ath` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `ath_change_percentage` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `ath_date` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `atl` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `atl_change_percentage` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `atl_date` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `last_updated` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `roi` on the `Cryptocurrency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cryptocurrency" DROP COLUMN "ath",
DROP COLUMN "ath_change_percentage",
DROP COLUMN "ath_date",
DROP COLUMN "atl",
DROP COLUMN "atl_change_percentage",
DROP COLUMN "atl_date",
DROP COLUMN "last_updated",
DROP COLUMN "roi",
ALTER COLUMN "fully_diluted_valuation" DROP NOT NULL,
ALTER COLUMN "total_supply" DROP NOT NULL,
ALTER COLUMN "max_supply" DROP NOT NULL;
