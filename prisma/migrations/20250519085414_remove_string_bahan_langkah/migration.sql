/*
  Warnings:

  - You are about to drop the column `bahan` on the `Resep` table. All the data in the column will be lost.
  - You are about to drop the column `disetujui` on the `Resep` table. All the data in the column will be lost.
  - You are about to drop the column `langkahPembuatan` on the `Resep` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Resep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resep" DROP COLUMN "bahan",
DROP COLUMN "disetujui",
DROP COLUMN "langkahPembuatan",
DROP COLUMN "thumbnail",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photoResep" TEXT;
