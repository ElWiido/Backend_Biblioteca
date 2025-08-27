import { Router } from 'express';
import { getLibros, getLibroById, createLibro, updateLibro, deleteLibro,} from '../controllers/libros.controller.js';
import libroValidators from '../validators/libros.validators.js';

const router = Router();

router.get('/', getLibros);
router.get('/:id', getLibroById);
router.post('/', libroValidators,createLibro);
router.put('/:id',libroValidators, updateLibro);
router.delete('/:id', deleteLibro);

export default router;
