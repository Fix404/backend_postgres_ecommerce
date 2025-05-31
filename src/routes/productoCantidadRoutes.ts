
import express from 'express';
import { createProductoCantidad, deleteProductoCantidadById, getAllProductoCantidades, getProductoCantidadById, updateProductoCantidad } from '../controllers/productoCantidadController';


const router = express.Router();

router.post('/', createProductoCantidad)
router.get('/', getAllProductoCantidades)
router.get('/:id', getProductoCantidadById)
router.delete('/:id', deleteProductoCantidadById)
router.put('/:id',updateProductoCantidad)


export default router;
