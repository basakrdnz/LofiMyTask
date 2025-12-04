# 🚀 Render.com Deployment Rehberi - MyTask

Bu rehber Render.com üzerinde MyTask uygulamasını deploy etmek için adım adım talimatlar içerir.

> 💡 **Hızlı Başlangıç**: Render.com'da `render.yaml` dosyası ile otomatik deployment yapabilirsiniz (opsiyonel). Manuel adımlar için aşağıya devam edin.

---

## 📋 Ön Hazırlık

1. **GitHub Repository**: Kodunuzun GitHub'da olması gerekiyor
   - Repository: `basakrdnz/LofiMyTask`
   - Tüm kodlar commit edilmiş olmalı

2. **Render.com Hesabı**: 
   - https://render.com adresine gidin
   - GitHub ile giriş yapın (ücretsiz)

---

## 🗄️ Adım 1: PostgreSQL Database Oluşturma

1. Render Dashboard'a gidin
2. **"New +"** butonuna tıklayın
3. **"PostgreSQL"** seçin
4. Formu doldurun:
   - **Name**: `mytask-db` (veya istediğiniz isim)
   - **Database**: `mytask` (veya boş bırakın, otomatik oluşur)
   - **User**: Otomatik oluşturulur
   - **Region**: En yakın bölgeyi seçin (örn: Frankfurt)
   - **PostgreSQL Version**: `15` (veya en son)
   - **Plan**: **Free** (başlangıç için)
5. **"Create Database"** butonuna tıklayın
6. Database oluşturulduktan sonra:
   - **"Connections"** sekmesine gidin
   - **"Internal Database URL"** değerini kopyalayın (bu backend için kullanılacak)
   - **"External Database URL"** değerini de kopyalayın (local test için)

**Örnek Connection String:**
```
postgresql://mytask_user:password@dpg-xxxxx-a.frankfurt-postgres.render.com/mytask_db
```

---

## 🔧 Adım 2: Backend Service Oluşturma

1. Render Dashboard'da **"New +"** → **"Web Service"** seçin
2. GitHub repository'nizi bağlayın:
   - **"Connect account"** ile GitHub hesabınızı bağlayın (ilk seferinde)
   - **"Connect repository"** ile `basakrdnz/LofiMyTask` repository'sini seçin
3. Service ayarlarını yapın:
   - **Name**: `mytask-backend` (veya istediğiniz isim)
   - **Region**: Database ile aynı region (örn: Frankfurt)
   - **Branch**: `main` (veya `master`)
   - **Root Directory**: `backend` ⚠️ **ÖNEMLİ: backend klasörünü seçin**
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     npm install && npx prisma generate && npm run build && npx prisma migrate deploy
     ```
     ⚠️ **ÖNEMLİ: Prisma migration'ları build sırasında çalıştırılmalı**
   - **Start Command**: 
     ```bash
     npm start
     ```
4. **Environment Variables** ekleyin (aşağıdaki değişkenleri ekleyin):

   ```
   DATABASE_URL=postgresql://mytask_user:password@dpg-xxxxx-a.frankfurt-postgres.render.com/mytask_db
   ```
   ⚠️ **Yukarıdaki connection string'i Adım 1'de kopyaladığınız Internal Database URL ile değiştirin!**

   ```
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
   ```
   ⚠️ **Güçlü bir secret key oluşturun (en az 32 karakter)**

   ```
   JWT_EXPIRES_IN=7d
   ```

   ```
   NODE_ENV=production
   ```

   ```
   PORT=10000
   ```
   ⚠️ **Render.com otomatik olarak PORT environment variable'ını set eder, ama 10000 kullanabilirsiniz**

   ```
   CORS_ORIGIN=https://mytask-frontend.onrender.com
   ```
   ⚠️ **Frontend URL'ini henüz bilmiyorsanız, önce frontend'i deploy edin, sonra buraya geri dönüp güncelleyin**

5. **"Create Web Service"** butonuna tıklayın
6. Backend deploy olmaya başlayacak (5-10 dakika sürebilir)
7. Deploy tamamlandığında, backend URL'inizi not edin:
   - Örnek: `https://mytask-backend.onrender.com`
   - API endpoint: `https://mytask-backend.onrender.com/api`

---

## 🎨 Adım 3: Frontend Static Site Oluşturma

1. Render Dashboard'da **"New +"** → **"Static Site"** seçin
2. GitHub repository'nizi bağlayın:
   - **"Connect repository"** ile `basakrdnz/LofiMyTask` repository'sini seçin
3. Site ayarlarını yapın:
   - **Name**: `mytask-frontend` (veya istediğiniz isim)
   - **Branch**: `main` (veya `master`)
   - **Root Directory**: `frontend` ⚠️ **ÖNEMLİ: frontend klasörünü seçin**
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `dist` ⚠️ **Vite build çıktısı dist klasöründe**
4. **Environment Variables** ekleyin:

   ```
   VITE_API_URL=https://mytask-backend.onrender.com/api
   ```
   ⚠️ **Yukarıdaki URL'i Adım 2'de aldığınız backend URL ile değiştirin!**

5. **"Create Static Site"** butonuna tıklayın
6. Frontend deploy olmaya başlayacak (3-5 dakika sürebilir)
7. Deploy tamamlandığında, frontend URL'inizi not edin:
   - Örnek: `https://mytask-frontend.onrender.com`

---

## 🔄 Adım 4: CORS Ayarlarını Güncelleme

1. Backend service'inize geri dönün (Render Dashboard → `mytask-backend`)
2. **"Environment"** sekmesine gidin
3. `CORS_ORIGIN` environment variable'ını bulun
4. Değerini frontend URL'iniz ile güncelleyin:
   ```
   CORS_ORIGIN=https://mytask-frontend.onrender.com
   ```
5. **"Save Changes"** butonuna tıklayın
6. Backend otomatik olarak yeniden deploy olacak

---

## ✅ Adım 5: Veritabanı Migration'larını Çalıştırma

Backend ilk deploy olduğunda Prisma migration'ları otomatik çalışmalı. Eğer çalışmadıysa:

1. Backend service'inize gidin
2. **"Shell"** sekmesine tıklayın (veya **"Logs"** sekmesinden kontrol edin)
3. Manuel olarak migration çalıştırmak için:
   ```bash
   cd /opt/render/project/src/backend
   npx prisma migrate deploy
   ```

Veya backend'in `package.json` dosyasına `postinstall` script ekleyebiliriz (zaten var mı kontrol edelim).

---

## 🧪 Adım 6: Test Etme

1. Frontend URL'inize gidin: `https://mytask-frontend.onrender.com`
2. Kayıt olun veya giriş yapın
3. Not/görev oluşturmayı test edin
4. Backend logs'ları kontrol edin (Render Dashboard → Backend Service → Logs)

---

## 🔍 Troubleshooting (Sorun Giderme)

### Backend deploy hatası alıyorsanız:

1. **Build Logs'u kontrol edin:**
   - Render Dashboard → Backend Service → Logs
   - Hata mesajlarını okuyun

2. **Yaygın hatalar:**
   - ❌ `DATABASE_URL not found` → Environment variable'ı ekleyin
   - ❌ `Prisma Client not generated` → Build command'a `npx prisma generate` ekleyin
   - ❌ `Module not found` → `package.json` dependencies kontrol edin

3. **Build Command'ı güncelleyin:**
   ```bash
   npm install && npx prisma generate && npm run build && npx prisma migrate deploy
   ```
   ⚠️ **Production'da `prisma migrate deploy` kullanın, `migrate dev` değil!**

### Frontend deploy hatası alıyorsanız:

1. **Build Logs'u kontrol edin:**
   - Render Dashboard → Frontend Service → Logs

2. **Yaygın hatalar:**
   - ❌ `VITE_API_URL not found` → Environment variable'ı ekleyin
   - ❌ `Build failed` → `package.json` ve dependencies kontrol edin

3. **Publish Directory kontrol:**
   - `dist` klasörünün doğru olduğundan emin olun

### Database bağlantı hatası:

1. **Internal Database URL kullanın:**
   - Render'da backend ve database aynı network'te olduğu için **Internal Database URL** kullanmalısınız
   - External URL sadece local test için

2. **Connection String format:**
   ```
   postgresql://user:password@host:port/database?sslmode=require
   ```

3. **Migration hatası:**
   - Build command'da `npx prisma migrate deploy` olduğundan emin olun
   - `migrate dev` kullanmayın (production'da)
   - Migration'lar build sırasında otomatik çalışmalı

### CORS hatası:

1. Backend'de `CORS_ORIGIN` environment variable'ının doğru frontend URL'i içerdiğinden emin olun
2. Frontend URL'i tam olarak yazın (trailing slash olmadan):
   - ✅ `https://mytask-frontend.onrender.com`
   - ❌ `https://mytask-frontend.onrender.com/`

---

## 📝 Önemli Notlar

### Free Tier Limitleri:

- ⏰ **Sleep Mode**: 15 dakika inactivity sonrası uyku moduna geçer
- 🚀 **Cold Start**: İlk istek 30-60 saniye sürebilir (uyku modundan uyanma)
- 💾 **Database**: 90 MB storage limiti (free tier)
- 🔄 **Auto Deploy**: Her GitHub push'ta otomatik deploy

### Production İçin Öneriler:

1. **Database Backup**: Render otomatik backup alır (free tier'da sınırlı)
2. **Custom Domain**: Render'da custom domain ekleyebilirsiniz
3. **Environment Variables**: Asla GitHub'a commit etmeyin
4. **Logs**: Render Dashboard'dan logs'ları takip edin

---

## 🎯 Hızlı Kontrol Listesi

- [ ] PostgreSQL database oluşturuldu
- [ ] Backend service oluşturuldu (root directory: `backend`)
- [ ] Backend environment variables eklendi (DATABASE_URL, JWT_SECRET, vb.)
- [ ] Backend deploy edildi ve çalışıyor
- [ ] Frontend static site oluşturuldu (root directory: `frontend`)
- [ ] Frontend environment variable eklendi (VITE_API_URL)
- [ ] Frontend deploy edildi
- [ ] CORS_ORIGIN backend'de güncellendi
- [ ] Database migration'ları çalıştırıldı
- [ ] Test edildi (kayıt, giriş, not/görev oluşturma)

---

## 🚀 Sonraki Adımlar

1. **Custom Domain** ekleyin (opsiyonel)
2. **Monitoring** kurun (opsiyonel)
3. **Backup stratejisi** oluşturun
4. **Performance optimization** yapın

---

Sorun yaşarsanız Render Dashboard'daki **Logs** sekmesinden hata mesajlarını kontrol edin veya bana sorun! 🎉

