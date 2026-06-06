 Doğa Ahşap Mobilya — Web Tasarım Projesi Raporu

Ders: Web Tasarım  
Proje adı: Doğa Ahşap Mobilya  
Proje türü: web sitesi (HTML, CSS, JavaScript)  
Veri saklama: Tarayıcı `localStorage` (sunucu / veritabanı yok)

 1. Projenin Amacı

Bu proje, el yapımı masif ahşap mobilya üreten hayali bir atölye (Doğa Ahşap Mobilya) için kurumsal bir web sitesi geliştirmeyi amaçlar. Kullanıcılar ürünleri inceleyebilir, sepete ekleyebilir, teklif/randevu talebi oluşturabilir ve iletişim formu gönderebilir. Yönetici (admin) panelinden teklif talepleri onaylanabilir veya reddedilebilir.

Proje, ders kapsamında front-end becerilerini (sayfa düzeni, responsive tasarım, form doğrulama, JavaScript ile etkileşim) göstermek için hazırlanmıştır.


 2. Site Sayfaları ve İşlevleri

 2.1 Ana Sayfa (`index.html`)
- Atölyeyi tanıtan hero bölümü
- Öne çıkan ürünler ve hizmetler
- Diğer sayfalara yönlendirme butonları
- Tüm sayfalarda ortak navbar ve footer

 2.2 Ürünler (`urunler.html`)
- `urun-data.js` içindeki ürünler listelenir
- Arama kutusu ile ürün adına göre filtreleme
- Kategori filtresi (masa, dolap, sandalye)
- Her ürün kartında görsel, fiyat ve “Sepete Ekle” butonu
- Ürün görselleri yerel `img/` klasöründen yüklenir (Unsplash bağlantı sorunları nedeniyle)

 2.3 Teklif Sepeti (`sepet.html`)
- Kullanıcının seçtiği ürünler listelenir
- Adet artırma/azaltma ve ürün silme
- Toplam fiyat hesaplama
- Veriler `localStorage` içinde saklanır; sayfa yenilense de kaybolmaz
- “Teklif İste” ile `teklif.html` sayfasına yönlendirme

 2.4 Teklif Al (`teklif.html`)
- Ad soyad, e-posta, telefon, mesaj alanları
- Telefon formatı: `+90 5XX XXX XX XX` (JavaScript ile otomatik biçimlendirme)
- Randevu tarihi ve saat seçimi
- Form gönderildiğinde talep `localStorage`’a “beklemede” durumuyla kaydedilir
- Dolu saatler yalnızca admin onayladığı randevular için engellenir

 2.5 Hakkımızda (`hakkimizda.html`)
- Atölye tanıtım metni
- Malzemeler bölümü (meşe, ceviz, çam)
- Navbar’daki “Malzemeler” linki `#malzemeler` anchor’ına gider

 2.6 İletişim (`iletisim.html`)
- Adres, telefon, e-posta, çalışma saatleri
- İletişim formu (ad, e-posta, konu, mesaj)
- Gönderilen mesajlar `localStorage`’a kaydedilir (admin panelinde görüntülenebilir yapı)

 2.7 Admin Giriş (`admin-giris.html`)
- Basit kullanıcı adı / şifre kontrolü
- Demo giriş: **admin** / **admin123**
- Başarılı girişte `admin-panel.html` açılır

 2.8 Admin Panel (`admin-panel.html`)
- Teklif taleplerini listeleme
- Onayla / Reddet /Sil işlemleri
- Onaylanan randevular için “Dolu Saat Kayıtları (Log)” tablosu
- Onaylanmayan (beklemede veya reddedilmiş) talepler saat slotunu bloklamaz

 3. Navbar (Üst Menü) Tasarımı

Navbar, tüm public sayfalarda aynı HTML yapısı ile kullanılır.

Masaüstü düzeni (3 sütun grid — `header-ic`):

 Ana Sayfa, Ürünler, İletişim,  Logo (Doğa Ahşap) , Malzemeler, Teklif Al, Admin + ikonlar 

Sağ ikon grubu (`header-ikonlar`)
- Sepet ikonu = `sepet.html`
- Tema geçişi (Açık / Koyu)
- Arama ikonu =`urunler.html`

Mobil (900px altı):
- Sol/sağ metin menüler gizlenir
- Logo solda, ikonlar ve hamburger menü sağda
- Açılır menüde tüm linkler + tema seçimi

Aktif sayfa, ilgili linke `class="aktif"` eklenerek vurgulanır.

 4. Tema Sistemi (Açık / Koyu)

- Kullanıcı tercihi `localStorage` anahtarı: `doga_tema`
- Değerler: `acik` veya `koyu`
- `tema-on-yukle.js` sayfa render edilmeden önce `<html data-tema="...">` atar (yanıp sönmeyi önler)
- `tema.js` navbar’daki butonlara tıklanınca temayı değiştirir
- `style.css` sonunda `html[data-tema="koyu"]` ve `html[data-tema="acik"]` için renk override’ları tanımlıdır

 5. Veri Saklama (localStorage)

Tüm anahtarlar `js/utils.js` içinde merkezi olarak tanımlanır:


 doga_sepet` | `STORAGE_SEPET` | Sepetteki ürünler (id, adet, fiyat) 
 doga_teklifler` | `STORAGE_TEKLIF` | Teklif/randevu talepleri 
 doga_dolu_randevular` | `STORAGE_DOLU_LOG` | Onaylanmış randevu saatleri (log) 
 doga_iletisim` | `STORAGE_ILETISIM` | İletişim formu mesajları 
 doga_tema` | — | Tema tercihi 
 doga_demo_yuklendi` | — | Demo verinin bir kez yüklenmesi için bayrak 

Not: Veriler yalnızca kullanıcının tarayıcısında tutulur. Farklı bilgisayar veya tarayıcıda veri paylaşılmaz.

6. Teklif ve Randevu Akışı(süreç)

1.Kullanıcı teklif formunu doldurur
        
2.form-dogrulama.js = alanları kontrol eder
        
3.teklif-slot.js = seçilen tarih/saat dolu mu? (sadece onaylı randevular)
        
4.teklif-sayfa.js = localStorage'a kaydeder (durum: "beklemede")
        
5.Admin panelinde liste görünür
        
6.Admin "Onayla" = durum: "onaylandi" + dolu saat log'a yazılır
7.Admin "Reddet" →=durum: "reddedildi"
        
8.Onaylanan saat, yeni teklif formunda seçilemez

Önemli kural: Randevu saati yalnızca `durum === "onaylandi"` olduğunda “dolu” sayılır. Beklemedeki talepler başka kullanıcıların aynı saati seçmesini engellemez (admin onayı beklenir).

 7. Form Doğrulama

`js/form-dogrulama.js` dosyası şu kontrolleri yapar:

- Ad soyad: Boş olamaz, en az 2 karakter
- E-posta: Geçerli e-posta formatı
- Telefon: `+90 5` ile başlayan 13 haneli cep formatı
- Randevu tarihi: Geçmiş tarih seçilemez
- Saat: Boş bırakılamaz; onaylı dolu slot seçilemez
- Mesaj: Minimum karakter kontrolü (iletişim/teklif formları)

Hatalı alanların altında kırmızı `.hata-msj` mesajları gösterilir.

 8. Responsive Tasarım

- CSS Grid ve Flexbox ile düzen
- `@media (max-width: 900px)` — navbar mobil moda geçer
- `@media (max-width: 1100px)` — sağ menü link fontları küçültülür
- Ürün kartları ve footer grid’i küçük ekranlarda tek sütuna iner
- Sabit üst header (`position: fixed`) — içerik `padding-top` ile header yüksekliğine göre ayarlanır

 9. Görsel ve Tasarım Tercihleri

- Renk paleti: Ahşap / doğa teması (koyu arka plan, altın vurgu, krem tonları)
- Ürün görselleri: `img/urun-1-mese-masa.jpg` … `img/urun-6-komodin.jpg` (yerel dosya — harici URL 404 hatalarından kaçınmak için)
- Erişilebilirlik: `aria-label`, `aria-pressed`, `aria-current` kullanımı; anlamlı buton etiketleri


 10. Karşılaşılan Sorunlar ve Çözümler


 Admin panelinde teklif listesi boş  `admin-teklif.js` içinde `STORAGE_TEKLIF` yeniden tanımlanmıştı (SyntaxError); kaldırıldı, `utils.js` kullanıldı 
 Navbar’da logo ile menü çakışması= Eski `logo-merkez` (absolute) kaldırıldı; 3 sütunlu `header-ic` grid kullanıldı 
 Unsplash görselleri 404=  Görseller indirilip `img/` klasörüne taşındı 
 Geçersiz HTML etiketleri=  Hatalı etiketler düzeltildi, geçerli `<div>` yapısına geçildi 
 Dolu saat mantığı = Yalnızca admin onaylı randevular slotu bloklar


 11. Sonuç

Doğa Ahşap Mobilya; web sitesi, ders gereksinimlerine uygun olarak HTML, CSS ve JavaScript ile geliştirilmiştir. Çok sayfalı yapı, responsive navbar, form doğrulama, sepet, teklif/randevu sistemi, admin onay akışı ve açık-koyu tema özellikleri bir arada sunulmaktadır. Veriler `localStorage` ile simüle edilmiş olup, gerçek bir üretim ortamında sunucu tarafı veritabanı entegrasyonu ile genişletilebilir.


Hazırlayan:Burak Gök
Öğrenci No:23430040017 
