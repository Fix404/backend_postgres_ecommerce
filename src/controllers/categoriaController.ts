import { Request, Response } from "express"
import prisma from '../models/modelo'
import { Categoria } from "../interfaces/categoriaInterface";



export const createCategoria = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'El nombre es obligatorio' });
            return;
        }

        const nuevaCategoria = await prisma.categoria.create({
            data: {
                nombre,
            },
        });

        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ error: 'Error al crear categoría' });
    }
};

export const getAllCategorias = async (req: Request, res: Response): Promise<void> => {

    try {
        const categorias = await prisma.categoria.findMany()
        res.status(200).json(categorias)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener categorías')
    }

}

export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const categoria = await prisma.categoria.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!categoria) {
            res.status(404).json({ mensaje: "No se encontró la categoría" });
            return;
        }

        res.status(200).json(categoria)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la categoría')
    }

}

export const deleteCategoriaById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const categoria = await prisma.categoria.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La categoría ${categoria.nombre} fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la categoría')
    }

}

export const updateCategoria = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  try {
    const updatedCategoria = await prisma.categoria.update({
      where: { id },
      data: {
        nombre
      },
    });

    res.status(200).json({ message: "Categoría actualizada", categoria: updatedCategoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
};