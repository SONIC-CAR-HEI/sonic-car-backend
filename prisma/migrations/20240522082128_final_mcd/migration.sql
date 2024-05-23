/*
  Warnings:

  - You are about to drop the `Apointement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `engineType` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('DIESEL', 'HYBRID', 'ELECTRIC', 'GASOLINE');

-- CreateEnum
CREATE TYPE "AppointementStatus" AS ENUM ('PENDING', 'ARCHIVED', 'REJECTED', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "Apointement" DROP CONSTRAINT "Apointement_carId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "engineType" "EngineType" NOT NULL;

-- DropTable
DROP TABLE "Apointement";

-- DropEnum
DROP TYPE "ApointementStatus";

-- CreateTable
CREATE TABLE "Appointement" (
    "id" TEXT NOT NULL,
    "status" "AppointementStatus" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT NOT NULL,
    "adminId" TEXT,

    CONSTRAINT "Appointement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointement" ADD CONSTRAINT "Appointement_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointement" ADD CONSTRAINT "Appointement_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
