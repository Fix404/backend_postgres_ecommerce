import { Request, Response } from "express"
import prisma from '../models/modelo'


export const createTalle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { talle } = req.body;

        if (!talle) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevoTalle = await prisma.talle.create({
            data: {
                talle
            },
        });

        res.status(201).json(nuevoTalle);
    } catch (error) {
        console.error('Error al crear el talle:', error);
        res.status(500).json({ error: 'Error al crear el talle' });
    }
};

export const getAllTalles = async (req: Request, res: Response): Promise<void> => {

    try {
        const talles = await prisma.talle.findMany()
        res.status(200).json(talles)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los talles')
    }

}

export const getTalleById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const talle = await prisma.talle.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!talle) {
            res.status(404).json({ mensaje: "No se encontró el talle" });
            return;
        }

        res.status(200).json(talle)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el talle')
    }

}

export const deleteTalleById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const talle = await prisma.talle.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El talle ${talle.talle} fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el talle')
    }
}

export const updateTalle = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { talle } = req.body;

    try {
        const updatedtalle = await prisma.talle.update({
            where: { id },
            data: {
                talle
            },
        });

        res.status(200).json({ message: "El talle fue actualizado", talle: updatedtalle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el talle" });
    }
};
