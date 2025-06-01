import { Request, Response } from "express"
import prisma from '../models/modelo'
import { Imagen } from "../interfaces/imagenInterface";

export const createImagen = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url, descripcion } = req.body;

        if (!url || !descripcion) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevaImagen = await prisma.imagen.create({
            data: {
                url,
                descripcion
            },
        });

        res.status(201).json(nuevaImagen);
    } catch (error) {
        console.error('Error al crear la imagen:', error);
        res.status(500).json({ error: 'Error al crear la imagen' });
    }
};

export const getAllImagenes = async (req: Request, res: Response): Promise<void> => {

    try {
        const imagenes = await prisma.imagen.findMany()
        res.status(200).json(imagenes)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las imagenes')
    }

}

export const getImagenById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const imagen = await prisma.imagen.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!imagen) {
            res.status(404).json({ mensaje: "No se encontró la imagen" });
            return;
        }

        res.status(200).json(imagen)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la imagen')
    }

}

export const deleteImagenById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.imagen.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La imagen fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la imagen')
    }

}

export const updateImagen = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { url, descripcion } = req.body;

    try {
        const updatedImagen = await prisma.imagen.update({
            where: { id },
            data: {
                url,
                descripcion
            },
        });

        res.status(200).json({ message: "La imagen fue actualizada", imagen: updatedImagen });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la imagen" });
    }
};