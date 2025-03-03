/*
  Warnings:

  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT;
