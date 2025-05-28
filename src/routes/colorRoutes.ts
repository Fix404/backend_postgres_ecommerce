import express from 'express';
import { createColor, deleteColorById, getAllColores, getColorById, updateColor } from '../controllers/colorController';


const router = express.Router();

router.post('/', createColor)
router.get('/', getAllColores)
router.get('/:id', getColorById)
router.delete('/:id', deleteColorById)
router.put('/:id',updateColor)


export default router;