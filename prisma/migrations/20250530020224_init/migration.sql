/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Descuento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Direccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Imagen` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoProducto" AS ENUM ('ROPA', 'CALZADO', 'ACCESORIO', 'OTRO');

-- CreateEnum
CREATE TYPE "SexoProducto" AS ENUM ('MASCULINO', 'FEMENINO', 'UNISEX');

-- CreateEnum
CREATE TYPE "MovimientoOrden" AS ENUM ('COMPRA', 'VENTA', 'DEVOLUCION', 'AJUSTE');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'VENDEDOR', 'CLIENTE');

-- DropForeignKey
ALTER TABLE "Direccion" DROP CONSTRAINT "Direccion_localidadId_fkey";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Descuento";

-- DropTable
DROP TABLE "Direccion";

-- DropTable
DROP TABLE "Imagen";

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descuento" (
    "id" SERIAL NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaCierre" TIMESTAMP(3) NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direccion" (
    "id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "altura" INTEGER NOT NULL,
    "provincia" TEXT NOT NULL,
    "idLocalidad" INTEGER NOT NULL,

    CONSTRAINT "direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_compra" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precioTotal" DOUBLE PRECISION NOT NULL,
    "movimiento" "MovimientoOrden" NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProductoCantidad" INTEGER NOT NULL,

    CONSTRAINT "orden_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precio" (
    "id" SERIAL NOT NULL,
    "precioCompra" DOUBLE PRECISION NOT NULL,
    "precioVenta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto_cantidad" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "idDetalle" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "producto_cantidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoProducto" NOT NULL,
    "sexo" "SexoProducto" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "idImagen" INTEGER,
    "idDescuento" INTEGER,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talle" (
    "id" SERIAL NOT NULL,
    "talle" TEXT NOT NULL,

    CONSTRAINT "talle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "idDireccion" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "idTalle" INTEGER NOT NULL,
    "idColor" INTEGER NOT NULL,
    "idPrecio" INTEGER NOT NULL,

    CONSTRAINT "detalle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "direccion" ADD CONSTRAINT "direccion_idLocalidad_fkey" FOREIGN KEY ("idLocalidad") REFERENCES "Localidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_idProductoCantidad_fkey" FOREIGN KEY ("idProductoCantidad") REFERENCES "producto_cantidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_cantidad" ADD CONSTRAINT "producto_cantidad_idDetalle_fkey" FOREIGN KEY ("idDetalle") REFERENCES "detalle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_cantidad" ADD CONSTRAINT "producto_cantidad_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_idImagen_fkey" FOREIGN KEY ("idImagen") REFERENCES "imagen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_idDescuento_fkey" FOREIGN KEY ("idDescuento") REFERENCES "descuento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idDireccion_fkey" FOREIGN KEY ("idDireccion") REFERENCES "direccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle" ADD CONSTRAINT "detalle_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle" ADD CONSTRAINT "detalle_idTalle_fkey" FOREIGN KEY ("idTalle") REFERENCES "talle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle" ADD CONSTRAINT "detalle_idColor_fkey" FOREIGN KEY ("idColor") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle" ADD CONSTRAINT "detalle_idPrecio_fkey" FOREIGN KEY ("idPrecio") REFERENCES "precio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
