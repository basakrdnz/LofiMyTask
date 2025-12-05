# Git Push Komutları

## 🔄 Değişiklikleri Push Etmek İçin

### 1. Durumu Kontrol Et
```bash
git status
```

### 2. Tüm Değişiklikleri Ekle
```bash
git add .
```
veya belirli dosyalar için:
```bash
git add backend/package.json
```

### 3. Commit Yap
```bash
git commit -m "Değişiklik açıklaması"
```

### 4. Push Et
```bash
git push
```

veya branch belirtmek için:
```bash
git push origin main
```

---

## 📋 Tek Seferde (Hızlı Yol)

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

---

## 🔍 Kontrol Komutları

### Remote Repository Kontrol
```bash
git remote -v
```

### Son Commit'leri Gör
```bash
git log --oneline -5
```

### Branch Kontrol
```bash
git branch
```

---

## ⚠️ İlk Kez Push Ediyorsanız

```bash
git push -u origin main
```

`-u` flag'i upstream'i ayarlar, sonraki push'larda sadece `git push` yeterli olur.

