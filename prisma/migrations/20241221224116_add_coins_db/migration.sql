/*
  Warnings:

  - You are about to drop the `Cryptocurrency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cryptocurrency";

-- CreateTable
CREATE TABLE "Coins" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Coins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coins_id_key" ON "Coins"("id");
