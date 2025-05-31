

import express from 'express';
import { createProducto, deleteProductoById, getAllProductos, getProductoById, updateProducto } from '../controllers/productoController';


const router = express.Router();

router.post('/', createProducto)
router.get('/', getAllProductos)
router.get('/:id', getProductoById)
router.delete('/:id', deleteProductoById)
router.put('/:id',updateProducto)


export default router;
