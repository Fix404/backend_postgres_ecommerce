/*
  Warnings:

  - You are about to alter the column `dni` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "dni" SET DATA TYPE INTEGER;
