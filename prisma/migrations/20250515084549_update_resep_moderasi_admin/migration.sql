-- AlterTable
ALTER TABLE "Resep" ADD COLUMN     "disetujui" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disetujuiOleh" INTEGER,
ADD COLUMN     "tanggalAcc" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Resep" ADD CONSTRAINT "Resep_disetujuiOleh_fkey" FOREIGN KEY ("disetujuiOleh") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
