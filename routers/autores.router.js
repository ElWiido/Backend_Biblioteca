import { Router } from 'express';
import { getAutores, getAutorById, createAutor, updateAutor, deleteAutor } from '../controllers/autores.controller.js';
import autorValidators from '../validators/autores.validators.js';

const router = Router();

router.get('/', getAutores);
router.get('/:id', getAutorById);
router.post('/', autorValidators, createAutor);
router.put('/:id', autorValidators, updateAutor);
router.delete('/:id', deleteAutor);

export default router;
