import { Request, Response } from "express"
import prisma from '../models/modelo'



export const createLocalidad = async (req: Request, res: Response): Promise<void> => {
    try {
        const { localidad, codigoPostal } = req.body;

        if (!localidad || !codigoPostal) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        const nuevaLocalidad = await prisma.localidad.create({
            data: {
                localidad,
                codigoPostal
            },
        });

        res.status(201).json(nuevaLocalidad);
    } catch (error) {
        console.error('Error al crear la localidad:', error);
        res.status(500).json({ error: 'Error al crear la localidad' });
    }
};

export const getAllLocalidades = async (req: Request, res: Response): Promise<void> => {

    try {
        const localidades = await prisma.localidad.findMany()
        res.status(200).json(localidades)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las localidades')
    }

}

export const getLocalidadById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const localidad = await prisma.localidad.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!localidad) {
            res.status(404).json({ mensaje: "No se encontró la localidad" });
            return;
        }

        res.status(200).json(localidad)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener la localidad')
    }

}

export const deleteLocalidadById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const localidad = await prisma.localidad.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`La localidad ${localidad.localidad} fue eliminada`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar la localidad')
    }

}

export const updateLocalidad = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { localidad, codigoPostal } = req.body;

  try {
    const updatedLocalidad = await prisma.localidad.update({
      where: { id },
      data: {
        localidad,
        codigoPostal
      },
    });

    res.status(200).json({ message: "Localidad actualizada", localidad: updatedLocalidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la localidad" });
  }
};