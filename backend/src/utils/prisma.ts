import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const { Pool } = pkg;

// Load .env file before creating PrismaClient
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Parse DATABASE_URL to check if SSL is needed
const databaseUrl = process.env.DATABASE_URL || '';
const isProduction = process.env.NODE_ENV === 'production';
const needsSSL = isProduction || databaseUrl.includes('render.com') || databaseUrl.includes('onrender.com');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL configuration for Render.com PostgreSQL
  ...(needsSSL && {
    ssl: {
      rejectUnauthorized: false, // Render.com uses self-signed certificates
    },
  }),
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

