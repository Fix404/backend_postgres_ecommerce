import { Request, Response } from "express"
import prisma from '../models/modelo'
import {Descuento} from '../interfaces/descuentoInterface'


export const createDescuento = async (req: Request, res: Response): Promise<void> => {
    try {
        const {fechaInicio, fechaCierre, porcentaje} = req.body;

        if (!fechaInicio || !fechaCierre || !porcentaje) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        const nuevoDescuento = await prisma.descuento.create({
            data: {
               fechaInicio, 
               fechaCierre, 
               porcentaje
            },
        });

        res.status(201).json(nuevoDescuento);
    } catch (error) {
        console.error('Error al crear el descuento:', error);
        res.status(500).json({ error: 'Error al crear el descuento' });
    }
};

export const getAllDescuentos = async (req: Request, res: Response): Promise<void> => {

    try {
        const descuentos = await prisma.descuento.findMany()
        res.status(200).json(descuentos)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los descuentos')
    }

}

export const getDescuentoById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const descuento = await prisma.descuento.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!descuento) {
            res.status(404).json({ mensaje: "No se encontró el descuento" });
            return;
        }

        res.status(200).json(descuento)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el descuento')
    }

}

export const deleteDescuentoById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const descuento = await prisma.descuento.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El descuento fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el descuento')
    }

}

export const updateDescuento = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { fechaInicio, fechaCierre, porcentaje } = req.body;

  try {
    const updatedDescuento = await prisma.descuento.update({
      where: { id },
      data: {
        fechaInicio, 
        fechaCierre, 
        porcentaje
      },
    });

    res.status(200).json({ message: "Descuento actualizado", descuento: updatedDescuento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el descuento" });
  }
};