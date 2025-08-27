import { Router } from 'express';
import { getPrestamos_libros, getPrestamo_libroById, createPrestamo_libro, updatePrestamo_libro, deletePrestamo_libro, confirmarPrestamo, patchPrestamo_libro } from '../controllers/prestamos_libros.controller.js';
import prestamos_librosValidators from '../validators/prestamos_libros.validators.js';

const router = Router();

router.get('/', getPrestamos_libros);
router.get('/:id', getPrestamo_libroById);
router.post('/', prestamos_librosValidators, createPrestamo_libro);
router.put('/:id', prestamos_librosValidators, updatePrestamo_libro);
router.delete('/:id', deletePrestamo_libro);
router.post('/confirmar/:id', confirmarPrestamo);
router.patch('/:id', patchPrestamo_libro);

export default router;
