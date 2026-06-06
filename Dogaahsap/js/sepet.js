/**
 * Teklif sepeti işlemleri — ekle, listele, sil
 */

function sepetiGetir() {
  return veriOku(STORAGE_SEPET) || [];
}

function sepetiKaydet(sepet) {
  veriYaz(STORAGE_SEPET, sepet);
}

function sepeteEkle(urun) {
  const sepet = sepetiGetir();
  const mevcut = sepet.find(function (k) { return k.id === urun.id; });

  if (mevcut) {
    mevcut.adet += 1;
  } else {
    sepet.push({
      id: urun.id,
      ad: urun.ad,
      fiyat: urun.fiyat,
      adet: 1
    });
  }

  sepetiKaydet(sepet);
  return sepet;
}

function sepettenSil(urunId) {
  const yeni = sepetiGetir().filter(function (k) { return k.id !== urunId; });
  sepetiKaydet(yeni);
  return yeni;
}

function sepetToplami(sepet) {
  return sepet.reduce(function (t, k) {
    return t + k.fiyat * k.adet;
  }, 0);
}
