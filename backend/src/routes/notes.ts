import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesController';

const router = express.Router();

router.use(authenticate);

router.get('/', (req: AuthRequest, res, next) => {
  getNotes(req, res, next);
});

router.get('/:id', (req: AuthRequest, res, next) => {
  getNoteById(req, res, next);
});

router.post('/', (req: AuthRequest, res, next) => {
  createNote(req, res, next);
});

router.put('/:id', (req: AuthRequest, res, next) => {
  updateNote(req, res, next);
});

router.delete('/:id', (req: AuthRequest, res, next) => {
  deleteNote(req, res, next);
});

export default router;

