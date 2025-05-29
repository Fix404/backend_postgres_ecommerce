-- CreateTable
CREATE TABLE "Localidad" (
    "id" SERIAL NOT NULL,
    "localidad" TEXT NOT NULL,
    "codigoPostal" INTEGER NOT NULL,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "altura" INTEGER NOT NULL,
    "localidadId" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_localidadId_fkey" FOREIGN KEY ("localidadId") REFERENCES "Localidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
