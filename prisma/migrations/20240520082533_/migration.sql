-- CreateEnum
CREATE TYPE "ApointementStatus" AS ENUM ('PENDING', 'ARCHIVED', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN DEFAULT true,
    "fav" BOOLEAN DEFAULT false,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apointement" (
    "id" TEXT NOT NULL,
    "status" "ApointementStatus" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT NOT NULL,

    CONSTRAINT "Apointement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apointement" ADD CONSTRAINT "Apointement_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
