import { Router } from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller.js';
import usuarioValidators from '../validators/usuarios.validators.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', usuarioValidators, createUsuario);
router.put('/:id',usuarioValidators, updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
