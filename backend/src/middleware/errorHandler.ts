import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  console.error('Error stack:', err.stack);
  console.error('Request body:', req.body);
  console.error('Request URL:', req.url);

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanılıyor' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Kayıt bulunamadı' });
  }

  // Validation errors
  if (err.name === 'ValidationError' || err.name === 'ZodError') {
    return res.status(400).json({ 
      error: err.message || 'Geçersiz veri',
      details: err.errors || err.issues
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Geçersiz token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token süresi dolmuş' });
  }

  // Database connection errors
  if (err.code === 'ECONNREFUSED' || err.message?.includes('connect')) {
    return res.status(500).json({ 
      error: 'Veritabanı bağlantı hatası',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err 
    })
  });
};

