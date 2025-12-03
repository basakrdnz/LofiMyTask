# 📝 Proje Günlüğü

> Proje geliştirme sürecinde karşılaştığım problemler ve çözümleri.

---

## 📅 3 Aralık 2024

### Problem 1: "Kayıt başarısız" Hatası
**Çözüm:** Backend error handler'ı iyileştirdim, Prisma hataları için özel mesajlar ekledim.

### Problem 2: Database Connection Failed
**Neden:** 
- `.env` dosyası UTF-16 formatındaydı (UTF-8 olmalıydı)
- Backend `.env` dosyasını bulamıyordu

**Çözüm:**
1. `.env` dosyasını UTF-8 formatında yeniden oluşturdum
2. `backend/src/index.ts`'de `dotenv.config({ path: path.resolve(__dirname, '../.env') })` kullandım
3. Prisma migration'ları çalıştırdım

### Problem 3: Docker Daemon Çalışmıyor
**Çözüm:** Docker Desktop'ı açtım, container başladı.

### Problem 4: Prisma - Environment Variable Not Found
**Neden:** `.env` dosyası yanlış formattaydı
**Çözüm:** `.env` dosyasını UTF-8 formatında yeniden oluşturdum

---

## 📚 Öğrendiklerim

- `.env` dosyası mutlaka UTF-8 formatında olmalı
- Backend çalışırken Prisma Client generate edilemez (dosya kilitli)
- Docker Desktop açık olmalı
- Migration'lar sadece bir kez çalıştırılmalı

---

*Son güncelleme: 3 Aralık 2024*
