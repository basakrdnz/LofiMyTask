# 🚀 PROJEYİ ÇALIŞTIRMA REHBERİ

## ⚠️ ÖNEMLİ: Sırayla yapın, her adımı tamamladıktan sonra bir sonrakine geçin!

---

## ADIM 1: PostgreSQL Veritabanını Başlat

**Ne yapıyoruz?** Veritabanını çalıştırıyoruz.

**Terminalde şunu yazın:**
```
docker-compose up -d postgres
```

**Ne görmelisiniz?**
```
Creating not-app-postgres ... done
```

**Eğer hata alırsanız:** Docker Desktop'ı açın ve tekrar deneyin.

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 2: Backend Klasörüne Git

**Ne yapıyoruz?** Backend klasörüne geçiyoruz.

**Terminalde şunu yazın:**
```
cd backend
```

**Ne görmelisiniz?**
Terminal satırınız şöyle olmalı: `C:\mytask\backend>`

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 3: .env Dosyasını Oluştur

**Ne yapıyoruz?** Backend için ayar dosyası oluşturuyoruz.

**Terminalde şunu yazın:**
```
echo DATABASE_URL=postgresql://notapp:notapp123@localhost:5432/notapp?schema=public > .env
```

**Sonra şunu yazın:**
```
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
```

**Sonra şunu yazın:**
```
echo JWT_EXPIRES_IN=7d >> .env
```

**Sonra şunu yazın:**
```
echo PORT=3000 >> .env
```

**Sonra şunu yazın:**
```
echo NODE_ENV=development >> .env
```

**Sonra şunu yazın:**
```
echo CORS_ORIGIN=http://localhost:5173 >> .env
```

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 4: Paketleri Yükle (Backend)

**Ne yapıyoruz?** Backend için gerekli programları indiriyoruz.

**Terminalde şunu yazın:**
```
npm install
```

**Ne görmelisiniz?**
Çok fazla satır geçecek, sonunda `added XXX packages` gibi bir şey göreceksiniz.

**⏳ Bu biraz zaman alabilir (2-5 dakika).** Sabırlı olun.

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 5: Prisma Client Oluştur

**Ne yapıyoruz?** Veritabanı bağlantısı için gerekli dosyaları oluşturuyoruz.

**Terminalde şunu yazın:**
```
npx prisma generate
```

**Ne görmelisiniz?**
```
✔ Generated Prisma Client
```

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 6: Veritabanı Tablolarını Oluştur

**Ne yapıyoruz?** Veritabanında tabloları oluşturuyoruz.

**Terminalde şunu yazın:**
```
npx prisma migrate dev --name init
```

**Ne görmelisiniz?**
```
✔ Migration created and applied
```

**Eğer "migration file" sorusu sorarsa:** `Enter` tuşuna basın.

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 7: Backend'i Başlat

**Ne yapıyoruz?** Backend sunucusunu çalıştırıyoruz.

**Terminalde şunu yazın:**
```
npm run dev
```

**Ne görmelisiniz?**
```
Server is running on port 3000
Environment: development
CORS Origin: http://localhost:5173
```

**⚠️ ÖNEMLİ:** Bu terminal penceresini AÇIK BIRAKIN! Kapatmayın!

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 8: Backend Çalışıyor mu Test Et

**Ne yapıyoruz?** Backend'in çalıştığını kontrol ediyoruz.

**Tarayıcınızı açın ve şu adrese gidin:**
```
http://localhost:3000/api/health
```

**Ne görmelisiniz?**
```json
{
  "status": "ok",
  "message": "API is running",
  "database": "connected"
}
```

**Eğer "database connection failed" görürseniz:**
- ADIM 1'i tekrar yapın (PostgreSQL'i başlatın)
- ADIM 6'yı tekrar yapın (migration)

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 9: YENİ Terminal Aç (Frontend İçin)

**Ne yapıyoruz?** Frontend için yeni bir terminal açıyoruz.

**YAPIN:**
- Yeni bir terminal penceresi açın (PowerShell veya CMD)
- Veya mevcut terminalde `Ctrl+C` yapıp backend'i durdurun (sonra tekrar başlatırsınız)

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 10: Frontend Klasörüne Git

**Ne yapıyoruz?** Frontend klasörüne geçiyoruz.

**YENİ terminalde şunu yazın:**
```
cd C:\mytask\frontend
```

**Ne görmelisiniz?**
Terminal satırınız şöyle olmalı: `C:\mytask\frontend>`

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 11: Paketleri Yükle (Frontend)

**Ne yapıyoruz?** Frontend için gerekli programları indiriyoruz.

**Terminalde şunu yazın:**
```
npm install
```

**Ne görmelisiniz?**
Çok fazla satır geçecek, sonunda `added XXX packages` gibi bir şey göreceksiniz.

**⏳ Bu biraz zaman alabilir (2-5 dakika).** Sabırlı olun.

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 12: Frontend'i Başlat

**Ne yapıyoruz?** Frontend uygulamasını çalıştırıyoruz.

**Terminalde şunu yazın:**
```
npm run dev
```

**Ne görmelisiniz?**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**⚠️ ÖNEMLİ:** Bu terminal penceresini de AÇIK BIRAKIN!

**✅ Bu adım tamamlandı mı?** Devam edin.

---

## ADIM 13: Uygulamayı Aç

**Ne yapıyoruz?** Uygulamayı tarayıcıda açıyoruz.

**Tarayıcınızı açın ve şu adrese gidin:**
```
http://localhost:5173
```

**Ne görmelisiniz?**
- Giriş sayfası (Login)
- Veya kayıt sayfası (Register)

**✅ Bu adım tamamlandı mı?** TEBRİKLER! 🎉

---

## 🎯 ŞİMDİ NE YAPACAKSINIZ?

1. **Kayıt Ol** butonuna tıklayın
2. E-posta ve şifre girin (şifre en az 6 karakter)
3. Kayıt olun
4. Notlarınızı oluşturun!

---

## ❌ SORUN MU VAR?

### Backend çalışmıyor?
- ADIM 1'i kontrol edin (PostgreSQL çalışıyor mu?)
- ADIM 7'deki terminal penceresini kontrol edin (hata var mı?)

### Frontend çalışmıyor?
- ADIM 11'i kontrol edin (npm install yapıldı mı?)
- ADIM 12'deki terminal penceresini kontrol edin (hata var mı?)

### "Kayıt başarısız" hatası?
- Backend terminalinde hata var mı bakın
- Tarayıcıda F12'ye basın, Console sekmesinde hata var mı bakın
- `http://localhost:3000/api/health` adresine gidin, "connected" görüyor musunuz?

---

## 📝 ÖZET: İKİ TERMİNAL GEREKLİ

**Terminal 1 (Backend):**
```
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```
cd frontend
npm run dev
```

**İkisi de çalışırken:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

