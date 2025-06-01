import { Request, Response } from "express"
import prisma from '../models/modelo'
import {Color} from '../interfaces/colorInterface'


export const createColor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { color} = req.body;

        if (!color) {
            res.status(400).json({ error: 'El color es obligatorio' });
            return;
        }

        const nuevoColor = await prisma.color.create({
            data: {
                color,
            },
        });

        res.status(201).json(nuevoColor);
    } catch (error) {
        console.error('Error al crear el color:', error);
        res.status(500).json({ error: 'Error al crear el color' });
    }
};

export const getAllColores = async (req: Request, res: Response): Promise<void> => {

    try {
        const colores = await prisma.color.findMany()
        res.status(200).json(colores)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los colores')
    }

}

export const getColorById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const color = await prisma.color.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!color) {
            res.status(404).json({ mensaje: "No se encontró el color" });
            return;
        }

        res.status(200).json(color)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el color')
    }

}

export const deleteColorById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const color = await prisma.color.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El color ${color.color} fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el color')
    }

}

export const updateColor = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { color } = req.body;

  try {
    const updatedColor = await prisma.color.update({
      where: { id },
      data: {
        color
      },
    });

    res.status(200).json({ message: "Color actualizada", color: updatedColor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el color" });
  }
};