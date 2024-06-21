
import { Router } from 'express';
import { getNotes, addNote, updateNote, deleteNote } from '../controller/notes.controller'

const router = Router();

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
