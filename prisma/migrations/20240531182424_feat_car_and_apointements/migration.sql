/*
  Warnings:

  - Added the required column `message` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeNumber` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "tel" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "placeNumber" INTEGER NOT NULL;
