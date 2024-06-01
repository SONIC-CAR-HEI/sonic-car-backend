/*
  Warnings:

  - You are about to drop the column `brand` on the `Car` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
ADD COLUMN     "brandId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
