import { Request, Response } from "express"
import prisma from '../models/modelo'
import { ProductoCantidad } from "../interfaces/productoCantidadInterface";

export const createProductoCantidad = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cantidad, idDetalle } = req.body;

        if (!cantidad || !idDetalle) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevoproductoCantidad = await prisma.productoCantidad.create({
            data: {
                cantidad,
                detalle: {
                    connect: { id: idDetalle }
                }
            },
        });

        res.status(201).json(nuevoproductoCantidad);
    } catch (error) {
        console.error('Error al crear la cantidad de producto:', error);
        res.status(500).json({ error: 'Error al crear la cantidad de producto' });
    }
};

export const getAllProductoCantidades = async (req: Request, res: Response): Promise<void> => {

    try {
        const productoCantidades = await prisma.productoCantidad.findMany()
        res.status(200).json(productoCantidades)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las cantidades')
    }

}

export const getProductoCantidadById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const cantidadProducto = await prisma.productoCantidad.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!cantidadProducto) {
            res.status(404).json({ mensaje: "No se encontró la cantidad de Producto" });
            return;
        }

        res.status(200).json(cantidadProducto)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la cantidad de Producto')
    }

}

export const deleteProductoCantidadById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.productoCantidad.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La cantidad de Producto fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la  cantidad de Producto')
    }

}

export const updateProductoCantidad = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { cantidad, idDetalle } = req.body;

    try {
        const updatedcantidadProducto = await prisma.productoCantidad.update({
            where: { id },
            data: {
                cantidad,
                idDetalle
            },
        });

        res.status(200).json({ message: "la  cantidad de Producto fue actualizada", cantidadProducto: updatedcantidadProducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la cantidad de Producto" });
    }
};

