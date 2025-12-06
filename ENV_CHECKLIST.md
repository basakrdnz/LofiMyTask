# 🔄 Production ↔ Development Geçiş Checklist

## 📋 Backend Environment Variables

### Development (Local)
```env
# backend/.env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mytask
JWT_SECRET=your-local-secret-key
JWT_EXPIRES_IN=7d
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### Production (Render.com)
```env
# Render.com Dashboard → Backend Service → Environment Variables
NODE_ENV=production
DATABASE_URL=<Render.com Internal Connection String>
JWT_SECRET=<Güçlü production secret>
JWT_EXPIRES_IN=7d
PORT=10000 (Render.com default)
CORS_ORIGIN=https://lofimytask-frontend.onrender.com
```

---

## 📋 Frontend Environment Variables

### Development (Local)
```env
# frontend/.env (opsiyonel, vite.config.ts'de default var)
VITE_API_URL=http://localhost:3000/api
```

### Production (Render.com)
```env
# Render.com Dashboard → Frontend Static Site → Environment Variables
VITE_API_URL=https://lofimytask.onrender.com/api
```

---

## ✅ Geçiş Adımları

### Development → Production

1. **Backend .env kontrolü:**
   - [ ] `NODE_ENV=production` (Render.com'da otomatik)
   - [ ] `DATABASE_URL` → Render.com Internal Connection String
   - [ ] `CORS_ORIGIN` → Frontend production URL'i

2. **Render.com Backend Environment Variables:**
   - [ ] `DATABASE_URL` → Internal Connection String
   - [ ] `JWT_SECRET` → Güçlü secret (generate edilmiş)
   - [ ] `CORS_ORIGIN` → Frontend URL'i
   - [ ] `NODE_ENV` → `production`

3. **Render.com Frontend Environment Variables:**
   - [ ] `VITE_API_URL` → Backend production URL'i

4. **Git:**
   - [ ] Değişiklikleri `develop` branch'ine commit et
   - [ ] `main` branch'ine merge et (production deploy olur)

---

### Production → Development

1. **Backend .env güncelle:**
   - [ ] `NODE_ENV=development`
   - [ ] `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mytask`
   - [ ] `CORS_ORIGIN=http://localhost:5173`

2. **Local Database:**
   - [ ] Docker PostgreSQL çalışıyor mu? (`docker-compose up -d postgres`)
   - [ ] Migrations çalıştırıldı mı? (`npx prisma migrate dev`)

3. **Frontend:**
   - [ ] `VITE_API_URL` localhost'a işaret ediyor (default zaten öyle)

---

## 🚨 Önemli Notlar

### DATABASE_URL
- **Development:** Local PostgreSQL (`localhost:5432`)
- **Production:** Render.com Internal Connection String (Render servisleri arası)
- **Local'den Production DB'ye bağlanmak:** External Connection String kullan

### CORS_ORIGIN
- **Development:** `http://localhost:5173`
- **Production:** Frontend production URL'i (örn: `https://lofimytask-frontend.onrender.com`)

### NODE_ENV
- **Development:** `development`
- **Production:** `production` (Render.com'da otomatik)

### Render.com Database
- Free tier database'ler 90 gün kullanılmazsa **pause** olur
- Resume etmek için: Dashboard → Database → Resume
- Internal vs External Connection String:
  - **Internal:** Render servisleri arası (daha hızlı)
  - **External:** Dışarıdan erişim için (local test için)

---

## 🔍 Hızlı Kontrol

### Development'da çalıştırmadan önce:
```bash
# Backend
cd backend
cat .env | grep -E "NODE_ENV|DATABASE_URL|CORS_ORIGIN"
# Beklenen: NODE_ENV=development, DATABASE_URL=localhost, CORS_ORIGIN=localhost:5173

# Frontend
cd frontend
# VITE_API_URL kontrol et (default localhost:3000/api)
```

### Production deploy öncesi:
- [ ] Render.com'da tüm environment variables doğru mu?
- [ ] Database active mi? (pause olmamış mı?)
- [ ] `main` branch'inde miyiz?
- [ ] Git push yapıldı mı?

---

## 📝 Script Kullanımı

```bash
# Environment kontrolü
npm run env:check

# Development'a geç
npm run env:dev

# Production'a geç (sadece local .env)
npm run env:prod
```

