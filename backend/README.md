# Backend API

## Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Environment dosyasını oluşturun:**
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```
DATABASE_URL=postgresql://notapp:notapp123@localhost:5432/notapp?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. **Prisma Client'ı generate edin:**
```bash
npx prisma generate
```

4. **Database migration'larını çalıştırın:**
```bash
npx prisma migrate dev
```

5. **Backend'i başlatın:**
```bash
npm run dev
```

## Hızlı Kurulum (Tüm adımlar)

```bash
npm run setup
npm run dev
```

## Sorun Giderme

### Database Connection Failed Hatası

Eğer `{"status":"error","message":"API is running but database connection failed"}` hatası alıyorsanız:

**1. PostgreSQL'in çalıştığını kontrol edin:**

Docker kullanıyorsanız:
```bash
docker-compose up -d postgres
```

Veya manuel PostgreSQL kullanıyorsanız, servisin çalıştığından emin olun.

**2. .env dosyasını oluşturun:**

`backend/.env` dosyası oluşturun:
```env
DATABASE_URL=postgresql://notapp:notapp123@localhost:5432/notapp?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**3. Database'i initialize edin:**

Windows:
```bash
init-db.bat
```

Linux/Mac:
```bash
chmod +x init-db.sh
./init-db.sh
```

Veya manuel:
```bash
npx prisma generate
npx prisma migrate dev
```

**4. Backend'i yeniden başlatın:**
```bash
npm run dev
```

**5. Health check'i test edin:**
- Tarayıcıda `http://localhost:3000/api/health` adresine gidin
- `{"status":"ok","database":"connected"}` yanıtını görmelisiniz

### "Kayıt başarısız" hatası alıyorsanız:

1. **Backend çalışıyor mu kontrol edin:**
   - Tarayıcıda `http://localhost:3000/api/health` adresine gidin
   - `{"status":"ok","message":"API is running","database":"connected"}` yanıtını görmelisiniz

2. **Database bağlantısını kontrol edin:**
   - PostgreSQL'in çalıştığından emin olun
   - Docker kullanıyorsanız: `docker-compose up -d postgres`
   - `.env` dosyasındaki `DATABASE_URL` değerini kontrol edin

3. **Prisma migration'larını kontrol edin:**
   ```bash
   npx prisma migrate status
   ```
   Eğer migration yapılmamışsa:
   ```bash
   npx prisma migrate dev
   ```

4. **Prisma Client'ı yeniden generate edin:**
   ```bash
   npx prisma generate
   ```

5. **Console loglarını kontrol edin:**
   - Backend terminalinde hata mesajlarını kontrol edin
   - Frontend browser console'unda (F12) hata mesajlarını kontrol edin

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş
- `GET /api/notes` - Notları listele (Auth gerekli)
- `POST /api/notes` - Not oluştur (Auth gerekli)
- `PUT /api/notes/:id` - Not güncelle (Auth gerekli)
- `DELETE /api/notes/:id` - Not sil (Auth gerekli)

