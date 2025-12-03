# GitHub'a Yükleme Adımları

## 1. GitHub'da Yeni Repository Oluşturun

1. GitHub'a giriş yapın: https://github.com
2. Sağ üstteki **"+"** butonuna tıklayın
3. **"New repository"** seçin
4. Repository adını girin: `mytask` (veya istediğiniz isim)
5. **Public** veya **Private** seçin
6. **"Create repository"** butonuna tıklayın
7. **ÖNEMLİ:** "Initialize this repository with a README" seçeneğini **İŞARETLEMEYİN** (zaten README'miz var)

## 2. Local Repository'yi GitHub'a Bağlayın

Terminal'de şu komutları çalıştırın:

```bash
# GitHub repository URL'inizi alın (örnek: https://github.com/kullaniciadi/mytask.git)
# Aşağıdaki komutta YOUR_USERNAME ve YOUR_REPO_NAME'i değiştirin

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 3. Alternatif: GitHub CLI ile (Daha Kolay)

Eğer GitHub CLI yüklüyse:

```bash
gh repo create mytask --public --source=. --remote=origin --push
```

## 4. Sonraki Commit'ler İçin

Her değişiklikten sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

## Önemli Notlar

- `.env` dosyaları `.gitignore`'da olduğu için GitHub'a yüklenmeyecek (güvenlik için)
- `node_modules` klasörleri de yüklenmeyecek (çok büyük)
- Sadece kaynak kodlar ve gerekli dosyalar yüklenecek

## Repository Ayarları

GitHub'da repository oluşturduktan sonra:

1. **Settings** > **Secrets** > **Actions** (eğer CI/CD kullanacaksanız)
2. **Settings** > **Pages** (eğer GitHub Pages kullanacaksanız)
3. **About** bölümünde açıklama ve website ekleyin

## README.md

README.md dosyası zaten hazır ve güncel. GitHub'da otomatik olarak görünecek.

