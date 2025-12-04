# 🚀 Production Deployment Rehberi

MyTask uygulamasını production'a almak için birkaç seçenek var. En kolay ve ücretsiz seçeneklerden başlayalım:

---

## 🎯 Seçenek 1: Vercel (Frontend) + Railway (Backend) + Neon (Database) ⭐ ÖNERİLEN

### Avantajlar:
- ✅ Ücretsiz başlangıç
- ✅ Otomatik deployment (GitHub bağlantısı)
- ✅ Kolay kurulum
- ✅ SSL sertifikası otomatik

### Adımlar:

#### 1. Database (Neon - PostgreSQL)
1. https://neon.tech adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni proje oluşturun
4. Connection string'i kopyalayın (örnek: `postgresql://user:pass@host/db?sslmode=require`)

#### 2. Backend (Railway)
1. https://railway.app adresine gidin
2. GitHub ile giriş yapın
3. "New Project" → "Deploy from GitHub repo"
4. `basakrdnz/LofiMyTask` repository'sini seçin
5. "Add Service" → "Empty Service"
6. Root directory: `backend` seçin
7. Environment Variables ekleyin:
   ```
   DATABASE_URL=neon_connection_string_buraya
   JWT_SECRET=güçlü-bir-secret-key-buraya
   JWT_EXPIRES_IN=7d
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
8. Build Command: `npm install && npm run build`
9. Start Command: `npm start`

#### 3. Frontend (Vercel)
1. https://vercel.com adresine gidin
2. GitHub ile giriş yapın
3. "Add New Project" → `basakrdnz/LofiMyTask` seçin
4. Root Directory: `frontend` seçin
5. Framework Preset: `Vite` seçin
6. Environment Variables ekleyin:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
7. Deploy edin

---

## 🎯 Seçenek 2: Render (Full Stack) - Tek Platform

### Avantajlar:
- ✅ Tek platform (kolay yönetim)
- ✅ Ücretsiz tier var
- ✅ PostgreSQL dahil

### Adımlar:

#### 1. PostgreSQL Database
1. https://render.com → Dashboard
2. "New +" → "PostgreSQL"
3. Database adı: `mytask-db`
4. Plan: Free seçin
5. Connection string'i kopyalayın

#### 2. Backend Service
1. "New +" → "Web Service"
2. GitHub repo bağlayın: `basakrdnz/LofiMyTask`
3. Root Directory: `backend`
4. Environment: `Node`
5. Build Command: `npm install && npm run build`
6. Start Command: `npm start`
7. Environment Variables:
   ```
   DATABASE_URL=render_postgres_connection_string
   JWT_SECRET=güçlü-secret-key
   JWT_EXPIRES_IN=7d
   PORT=10000
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend.onrender.com
   ```

#### 3. Frontend Static Site
1. "New +" → "Static Site"
2. GitHub repo: `basakrdnz/LofiMyTask`
3. Root Directory: `frontend`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `dist`
6. Environment Variables:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

---

## 🎯 Seçenek 3: Docker + Railway/Render (Kolay)

### Adımlar:
1. Production Dockerfile'ları kullanın
2. Railway veya Render'da Docker deployment seçin
3. `docker-compose.prod.yml` dosyasını kullanın

---

## 📝 Production İçin Gerekli Değişiklikler

### 1. Backend Production Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Frontend Production Build
Vite otomatik olarak production build yapar. Sadece environment variable'ı ayarlayın.

### 3. Environment Variables Checklist

**Backend:**
- ✅ `DATABASE_URL` - Production database connection string
- ✅ `JWT_SECRET` - Güçlü bir secret key (en az 32 karakter)
- ✅ `JWT_EXPIRES_IN` - Token süresi (örn: 7d)
- ✅ `NODE_ENV=production`
- ✅ `CORS_ORIGIN` - Frontend URL'i

**Frontend:**
- ✅ `VITE_API_URL` - Backend API URL'i

---

## 🔒 Güvenlik Kontrol Listesi

- [ ] JWT_SECRET güçlü ve unique
- [ ] Database connection string SSL ile (sslmode=require)
- [ ] CORS sadece frontend domain'ine izin veriyor
- [ ] Environment variables production'da ayarlandı
- [ ] HTTPS kullanılıyor (otomatik SSL)

---

## 💰 Maliyet Tahmini

### Ücretsiz Tier:
- **Vercel**: Ücretsiz (sınırsız bandwidth, 100GB)
- **Railway**: $5 kredi/ay (yaklaşık 500 saat)
- **Neon**: Ücretsiz (0.5GB storage)
- **Render**: Ücretsiz (sleeps after 15 min inactivity)

### Önerilen (Küçük Projeler):
- Vercel (Frontend) - Ücretsiz
- Railway (Backend) - $5/ay
- Neon (Database) - Ücretsiz

**Toplam: ~$5/ay veya ücretsiz (free tier ile)**

---

## 🚀 Hızlı Başlangıç (Vercel + Railway + Neon)

1. **Neon'da database oluştur** → Connection string al
2. **Railway'de backend deploy et** → Backend URL al
3. **Vercel'de frontend deploy et** → Frontend URL'i backend'e ekle
4. **CORS ayarını güncelle** → Backend'de frontend URL'i ekle

---

## 📚 Detaylı Rehberler

- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app)
- [Neon Database](https://neon.tech/docs)
- [Render Deployment](https://render.com/docs)

---

## ⚠️ Önemli Notlar

1. **Database Migration**: Production'da `prisma migrate deploy` kullanın (dev değil)
2. **Build**: Production'da `npm run build` yapın, `dev` değil
3. **Environment Variables**: Asla GitHub'a commit etmeyin
4. **CORS**: Sadece frontend domain'ine izin verin
5. **HTTPS**: Tüm platformlar otomatik SSL sağlar

---

Hangi platformu kullanmak istersiniz? Size adım adım yardımcı olabilirim! 🚀

