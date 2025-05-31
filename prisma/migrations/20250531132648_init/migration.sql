/*
  Warnings:

  - You are about to drop the column `idProducto` on the `producto_cantidad` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "producto_cantidad" DROP CONSTRAINT "producto_cantidad_idProducto_fkey";

-- AlterTable
ALTER TABLE "descuento" ALTER COLUMN "fechaInicio" SET DATA TYPE TEXT,
ALTER COLUMN "fechaCierre" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orden_compra" ALTER COLUMN "fecha" DROP DEFAULT,
ALTER COLUMN "fecha" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "producto_cantidad" DROP COLUMN "idProducto";
