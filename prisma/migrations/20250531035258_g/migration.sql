/*
  Warnings:

  - Changed the type of `estado` on the `detalle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('DISPONIBLE', 'NO_DISPONIBLE');

-- AlterTable
ALTER TABLE "detalle" DROP COLUMN "estado",
ADD COLUMN     "estado" "Estado" NOT NULL;
