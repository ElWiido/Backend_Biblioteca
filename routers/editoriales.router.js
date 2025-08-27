import { Router } from 'express';
import { getEditoriales, getEditorialById, createEditorial, updateEditorial, deleteEditorial } from '../controllers/editoriales.controller.js';
import editorialValidators from '../validators/editoriales.validators.js';

const router = Router();

router.get('/', getEditoriales);
router.get('/:id', getEditorialById);
router.post('/', editorialValidators, createEditorial);
router.put('/:id', editorialValidators, updateEditorial);
router.delete('/:id', deleteEditorial);

export default router;
