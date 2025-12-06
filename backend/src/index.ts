import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './utils/prisma';

// Load .env file from backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok', 
      message: 'API is running',
      database: 'connected'
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error';
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    
    console.error('Database connection error:', errorMessage);
    console.error('DATABASE_URL exists:', hasDatabaseUrl);
    if (hasDatabaseUrl) {
      console.error('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    }
    
    res.status(500).json({ 
      status: 'error', 
      message: 'API is running but database connection failed',
      error: errorMessage,
      hasDatabaseUrl,
      suggestions: [
        !hasDatabaseUrl ? 'DATABASE_URL environment variable is missing. Create backend/.env file.' : null,
        'Make sure PostgreSQL is running (docker-compose up -d postgres)',
        'Run database migrations: npx prisma migrate dev',
        'Check if DATABASE_URL in .env file is correct'
      ].filter(Boolean)
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Test database connection on startup
const testDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
  } catch (error: any) {
    console.error('❌ Database connection failed:', error.message);
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    console.error('DATABASE_URL exists:', hasDatabaseUrl);
    if (hasDatabaseUrl) {
      const dbUrl = process.env.DATABASE_URL || '';
      const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@');
      console.error('DATABASE_URL:', maskedUrl);
      
      // Check if it's a Render.com database
      if (dbUrl.includes('render.com') || dbUrl.includes('onrender.com')) {
        console.error('⚠️  Render.com database detected. Make sure:');
        console.error('   1. Database is active in Render.com dashboard');
        console.error('   2. Using External Connection String (not Internal)');
        console.error('   3. Database is not paused (free tier databases pause after inactivity)');
      }
    }
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  
  // Test database connection
  await testDatabaseConnection();
});

