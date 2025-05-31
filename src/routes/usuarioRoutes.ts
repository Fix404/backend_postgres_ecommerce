import express from 'express'
import { deleteUsuarioById, getAllUsuarios, getUsuarioById, updateUsuario } from '../controllers/usuarioController';



const router = express.Router();


router.get('/', getAllUsuarios)
router.get('/:id', getUsuarioById)
router.delete('/:id', deleteUsuarioById)
router.put('/:id', updateUsuario)


export default router;


