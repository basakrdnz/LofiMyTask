# MyTask - Kişisel Not ve Görev Yönetim Uygulaması

Modern, kullanıcı dostu bir not ve görev yönetim uygulaması.

## 👨‍💻 Proje Hakkında

Bu projeyi geliştirirken, modern web teknolojilerini kullanarak full-stack bir uygulama oluşturdum. **Backend** tarafında **Node.js** ve **Express** ile RESTful API geliştirdim, **TypeScript** kullanarak type-safe bir kod yapısı oluşturdum. **Prisma ORM 7** ile veritabanı yönetimini gerçekleştirdim - bu süreçte Prisma 7'nin yeni konfigürasyon yapısına geçiş yapmak (schema.prisma'dan prisma.config.js'e) ve **PostgreSQL** ile SSL bağlantı sorunlarını çözmek en zorlandığım noktalardan biriydi. Özellikle Render.com'un self-signed SSL sertifikaları ile çalışmak için `pg.Pool` yapılandırması ve **PrismaPg adapter** kullanımı konusunda detaylı araştırma yapmam gerekti.

**Frontend** tarafında **React** ve **TypeScript** ile component-based bir mimari kurdum. **Vite** kullanarak hızlı development experience sağladım ve **Zustand** ile state management yaptım. Zustand'ın `persist` middleware'i ile localStorage yönetimi yaparken, sayfa yenileme (F5) sırasında store'ların hydration sorunlarını çözmek için özel loading state'leri ve timeout mekanizmaları geliştirdim. **Tailwind CSS** ile modern ve responsive bir UI tasarladım, **React Router** ile client-side routing implementasyonu yaptım.

**Authentication** sisteminde **JWT** token-based authentication kullandım, **bcrypt** ile password hashing yaptım ve **Zod** ile input validation gerçekleştirdim. Sayfa yenileme sırasında kullanıcı bilgilerinin korunması için auth refresh mekanizması ekledim - bu, token'ın backend'den doğrulanması ve kullanıcı bilgilerinin güncellenmesi için `/api/auth/me` endpoint'i oluşturmamı gerektirdi.

**Deployment** aşamasında **Render.com** kullanarak hem backend (Node.js Web Service) hem de frontend (Static Site) deploy ettim. Bu süreçte environment variables yönetimi, CORS ayarları ve database connection string'lerinin (Internal vs External) doğru kullanımı konularında deneyim kazandım. **Docker** ve **Docker Compose** ile local development ortamı kurulumu yaptım.

Projeyi geliştirirken en çok zorlandığım konular: Prisma 7 migration süreci, Render.com PostgreSQL SSL bağlantı sorunları, Zustand hydration timing sorunları ve production/development environment yönetimi oldu. Bu sorunları çözerken detaylı dokümantasyon okuma, debugging teknikleri ve systematic problem-solving yaklaşımı kullandım.

## 🚀 Özellikler

- 📝 Not oluşturma ve yönetme
- ✅ Görev takibi
- 📅 Takvim görünümü
- 🎨 Modern ve responsive tasarım
- 🔐 Güvenli kimlik doğrulama
- 💾 Prisma ORM ile veritabanı yönetimi

## 🛠️ Teknolojiler

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL (veya Docker)
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/basakrdnz/LofiMyTask.git
cd LofiMyTask
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Backend ayarları:**
```bash
cd backend
cp .env.example .env  # .env dosyası oluşturun
# .env dosyasına DATABASE_URL ve JWT_SECRET ekleyin
npx prisma generate
npx prisma migrate dev
```

4. **Frontend ayarları:**
```bash
cd ../frontend
# Gerekirse .env dosyası oluşturun
```

5. **Development modunda çalıştırın:**
```bash
# Root dizinde
npm run dev
```

## 🚀 Production Build

```bash
npm run build
npm start
```

## 🔄 Git Komutları

```bash
# Değişiklikleri ekle ve commit et
git add .
git commit -m "commit mesajı"
git push

# Veya tek satırda
git add . && git commit -m "commit mesajı" && git push
``` 

## 📝 Scripts

- `npm run dev` - Development modunda çalıştırır
- `npm run build` - Production build alır
- `npm start` - Production modunda çalıştırır
- `npm test` - Testleri çalıştırır

## 🌐 Deployment

Uygulama **Render.com** üzerinde deploy edilmiştir.

**🔗 Canlı Demo:** [https://lofimytask-1.onrender.com](https://lofimytask-1.onrender.com)

- **Backend API:** Render.com Web Service
- **Frontend:** Render.com Static Site
- **Database:** Render.com PostgreSQL

## 📄 Lisans

MIT

