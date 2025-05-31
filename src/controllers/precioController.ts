import { Request, Response } from "express"
import prisma from '../models/modelo'


export const createPrecio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { precioCompra, precioVenta } = req.body;

        if (!precioCompra || !precioVenta) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevoPrecio = await prisma.precio.create({
            data: {
                precioCompra,
                precioVenta
            },
        });

        res.status(201).json(nuevoPrecio);
    } catch (error) {
        console.error('Error al crear el precio:', error);
        res.status(500).json({ error: 'Error al crear el precio' });
    }
};

export const getAllPrecios = async (req: Request, res: Response): Promise<void> => {

    try {
        const precios = await prisma.precio.findMany()
        res.status(200).json(precios)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los precios')
    }

}

export const getPrecioById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const precio = await prisma.precio.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!precio) {
            res.status(404).json({ mensaje: "No se encontró el precio" });
            return;
        }

        res.status(200).json(precio)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el precio')
    }

}

export const deletePrecioById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.precio.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El precio fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el precio')
    }

}

export const updatePrecio = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { precioCompra, precioVenta } = req.body;

    try {
        const updatedprecio = await prisma.precio.update({
            where: { id },
            data: {
                precioCompra,
                precioVenta
            },
        });

        res.status(200).json({ message: "el precio fue actualizado", precio: updatedprecio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el precio" });
    }
};

