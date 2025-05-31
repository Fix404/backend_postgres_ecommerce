import { Request, Response } from "express"
import prisma from '../models/modelo'



export const createDireccion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { calle, altura, idLocalidad } = req.body;

        if (!calle || !altura || !idLocalidad) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        const localidadExistente = await prisma.localidad.findUnique({
            where: { id: idLocalidad },
        });

        if (!localidadExistente) {
            res.status(404).json({ error: 'La localidad no existe en la BD' });
            return;
        }

        const nuevaDireccion = await prisma.direccion.create({
            data: {
                calle,
                altura,
                idLocalidad,
            },
            include: {
                localidad: true,
            },
        });

        res.status(201).json(nuevaDireccion);
    } catch (error) {
        console.error('Error al crear la direccion:', error);
        res.status(500).json({ error: 'Error al crear la direccion' });
    }
};

export const getAllDirecciones = async (req: Request, res: Response): Promise<void> => {

    try {
        const direcciones = await prisma.direccion.findMany({
            include: {
                localidad: true, 
            },
        })
        res.status(200).json(direcciones)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las direcciones')
    }

}

export const getDireccionById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const direccion = await prisma.direccion.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!direccion) {
            res.status(404).json({ mensaje: "No se encontró la direccion" });
            return;
        }

        res.status(200).json(direccion)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la direccion')
    }

}

export const deleteDireccionById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const direccion = await prisma.direccion.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La direccion ${direccion.calle}, ${direccion.altura} fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la direccion')
    }

}

export const updateDireccion = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { calle, altura, idLocalidad } = req.body;

    try {
        const updatedDireccion = await prisma.direccion.update({
            where: { id },
            data: {
                calle,
                altura,
                idLocalidad
            },
        });

        res.status(200).json({ message: "Direccion actualizada", direccion: updatedDireccion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la direccion" });
    }
};