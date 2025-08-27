import { Router } from 'express';
import { getEstados, getEstadoById, createEstado, updateEstado, deleteEstado } from '../controllers/estados.controller.js';
import estadoValidators from '../validators/estados.validators.js';

const router = Router();

router.get('/', getEstados);
router.get('/:id', getEstadoById);
router.post('/', estadoValidators, createEstado);
router.put('/:id', updateEstado);
router.delete('/:id', deleteEstado);

export default router;
