
import express from 'express';
import { createOrdenCompra, deleteOrdenCompraById, getAllOrdenesCompra, getOrdenCompraById, updateOrdenCompra } from '../controllers/ordenCompraController';


const router = express.Router();

router.post('/', createOrdenCompra)
router.get('/', getAllOrdenesCompra)
router.get('/:id', getOrdenCompraById)
router.delete('/:id', deleteOrdenCompraById)
router.put('/:id',updateOrdenCompra)


export default router;
