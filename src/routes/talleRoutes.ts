

import express from 'express';
import { createTalle, deleteTalleById, getAllTalles, getTalleById, updateTalle } from '../controllers/talleController';

const router = express.Router();

router.post('/', createTalle)
router.get('/', getAllTalles)
router.get('/:id', getTalleById)
router.delete('/:id', deleteTalleById)
router.put('/:id',updateTalle)


export default router;

