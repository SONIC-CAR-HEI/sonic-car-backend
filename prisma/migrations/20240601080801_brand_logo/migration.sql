/*
  Warnings:

  - Added the required column `logoUrl` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "logoUrl" TEXT NOT NULL;
