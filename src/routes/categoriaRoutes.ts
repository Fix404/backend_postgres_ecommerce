import express from 'express';
import { createCategoria, deleteCategoriaById, getAllCategorias, getCategoriaById, updateCategoria } from '../controllers/categoriaController';


const router = express.Router();

router.post('/', createCategoria)
router.get('/', getAllCategorias)
router.get('/:id', getCategoriaById)
router.delete('/:id', deleteCategoriaById)
router.put('/:id',updateCategoria)


export default router;