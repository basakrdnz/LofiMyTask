import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';

const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  type: z.enum(['note', 'task']).optional().default('note'),
  deadline: z.string().datetime().optional().nullable()
});

const updateNoteSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  completed: z.boolean().optional(),
  deadline: z.string().datetime().optional().nullable()
});

export const getNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const where: any = { userId: req.userId };
    
    if (type === 'note' || type === 'task') {
      where.type = type;
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: { updatedAt: 'desc' }
    });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, type, deadline } = createNoteSchema.parse(req.body);

    const note = await prisma.note.create({
      data: {
        title,
        content,
        type: type || 'note',
        deadline: deadline ? new Date(deadline) : null,
        userId: req.userId!
      }
    });

    res.status(201).json(note);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

export const updateNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = updateNoteSchema.parse(req.body);
    
    const data: any = { ...updateData };
    if (updateData.deadline !== undefined) {
      data.deadline = updateData.deadline ? new Date(updateData.deadline) : null;
    }

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data
    });

    res.json(updatedNote);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await prisma.note.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

