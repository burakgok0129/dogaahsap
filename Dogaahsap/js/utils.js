/**
 * localStorage okuma/yazma — tüm sayfalarda ortak kullanılır
 */
const STORAGE_SEPET = "doga_sepet";
const STORAGE_TEKLIF = "doga_teklifler";
const STORAGE_DOLU_LOG = "doga_dolu_randevular";
const STORAGE_ILETISIM = "doga_iletisim";

function veriOku(anahtar) {
  try {
    const ham = localStorage.getItem(anahtar);
    return ham ? JSON.parse(ham) : null;
  } catch (hata) {
    return null;
  }
}

function veriYaz(anahtar, deger) {
  localStorage.setItem(anahtar, JSON.stringify(deger));
}

function fiyatFormatla(tutar) {
  return tutar.toLocaleString("tr-TR") + " ₺";
}
