import express from 'express';
import { createImagen, deleteImagenById, getAllImagenes, getImagenById, updateImagen } from '../controllers/imagenController';


const router = express.Router();

router.post('/', createImagen)
router.get('/', getAllImagenes)
router.get('/:id', getImagenById)
router.delete('/:id', deleteImagenById)
router.put('/:id',updateImagen)


export default router;