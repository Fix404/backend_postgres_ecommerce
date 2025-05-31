
import express from 'express';
import { createPrecio, deletePrecioById, getAllPrecios, getPrecioById, updatePrecio } from '../controllers/precioController';


const router = express.Router();

router.post('/', createPrecio)
router.get('/', getAllPrecios)
router.get('/:id', getPrecioById)
router.delete('/:id', deletePrecioById)
router.put('/:id',updatePrecio)


export default router;
