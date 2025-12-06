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
const originalUrl = databaseUrl;
// Remove sslmode parameter (case insensitive, with any value)
cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]sslmode=[^&]*/gi, '');
// Clean up trailing ? or &
cleanDatabaseUrl = cleanDatabaseUrl.replace(/[?&]$/, '');

// Debug: Log URL cleaning
if (originalUrl !== cleanDatabaseUrl) {
  console.log('🔧 Cleaned DATABASE_URL (removed sslmode)');
  console.log('   Before:', originalUrl.replace(/:[^:@]+@/, ':****@'));
  console.log('   After: ', cleanDatabaseUrl.replace(/:[^:@]+@/, ':****@'));
}

// Pool configuration
const poolConfig: any = {
  connectionString: cleanDatabaseUrl,
  // Connection pool settings
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 20000, // Return an error after 20 seconds if connection cannot be established (increased for Render.com)
  // Keep connections alive
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
};

// Add SSL configuration for remote databases (Render.com, AWS RDS, etc.)
if (needsSSL) {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for Render.com and other services with self-signed certificates
    // Additional SSL options for better compatibility
    require: true,
  };
  
  // Log SSL configuration for debugging
  console.log('🔒 SSL enabled for database connection (remote database detected)');
  console.log('📡 Database URL (masked):', cleanDatabaseUrl.replace(/:[^:@]+@/, ':****@'));
  console.log('🔐 SSL config:', JSON.stringify(poolConfig.ssl));
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

