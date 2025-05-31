
import { Request, Response } from "express"
import prisma from '../models/modelo'


export const createProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, tipo, sexo, descripcion, idCategoria, idImagen, idDescuento} = req.body;

        if (!nombre || !tipo || sexo || descripcion || idCategoria || idImagen || idDescuento) {
            res.status(400).json({ error: 'La url es obligatoria' });
            return;
        }

        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre, tipo, sexo, descripcion, idCategoria, idImagen, idDescuento
            },
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

export const getAllProductos = async (req: Request, res: Response): Promise<void> => {

    try {
        const productos = await prisma.producto.findMany()
        res.status(200).json(productos)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los productos')
    }

}

export const getProductoById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const producto = await prisma.producto.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!producto) {
            res.status(404).json({ mensaje: "No se encontró el Producto" });
            return;
        }

        res.status(200).json(producto)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el Producto')
    }

}

export const deleteProductoById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await prisma.producto.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`el Producto fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el Producto')
    }

}

export const updateProducto = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const {nombre, tipo, sexo, descripcion, idCategoria, idImagen, idDescuento } = req.body;

    try {
        const updatedproducto = await prisma.producto.update({
            where: { id },
            data: {
                nombre, tipo, sexo, descripcion, idCategoria, idImagen, idDescuento
            },
        });

        res.status(200).json({ message: "el producto fue actualizado", producto: updatedproducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el Producto" });
    }
};


