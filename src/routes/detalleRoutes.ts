import express from 'express';
import { createDetalle, deleteDetalleById, getAllDetalles, getDetalleById, updateDetalle} from '../controllers/detalleController';


const router = express.Router();

router.post('/', createDetalle)
router.get('/', getAllDetalles)
router.get('/:id', getDetalleById)
router.delete('/:id', deleteDetalleById)
router.put('/:id',updateDetalle)


export default router;