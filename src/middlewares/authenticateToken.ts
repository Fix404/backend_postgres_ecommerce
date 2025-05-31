
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({ error: 'No autorizado' })
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            res.status(403).json({ error: 'No tenes acceso a este recurso' })
            return;
        }

        next();

    })

}