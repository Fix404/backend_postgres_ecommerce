import express from 'express';
import { createDireccion, deleteDireccionById, getAllDirecciones, getDireccionById, updateDireccion } from '../controllers/direccionController';


const router = express.Router();

router.post('/', createDireccion)
router.get('/', getAllDirecciones)
router.get('/:id', getDireccionById)
router.delete('/:id', deleteDireccionById)
router.put('/:id',updateDireccion)


export default router;