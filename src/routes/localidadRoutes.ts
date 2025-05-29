import express from 'express';
import { createLocalidad, deleteLocalidadById, getAllLocalidades, getLocalidadById, updateLocalidad } from '../controllers/localidadController';


const router = express.Router();

router.post('/', createLocalidad)
router.get('/', getAllLocalidades)
router.get('/:id', getLocalidadById)
router.delete('/:id', deleteLocalidadById)
router.put('/:id',updateLocalidad)


export default router;