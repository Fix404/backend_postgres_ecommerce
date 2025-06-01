import { Request, Response } from "express"
import prisma from '../models/modelo'
import { OrdenCompra } from "../interfaces/ordenCompraInterface";

export const createOrdenCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const { precioTotal, movimiento, fecha, idUsuario, idProductoCantidad } = req.body;

        if (!precioTotal) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevaOrdenCompra = await prisma.ordenCompra.create({
            data: {
                precioTotal,
                movimiento,
                fecha,
                usuario:{
                    connect: {id: idUsuario}
                },
                productoCantidad: {
                    connect: {id: idProductoCantidad}
                }
            },
        });

        res.status(201).json(nuevaOrdenCompra);
    } catch (error) {
        console.error('Error al crear la orden de compra:', error);
        res.status(500).json({ error: 'Error al crear la orden de compra' });
    }
};

export const getAllOrdenesCompra = async (req: Request, res: Response): Promise<void> => {

    try {
        const ordenesCompra = await prisma.ordenCompra.findMany()
        res.status(200).json(ordenesCompra)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las ordenesCompra')
    }

}

export const getOrdenCompraById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const ordenCompra = await prisma.ordenCompra.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!ordenCompra) {
            res.status(404).json({ mensaje: "No se encontró la orden de compra" });
            return;
        }

        res.status(200).json(ordenCompra)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la orden de compra')
    }

}

export const deleteOrdenCompraById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.ordenCompra.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La ordende Compra fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la orden de compra')
    }

}

export const updateOrdenCompra = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { url, precioTotal,
                movimiento,
                fecha,
                idUsuario,
                idProductoCantidad} = req.body;

    try {
        const updatedordenCompra = await prisma.ordenCompra.update({
            where: { id },
            data: {
                precioTotal,
                movimiento,
                fecha,
                idUsuario,
                idProductoCantidad
            },
        });

        res.status(200).json({ message: "La orden de compra fue actualizada", ordenCompra: updatedordenCompra });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la orden de Compra" });
    }
};



