

import { Request, Response } from "express"
import prisma from '../models/modelo'


export const getAllUsuarios = async (req: Request, res: Response): Promise<void> => {

    try {
        const usuarios = await prisma.usuario.findMany()
        res.status(200).json(usuarios)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener los usuarios')
    }

}

export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {

    const id = parseInt(req.params.id);

    try {
        const usuario = await prisma.usuario.findUnique(
            {
                where: {
                    id
                }
            }
        )

        if (!usuario) {
            res.status(404).json({ mensaje: "No se encontró el usuario" });
            return;
        }

        res.status(200).json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener el usuario')
    }

}

export const deleteUsuarioById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const usuario = await prisma.usuario.delete(
            {
                where: {
                    id
                }
            }
        )

        res.status(200).json(`El usuario ${usuario.nombre} fue eliminado`)
    } catch (error) {
        console.log(error)
        res.status(500).json('No se pudo eliminar el usuario')
    }
}

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nombre, email, dni, rol, direccion } = req.body;

    try {
        const updatedusuario = await prisma.usuario.update({
            where: { id },
            data: {
                nombre, email, dni, rol, direccion
            },
        });

        res.status(200).json({ message: "El usuario fue actualizado", usuario: updatedusuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};