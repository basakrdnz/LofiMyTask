#!/bin/bash
# Render.com için build script
# Bu script Render.com'da build command olarak kullanılabilir

set -e  # Hata durumunda dur

echo "🔨 Installing dependencies..."
npm install

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "📦 Building TypeScript..."
npm run build

echo "🗄️ Running database migrations..."
npx prisma migrate deploy

echo "✅ Build completed successfully!"

