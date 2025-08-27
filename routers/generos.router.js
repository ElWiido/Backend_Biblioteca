import { Router } from 'express';
import { getGenero, getGeneroById, createGenero, updateGenero, deleteGenero } from '../controllers/generos.controller.js';
import generoValidators from '../validators/generos.validators.js';

const router = Router();

router.get('/', getGenero);
router.get('/:id', getGeneroById);
router.post('/', generoValidators, createGenero);
router.put('/:id',generoValidators, updateGenero);
router.delete('/:id', deleteGenero);

export default router;
