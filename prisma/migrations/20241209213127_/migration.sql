/*
  Warnings:

  - Made the column `fully_diluted_valuation` on table `Cryptocurrency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_supply` on table `Cryptocurrency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_supply` on table `Cryptocurrency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roi` on table `Cryptocurrency` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `telegramId` on the `UserTelegram` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cryptocurrency" ALTER COLUMN "fully_diluted_valuation" SET NOT NULL,
ALTER COLUMN "total_supply" SET NOT NULL,
ALTER COLUMN "max_supply" SET NOT NULL,
ALTER COLUMN "roi" SET NOT NULL,
ALTER COLUMN "roi" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserTelegram" DROP COLUMN "telegramId",
ADD COLUMN     "telegramId" BIGINT NOT NULL;
