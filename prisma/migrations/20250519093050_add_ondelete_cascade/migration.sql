-- DropForeignKey
ALTER TABLE "Bahan" DROP CONSTRAINT "Bahan_resepId_fkey";

-- DropForeignKey
ALTER TABLE "LangkahPembuatan" DROP CONSTRAINT "LangkahPembuatan_resepId_fkey";

-- AddForeignKey
ALTER TABLE "Bahan" ADD CONSTRAINT "Bahan_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LangkahPembuatan" ADD CONSTRAINT "LangkahPembuatan_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
