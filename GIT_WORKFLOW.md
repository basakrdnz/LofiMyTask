# 🔄 Git Workflow & Branch Strategy

## 📋 Branch Yapısı (Senior Developer Yaklaşımı)

### Ana Branch'ler:
```
main (production)
  └─ Her zaman deploy edilebilir durumda
  └─ Sadece tested, reviewed kodlar
  └─ Production'a otomatik deploy olur

develop (development)
  └─ Geliştirme ortamı
  └─ Feature branch'lerin merge edildiği yer
  └─ Test edilmiş ama production'a hazır olmayan kodlar

staging (opsiyonel - önerilir)
  └─ Production'a benzer test ortamı
  └─ Son kontroller için
  └─ Production'a deploy öncesi son test
```

### Feature Branch'ler:
```
feature/feature-name
  └─ Yeni özellik geliştirme
  └─ develop'den açılır, develop'e merge edilir

bugfix/bug-name
  └─ Bug fix'ler için
  └─ develop'den açılır, develop'e merge edilir

hotfix/critical-fix
  └─ Production'da kritik bug
  └─ main'den açılır, hem main hem develop'e merge edilir
```

---

## 🚀 Önerilen Workflow

### Senaryo 1: Yeni Özellik Geliştirme

```bash
# 1. develop branch'ine geç ve güncelle
git checkout develop
git pull origin develop

# 2. Yeni feature branch oluştur
git checkout -b feature/user-profile-page

# 3. Geliştirme yap, commit'le
git add .
git commit -m "feat: add user profile page"

# 4. Feature branch'i push'la
git push origin feature/user-profile-page

# 5. GitHub'da Pull Request oluştur
#    - develop'e merge et
#    - Code review iste (eğer ekip varsa)

# 6. PR merge edildikten sonra
git checkout develop
git pull origin develop
```

### Senaryo 2: Production'a Deploy

```bash
# 1. develop'deki tüm değişiklikleri test et
git checkout develop
npm run test
npm run build

# 2. main'e merge et
git checkout main
git merge develop
git push origin main

# 3. Render.com otomatik deploy eder (main branch'i dinliyor)
```

### Senaryo 3: Kritik Bug Fix (Hotfix)

```bash
# 1. main'den hotfix branch aç
git checkout main
git pull origin main
git checkout -b hotfix/login-error

# 2. Fix yap, commit'le
git add .
git commit -m "fix: resolve login authentication error"

# 3. main'e merge et (hemen deploy)
git checkout main
git merge hotfix/login-error
git push origin main

# 4. develop'e de merge et (ileride tekrar olmasın)
git checkout develop
git merge hotfix/login-error
git push origin develop
```

---

## 🎯 Best Practices

### 1. Commit Mesajları (Conventional Commits)
```bash
feat: yeni özellik ekleme
fix: bug düzeltme
docs: dokümantasyon
style: kod formatı (fonksiyonellik değişmez)
refactor: kod yeniden yapılandırma
test: test ekleme
chore: build, config değişiklikleri

# Örnekler:
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve database connection timeout"
git commit -m "refactor: improve auth middleware"
```

### 2. Branch İsimlendirme
```bash
# ✅ İyi:
feature/user-authentication
bugfix/login-error
hotfix/security-patch
refactor/api-structure

# ❌ Kötü:
new-feature
fix
test
update
```

### 3. Pull Request Checklist
- [ ] Kod çalışıyor mu? (local test)
- [ ] Build başarılı mı? (`npm run build`)
- [ ] Testler geçiyor mu? (`npm test`)
- [ ] Environment variables güncellendi mi?
- [ ] Breaking changes var mı? (dokümante et)
- [ ] Code review yapıldı mı? (eğer ekip varsa)

---

## 🌍 Environment Strategy

### Development (develop branch)
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mytask
CORS_ORIGIN=http://localhost:5173
```

### Staging (staging branch - opsiyonel)
```env
NODE_ENV=staging
DATABASE_URL=<Staging database URL>
CORS_ORIGIN=<Staging frontend URL>
```

### Production (main branch)
```env
NODE_ENV=production
DATABASE_URL=<Render.com Internal Connection String>
CORS_ORIGIN=<Production frontend URL>
```

---

## 📝 Günlük Workflow Özeti

### Sabah (Development başlangıcı):
```bash
git checkout develop
git pull origin develop
npm run env:check  # Environment kontrolü
npm run dev        # Development başlat
```

### Özellik geliştirirken:
```bash
git checkout -b feature/feature-name
# ... geliştirme yap ...
git add .
git commit -m "feat: feature description"
git push origin feature/feature-name
# GitHub'da PR oluştur
```

### Akşam (Gün sonu):
```bash
# Değişiklikleri commit'le
git add .
git commit -m "feat: what you did today"
git push origin feature/feature-name

# Veya develop'e merge et (eğer hazırsa)
```

### Production deploy (hazır olduğunda):
```bash
# develop'deki her şeyi test et
git checkout develop
npm run test
npm run build

# main'e merge et
git checkout main
git merge develop
git push origin main

# Render.com otomatik deploy eder
```

---

## 🔧 Yardımcı Scripts (package.json'a eklenebilir)

```json
{
  "scripts": {
    "git:feature": "git checkout develop && git pull && git checkout -b",
    "git:deploy": "git checkout main && git merge develop && git push origin main",
    "git:hotfix": "git checkout main && git pull && git checkout -b hotfix"
  }
}
```

Kullanım:
```bash
npm run git:feature -- feature/new-page
npm run git:deploy
npm run git:hotfix -- critical-bug
```

---

## ⚠️ Önemli Notlar

1. **main branch'e direkt commit YAPMA**
   - Her zaman develop üzerinden geç
   - Sadece hotfix'ler için main'den branch aç

2. **develop branch'i her zaman çalışır durumda tut**
   - Broken code'u develop'e merge etme
   - Önce local'de test et

3. **Feature branch'leri küçük tut**
   - 1-2 günlük işler için ideal
   - Büyük özellikleri parçalara böl

4. **Commit'leri sık yap**
   - Her mantıklı değişiklik için commit
   - "Work in progress" commit'leri de olabilir

5. **Pull Request kullan**
   - develop'e merge etmeden önce PR aç
   - Kendi kodunu review et
   - Checklist'i kontrol et

---

## 🎓 Senior Developer Tavsiyeleri

### ✅ Yapılması Gerekenler:
- Feature branch kullan
- PR ile merge et
- Test et, sonra deploy et
- Commit mesajlarını açıklayıcı yaz
- Environment variables'ları kontrol et

### ❌ Yapılmaması Gerekenler:
- main'e direkt commit
- Broken code'u develop'e merge et
- Büyük feature branch'leri (1 haftadan fazla)
- Commit mesajı olmadan commit
- Environment variables'ları unutma

---

## 🚀 Hızlı Başlangıç

```bash
# 1. Yeni özellik için
git checkout develop
git pull
git checkout -b feature/my-feature

# 2. Geliştirme yap, commit'le
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature

# 3. GitHub'da PR oluştur, merge et

# 4. Production'a deploy (hazır olduğunda)
git checkout main
git merge develop
git push origin main
```

