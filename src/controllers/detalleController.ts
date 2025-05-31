
import { Request, Response } from "express"
import prisma from '../models/modelo'


export const createDetalle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { stock, estado, idProducto, idTalle, idColor, idPrecio } = req.body;


        if (!stock || !estado) {
            res.status(400).json({ error: 'Faltan campos obligatorios' });
            return;
        }

        const productoExiste = await prisma.producto.findUnique({
            where: { id: idProducto },
        });
        if (!productoExiste) {
            res.status(400).json({ error: 'El producto indicado no existe' });
            return;
        }

        if (idTalle) {
            const talleExiste = await prisma.talle.findUnique({
                where: { id: idTalle },
            });
            if (!talleExiste) {
                res.status(400).json({ error: 'El talle indicado no existe' });
                return;
            }
        }

        if (idColor) {
            const colorExiste = await prisma.color.findUnique({
                where: { id: idColor },
            });
            if (!colorExiste) {
                res.status(400).json({ error: 'El color indicado no existe' });
                return;
            }
        }

        if (idPrecio) {
            const precioExiste = await prisma.precio.findUnique({
                where: { id: idPrecio },
            });
            if (!precioExiste) {
                res.status(400).json({ error: 'El precio indicado no existe' });
                return;
            }
        }

        const nuevoDetalle = await prisma.detalle.create({
            data: {
                stock,
                estado,
                idProducto,
                idTalle,
                idColor,
                idPrecio,
            },
            include: {
                producto: true,
                talle: true,
                color: true,
                precio: true,
            },
        });

        res.status(201).json(nuevoDetalle);
    } catch (error) {
        console.error('Error al crear el detalle:', error);
        res.status(500).json({ error: 'Error al crear el detalle' });
    }
};


export const getAllDetalles = async (req: Request, res: Response): Promise<void> => {

    try {
        const detalles = await prisma.detalle.findMany({
            include: {
                producto: true,
                talle: true,
                color: true,
                precio: true,
            },
        })
        res.status(200).json(detalles)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los detalles')
    }

}

export const getDetalleById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const detalle = await prisma.detalle.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!detalle) {
            res.status(404).json({ mensaje: "No se encontró el detalle" });
            return;
        }

        res.status(200).json(detalle)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el detalle')
    }

}

export const deleteDetalleById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.detalle.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json('El detalle fue eliminado')
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el detalle')
    }

}

export const updateDetalle = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { stock, estado, idProducto, idTalle, idColor, idPrecio } = req.body;

    try {
        const updatedDetalle = await prisma.detalle.update({
            where: { id },
            data: {
                stock, 
                estado, 
                idProducto, 
                idTalle, 
                idColor, 
                idPrecio
            },
        });

        res.status(200).json({ message: "El detalle fue actualizado", detalle: updatedDetalle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el detalle" });
    }
};


