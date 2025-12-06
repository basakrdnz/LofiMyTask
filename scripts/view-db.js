#!/usr/bin/env node

/**
 * Database Viewer Script
 * Prisma Studio'yu başlatır veya database bilgilerini gösterir
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('\n📊 Database Görüntüleme\n');

console.log('Seçenek 1: Prisma Studio (Grafik Arayüz)');
console.log('  → Tarayıcıda database görüntüleme');
console.log('  → Komut: cd backend && npm run prisma:studio\n');

console.log('Seçenek 2: Prisma Studio\'yu otomatik başlat');
console.log('  → Şimdi başlatılsın mı? (y/n)\n');

// Prisma Studio'yu başlat
try {
  console.log('🚀 Prisma Studio başlatılıyor...\n');
  console.log('📡 Tarayıcıda http://localhost:5555 adresine git\n');
  console.log('⚠️  Durdurmak için: Ctrl + C\n');
  
  process.chdir(path.join(__dirname, '../backend'));
  execSync('npm run prisma:studio', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Hata:', error.message);
  console.log('\n💡 Manuel başlatmak için:');
  console.log('   cd backend');
  console.log('   npm run prisma:studio\n');
}

