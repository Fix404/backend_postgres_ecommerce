
import { Request, Response } from "express"
import prisma from '../models/modelo'


export const createProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, tipo, sexo, descripcion, idCategoria, idImagen, idDescuento } = req.body;

    if (!nombre || !tipo || !sexo || !descripcion || !idCategoria || !idImagen) {
      res.status(400).json({ error: 'Faltan campos obligatorios' });
      return;
    }

    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: idCategoria },
    });
    if (!categoriaExiste) {
      res.status(400).json({ error: 'La categoría indicada no existe' });
      return;
    }

    if (idImagen) {
      const imagenExiste = await prisma.imagen.findUnique({
        where: { id: idImagen },
      });
      if (!imagenExiste) {
        res.status(400).json({ error: 'La imagen indicada no existe' });
        return;
      }
    }

    if (idDescuento) {
      const descuentoExiste = await prisma.descuento.findUnique({
        where: { id: idDescuento },
      });
      if (!descuentoExiste) {
        res.status(400).json({ error: 'El descuento indicado no existe' });
        return;
      }
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        tipo,
        sexo,
        descripcion,
        idCategoria,
        idImagen,
        ...(idDescuento && { idDescuento }),
      },
      include: {
        categoria: true,
        imagen: true,
        descuento: true,
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
        const productos = await prisma.producto.findMany({
            include: {
                categoria:true,
                imagen:true,
            },
        })
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
            res.status(404).json({ mensaje: "No se encontró el producto" });
            return;
        }

        res.status(200).json(producto)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el producto')
    }

}

export const deleteProductoById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const producto = await prisma.producto.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El producto ${producto.nombre} fue eliminado`)
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

        res.status(200).json({ message: "El producto fue actualizado", producto: updatedproducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};


