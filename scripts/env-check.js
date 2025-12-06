#!/usr/bin/env node

/**
 * Environment Variables Check Script
 * Development ve Production arasındaki farkları kontrol eder
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkBackendEnv() {
  const envPath = path.join(__dirname, '../backend/.env');
  
  if (!fs.existsSync(envPath)) {
    log('❌ backend/.env dosyası bulunamadı!', colors.red);
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  // Handle both CRLF and LF line endings, and empty lines
  envContent.split(/\r?\n/).forEach(line => {
    // Remove leading/trailing whitespace
    line = line.trim();
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) return;
    // Match KEY=VALUE pattern
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      // Remove quotes if present
      env[key] = value.replace(/^["']|["']$/g, '');
    }
  });

  log('\n📦 Backend Environment Variables:', colors.cyan);
  
  const checks = {
    'NODE_ENV': {
      value: env.NODE_ENV,
      expected: ['development', 'production'],
      description: 'Environment mode'
    },
    'DATABASE_URL': {
      value: env.DATABASE_URL,
      isLocal: env.DATABASE_URL?.includes('localhost') || env.DATABASE_URL?.includes('127.0.0.1') || env.DATABASE_URL?.includes('postgres:5432'),
      isRender: env.DATABASE_URL?.includes('render.com') || env.DATABASE_URL?.includes('onrender.com') || env.DATABASE_URL?.includes('dpg-'),
      description: 'Database connection string'
    },
    'CORS_ORIGIN': {
      value: env.CORS_ORIGIN,
      isLocal: env.CORS_ORIGIN?.includes('localhost'),
      isProduction: env.CORS_ORIGIN?.includes('https://'),
      description: 'CORS origin URL'
    },
    'JWT_SECRET': {
      value: env.JWT_SECRET ? '***' : undefined,
      hasValue: !!env.JWT_SECRET,
      description: 'JWT secret key'
    }
  };

  let allGood = true;

  // NODE_ENV check
  if (checks.NODE_ENV.value) {
    const isValid = checks.NODE_ENV.expected.includes(checks.NODE_ENV.value);
    log(`  ${isValid ? '✅' : '❌'} NODE_ENV: ${checks.NODE_ENV.value}`, isValid ? colors.green : colors.red);
    if (!isValid) allGood = false;
  } else {
    log('  ⚠️  NODE_ENV: Tanımlı değil', colors.yellow);
  }

  // DATABASE_URL check
  if (checks.DATABASE_URL.value) {
    const masked = checks.DATABASE_URL.value.replace(/:[^:@]+@/, ':****@');
    log(`  📡 DATABASE_URL: ${masked.substring(0, 60)}...`, colors.blue);
    
    if (checks.DATABASE_URL.isLocal) {
      log('     → Local database (development)', colors.green);
    } else if (checks.DATABASE_URL.isRender) {
      log('     → Render.com database (production)', colors.yellow);
      log('     ⚠️  Local\'den test ediyorsan External Connection String kullan!', colors.yellow);
    } else {
      log('     → Unknown database type', colors.yellow);
    }
  } else {
    log('  ❌ DATABASE_URL: Tanımlı değil!', colors.red);
    allGood = false;
  }

  // CORS_ORIGIN check
  if (checks.CORS_ORIGIN.value) {
    log(`  🌐 CORS_ORIGIN: ${checks.CORS_ORIGIN.value}`, colors.blue);
    if (checks.CORS_ORIGIN.isLocal) {
      log('     → Local development', colors.green);
    } else if (checks.CORS_ORIGIN.isProduction) {
      log('     → Production', colors.yellow);
    }
  } else {
    log('  ⚠️  CORS_ORIGIN: Tanımlı değil (default kullanılacak)', colors.yellow);
  }

  // JWT_SECRET check
  if (checks.JWT_SECRET.hasValue) {
    log('  🔐 JWT_SECRET: Tanımlı', colors.green);
  } else {
    log('  ❌ JWT_SECRET: Tanımlı değil!', colors.red);
    allGood = false;
  }

  // Environment consistency check
  const isDevelopment = checks.NODE_ENV.value === 'development';
  const isProduction = checks.NODE_ENV.value === 'production';
  
  if (isDevelopment && checks.DATABASE_URL.isRender) {
    log('\n  ⚠️  UYARI: Development modunda Render.com database kullanılıyor!', colors.yellow);
    log('     → Local database kullanmak için DATABASE_URL\'i güncelleyin', colors.yellow);
  }
  
  if (isProduction && checks.DATABASE_URL.isLocal) {
    log('\n  ⚠️  UYARI: Production modunda local database kullanılıyor!', colors.yellow);
    log('     → Render.com database kullanmak için DATABASE_URL\'i güncelleyin', colors.yellow);
  }

  return allGood;
}

function checkFrontendEnv() {
  log('\n📦 Frontend Environment Variables:', colors.cyan);
  
  const envPath = path.join(__dirname, '../frontend/.env');
  const envLocalPath = path.join(__dirname, '../frontend/.env.local');
  
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  } else if (fs.existsSync(envLocalPath)) {
    envContent = fs.readFileSync(envLocalPath, 'utf-8');
  }

  if (envContent) {
    const env = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });

    if (env.VITE_API_URL) {
      log(`  🌐 VITE_API_URL: ${env.VITE_API_URL}`, colors.blue);
      if (env.VITE_API_URL.includes('localhost')) {
        log('     → Local development', colors.green);
      } else if (env.VITE_API_URL.includes('https://')) {
        log('     → Production', colors.yellow);
      }
    }
  } else {
    log('  ℹ️  .env dosyası yok (default değerler kullanılacak)', colors.blue);
    log('     → Default: http://localhost:3000/api', colors.blue);
  }
}

function main() {
  log('\n🔍 Environment Variables Kontrolü\n', colors.cyan);
  
  const backendOk = checkBackendEnv();
  checkFrontendEnv();
  
  log('\n' + '='.repeat(50), colors.cyan);
  
  if (backendOk) {
    log('\n✅ Tüm kritik environment variables tanımlı!', colors.green);
  } else {
    log('\n❌ Bazı environment variables eksik veya hatalı!', colors.red);
    log('   → ENV_CHECKLIST.md dosyasını kontrol edin', colors.yellow);
    process.exit(1);
  }
  
  log('\n💡 İpucu: ENV_CHECKLIST.md dosyasında detaylı bilgi var\n', colors.blue);
}

main();

