/**
 * Sunum için örnek sepet verisi — sadece ilk açılışta yüklenir
 */
function demoVeriYukle() {
  if (localStorage.getItem("doga_demo_yuklendi")) return;

  veriYaz(STORAGE_SEPET, [
    { id: 1, ad: "Meşe Yemek Masası", fiyat: 12500, adet: 1 },
    { id: 3, ad: "Duvar Kitaplığı", fiyat: 6200, adet: 1 }
  ]);

  veriYaz(STORAGE_TEKLIF, [
    {
      id: 1,
      adSoyad: "Ayşe Kaya",
      eposta: "ayse@ornek.com",
      telefon: "+90 532 123 45 67",
      randevuTarihi: "2026-05-22",
      randevuSaati: "09:00",
      durum: "onaylandi",
      onayTarihi: "20.05.2026 09:15:00",
      mesaj: "6 kişilik yemek masası ölçüsü ve fiyat teklifi istiyorum.",
      gonderimTarihi: "20.05.2026 10:30:00"
    },
    {
      id: 2,
      adSoyad: "Mehmet Demir",
      eposta: "mehmet@ornek.com",
      telefon: "+90 555 987 65 43",
      randevuTarihi: "2026-05-22",
      randevuSaati: "14:00",
      durum: "beklemede",
      mesaj: "Özel ölçü TV ünitesi için teklif.",
      gonderimTarihi: "19.05.2026 14:15:00"
    }
  ]);

  veriYaz(STORAGE_DOLU_LOG, [
    {
      id: 1,
      teklifId: 1,
      adSoyad: "Ayşe Kaya",
      randevuTarihi: "2026-05-22",
      randevuSaati: "09:00",
      onayTarihi: "20.05.2026 09:15:00",
      kayit: "DOLU — bu saat artık randevu alınamaz"
    }
  ]);

  localStorage.setItem("doga_demo_yuklendi", "true");
}
