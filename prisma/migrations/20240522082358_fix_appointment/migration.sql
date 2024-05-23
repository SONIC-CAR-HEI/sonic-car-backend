/*
  Warnings:

  - You are about to drop the `Appointement` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'ARCHIVED', 'REJECTED', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "Appointement" DROP CONSTRAINT "Appointement_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Appointement" DROP CONSTRAINT "Appointement_carId_fkey";

-- DropTable
DROP TABLE "Appointement";

-- DropEnum
DROP TYPE "AppointementStatus";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT NOT NULL,
    "adminId" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
