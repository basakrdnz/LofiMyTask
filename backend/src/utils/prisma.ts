import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const { Pool } = pkg;

// Load .env file before creating PrismaClient
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Parse DATABASE_URL to check if SSL is needed
let databaseUrl = process.env.DATABASE_URL || '';
const isProduction = process.env.NODE_ENV === 'production';
const isRender = databaseUrl.includes('render.com') || databaseUrl.includes('onrender.com');
const needsSSL = isProduction || isRender;

// Ensure SSL mode is set for Render.com PostgreSQL
if (needsSSL && !databaseUrl.includes('sslmode=')) {
  const separator = databaseUrl.includes('?') ? '&' : '?';
  databaseUrl = `${databaseUrl}${separator}sslmode=require`;
}

// SSL configuration for Render.com PostgreSQL (self-signed certificates)
const sslConfig = needsSSL
  ? {
      ssl: {
        rejectUnauthorized: false, // Required for Render.com self-signed certificates
      },
    }
  : {};

const pool = new Pool({
  connectionString: databaseUrl,
  ...sslConfig,
  // Additional connection options
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

