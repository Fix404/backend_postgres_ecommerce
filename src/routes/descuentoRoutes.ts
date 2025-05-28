import express from 'express';
import { createDescuento, deleteDescuentoById, getAllDescuentos, getDescuentoById, updateDescuento } from '../controllers/descuentoController';
const router = express.Router();

router.post('/', createDescuento)
router.get('/', getAllDescuentos)
router.get('/:id', getDescuentoById)
router.delete('/:id', deleteDescuentoById)
router.put('/:id',updateDescuento)


export default router;