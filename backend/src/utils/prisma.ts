import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const { Pool } = pkg;

// Load .env file before creating PrismaClient
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Environment detection
const NODE_ENV = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || '';

// Determine if we're in production or using a remote database (like Render.com)
const isProduction = NODE_ENV === 'production';
const isLocalDatabase = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1') || databaseUrl.includes('postgres:5432');
const isRemoteDatabase = databaseUrl.includes('render.com') || databaseUrl.includes('onrender.com') || databaseUrl.includes('amazonaws.com') || databaseUrl.includes('heroku.com');

// SSL is required for remote databases (Render.com, AWS RDS, etc.)
// Development with local PostgreSQL doesn't need SSL
const needsSSL = isRemoteDatabase || (isProduction && !isLocalDatabase);

// Remove sslmode from connection string if present (we'll use Pool SSL config instead)
let cleanDatabaseUrl = databaseUrl;
if (cleanDatabaseUrl.includes('sslmode=')) {
  cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]sslmode=[^&]*/, '');
  // Clean up trailing ? or & if left after removal
  cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]$/, '');
}

// Pool configuration
const poolConfig: any = {
  connectionString: cleanDatabaseUrl,
  // Connection pool settings
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection cannot be established
};

// Add SSL configuration for remote databases (Render.com, AWS RDS, etc.)
if (needsSSL) {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for Render.com and other services with self-signed certificates
  };
  
  // Log SSL configuration in development for debugging
  if (NODE_ENV === 'development') {
    console.log('🔒 SSL enabled for database connection (remote database detected)');
  }
} else {
  // Log in development for clarity
  if (NODE_ENV === 'development') {
    console.log('🔓 SSL disabled (local database)');
  }
}

const pool = new Pool(poolConfig);

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

