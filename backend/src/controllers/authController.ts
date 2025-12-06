import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT_SECRET is not configured');
  }

  // Explicitly type the payload and options to help TypeScript
  const payload: object = { userId: userId };
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any
  };

  // Use type assertion to ensure correct overload is selected
  return jwt.sign(payload, secret as jwt.Secret, options) as string;
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    const token = signToken(user.id);

    res.status(201).json({
      user,
      token
    });
  } catch (error: any) {
    console.error('Register error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: error.errors[0].message,
        details: error.errors
      });
    }
    // Prisma unique constraint error
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanılıyor' });
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: error.errors[0].message,
        details: error.errors
      });
    }
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.userId authenticate middleware'den geliyor
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error: any) {
    console.error('Get me error:', error);
    next(error);
  }
};

