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
const isRender = databaseUrl.includes('render.com') || databaseUrl.includes('onrender.com');
const needsSSL = isProduction || isRender;

// Remove sslmode from connection string if present (we'll use Pool SSL config instead)
let cleanDatabaseUrl = databaseUrl;
if (cleanDatabaseUrl.includes('sslmode=')) {
  cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]sslmode=[^&]*/, '');
  // Clean up trailing ? or & if left after removal
  cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]$/, '');
}

// SSL configuration for Render.com PostgreSQL (self-signed certificates)
// Using Pool SSL config instead of connection string sslmode for better control
const poolConfig: any = {
  connectionString: cleanDatabaseUrl,
  // Additional connection options
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

// Add SSL config only for production/Render.com
if (needsSSL) {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for Render.com self-signed certificates
  };
}

const pool = new Pool(poolConfig);

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

