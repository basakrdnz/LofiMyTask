# MyTask - Kişisel Not ve Görev Yönetim Uygulaması

Modern, kullanıcı dostu bir not ve görev yönetim uygulaması.

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

Render.com üzerinde deploy edilmiştir.

## 🔄 Environment Variables

Production ve Development arasında geçiş yaparken environment variables'ları kontrol edin:

```bash
# Environment variables kontrolü
npm run env:check
```

Detaylı bilgi için: [ENV_CHECKLIST.md](./ENV_CHECKLIST.md)

## 🔀 Git Workflow

Proje için Git workflow ve branch stratejisi: [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)

### Hızlı Komutlar:
```bash
# Yeni özellik için branch oluştur
git checkout develop
git pull
git checkout -b feature/feature-name

# Production'a deploy
git checkout main
git merge develop
git push origin main
```

## 📄 Lisans

MIT

