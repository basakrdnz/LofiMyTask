# MyTask - Lofi Not Tutma Uygulaması 🎨

Modern teknolojiler kullanarak geliştirilmiş, lofi estetikli kişisel not ve görev yönetim uygulaması.

![MyTask](https://img.shields.io/badge/MyTask-Lofi%20App-purple)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## ✨ Özellikler

- 📝 **Notlar**: Düşüncelerinizi, fikirlerinizi kaydedin
- ✅ **Görevler**: Deadline'lı görevler oluşturun ve takip edin
- 📅 **Takvim Görünümü**: Tüm görevlerinizi takvimde görüntüleyin
- ⭐ **Yıldız Sistemi**: Tamamladığınız görevler için yıldızlar kazanın
- 🎨 **3 Farklı Tema**: Kütüphane, Not Defteri, Eğlenceli temalar
- 🌙 **Lofi Tasarım**: Gece kafe atmosferi ile rahatlatıcı arayüz
- 🎵 **Lofi Müzik**: Ana sayfada lofi müzik desteği
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm

## 🚀 Teknoloji Stack'i

### Frontend
- **React 18** (TypeScript)
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Sayfa yönlendirme
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js + Express** (TypeScript)
- **Prisma ORM** - Veritabanı yönetimi
- **PostgreSQL** - Veritabanı
- **JWT** - Authentication
- **bcrypt** - Şifre hashleme

### DevOps
- **Docker & Docker Compose** - Containerization

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- Docker & Docker Compose
- Git

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/kullaniciadi/mytask.git
cd mytask
```

2. **Environment değişkenlerini ayarlayın:**
```bash
# backend/.env dosyası oluşturun
cd backend
cp .env.example .env  # Eğer varsa
# veya manuel olarak oluşturun:
```

`backend/.env` dosyasına şunları ekleyin:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mytask?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=3000
```

3. **Docker ile veritabanını başlatın:**
```bash
docker-compose up -d postgres
```

4. **Veritabanı migration'larını çalıştırın:**
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
```

5. **Backend'i başlatın:**
```bash
cd backend
npm run dev
```

6. **Frontend'i başlatın:**
```bash
cd frontend
npm install
npm run dev
```

7. **Uygulamaya erişin:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🎯 Kullanım

1. Ana sayfada **"Başlayalım"** butonuna tıklayın
2. Yeni hesap oluşturun veya giriş yapın
3. Hoşgeldin sayfasında özellikleri keşfedin
4. Dashboard'da notlar ve görevler oluşturun
5. Takvim sayfasında görevlerinizi görüntüleyin

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yap

### Notes & Tasks
- `GET /api/notes?type=note` - Notları listele
- `GET /api/notes?type=task` - Görevleri listele
- `GET /api/notes/:id` - Detay
- `POST /api/notes` - Yeni not/görev oluştur
- `PUT /api/notes/:id` - Güncelle
- `DELETE /api/notes/:id` - Sil

## 🎨 Tema Renkleri

### Library (Lofi Gece Kafe)
- Primary: Yumuşak Mor (#BA68C8)
- Secondary: Yumuşak Turkuaz (#4DD0E1)
- Accent: Yumuşak Pembe-Kırmızı (#FF6B9D)

### Notebook
- Primary: Yumuşak Mavi (#42A5F5)
- Secondary: Açık Mavi (#81D4FA)
- Accent: Yumuşak Turuncu (#FF8A65)

### Playful
- Primary: Yumuşak Pembe (#F06292)
- Secondary: Açık Pembe (#F8BBD0)
- Accent: Yumuşak Mor (#CE93D8)

## 📁 Proje Yapısı

```
mytask/
├── backend/          # Express API
│   ├── prisma/       # Database schema
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   └── .env          # Environment variables
├── frontend/         # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── api/
│   └── public/
└── docker-compose.yml
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

MIT License

## 👨‍💻 Geliştirici

MyTask - Lofi Not Tutma Uygulaması

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
