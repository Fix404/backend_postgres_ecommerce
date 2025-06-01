import { Request, Response } from "express"
import prisma from '../models/modelo'
import { checkPassword, hashPassword } from "../services/passwordService";
import { generateToken } from "../services/authService";
import { Usuario } from "../interfaces/usuarioInterface";

export const register = async (req: Request, res: Response): Promise<void> => {
    const {email, contrasenia, nombre, dni, rol} = req.body;

    try{
        const hashedPass=await hashPassword(contrasenia);

        const usuario=await prisma.usuario.create(
            {data:{
                email,
                contrasenia: hashedPass,
                nombre,
                dni,
                rol
            }}
        )

        const token=generateToken(usuario);
        res.status(201).json({token});
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Hubo un error al crear usuario"})
    }
};

export const login = async(req:Request, res:Response): Promise<void> =>{
    const {email, contrasenia} = req.body;

    try{
        if(!email || !contrasenia){
            res.status(400).json({error:"Contraseña y mail son obligatorios"})
        }

        const usuario=await prisma.usuario.findUnique({where:{email}})

        if (!usuario) {
            res.status(400).json({ error: "Usuario no encontrado" });
            return;
        }

        const isPasswordValid=checkPassword(contrasenia,usuario.contrasenia)

        if(!isPasswordValid){
            res.status(400).json({error:"Datos no válidos"})
            return;
        }

        const token = generateToken(usuario);
        
        res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id: usuario!.id,
                email: usuario!.email,
                nombre: usuario!.nombre,
                dni: usuario!.dni,
                rol: usuario!.rol
            }
        });
    }catch(error){
        res.status(500).json({error: "Hubo un error al validar datos"})
    }
}