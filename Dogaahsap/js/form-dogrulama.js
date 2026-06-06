/**
 * Form doğrulama — hata mesajlarını gösterir
 */

function alanHataGoster(alanId, mesaj) {
  const alan = document.getElementById(alanId);
  const hata = document.getElementById(alanId + "Hata");
  if (alan) alan.classList.add("hatali");
  if (hata) hata.textContent = mesaj;
}

function alanHataTemizle(alanId) {
  const alan = document.getElementById(alanId);
  const hata = document.getElementById(alanId + "Hata");
  if (alan) alan.classList.remove("hatali");
  if (hata) hata.textContent = "";
}

function epostaGecerliMi(eposta) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);
}

function teklifFormuDogrula(form) {
  let gecerli = true;
  const alanlar = ["adSoyad", "eposta", "telefon", "randevuTarihi", "randevuSaati", "mesaj"];

  alanlar.forEach(function (id) { alanHataTemizle(id); });

  if (form.adSoyad.value.trim().length < 3) {
    alanHataGoster("adSoyad", "Ad soyad en az 3 karakter olmalı.");
    gecerli = false;
  }

  if (!epostaGecerliMi(form.eposta.value.trim())) {
    alanHataGoster("eposta", "Geçerli bir e-posta girin.");
    gecerli = false;
  }

  if (typeof telefonGecerliMi === "function" && !telefonGecerliMi(form.telefon.value)) {
    alanHataGoster("telefon", "Geçerli cep telefonu girin (+90 5XX XXX XX XX).");
    gecerli = false;
  } else if (typeof telefonGecerliMi !== "function" && form.telefon.value.trim().length < 10) {
    alanHataGoster("telefon", "Telefon en az 10 haneli olmalı.");
    gecerli = false;
  }

  var tarih = form.randevuTarihi ? form.randevuTarihi.value : "";
  if (!tarih) {
    alanHataGoster("randevuTarihi", "Randevu tarihi seçin.");
    gecerli = false;
  } else {
    var bugun = new Date();
    bugun.setHours(0, 0, 0, 0);
    var secilen = new Date(tarih + "T00:00:00");
    if (secilen < bugun) {
      alanHataGoster("randevuTarihi", "Geçmiş tarih seçilemez.");
      gecerli = false;
    }
  }

  var saat = form.randevuSaati ? form.randevuSaati.value : "";
  if (!saat) {
    alanHataGoster("randevuSaati", "Saat seçin.");
    gecerli = false;
  } else if (typeof saatDoluMu === "function" && tarih && saatDoluMu(tarih, saat)) {
    alanHataGoster("randevuSaati", "Bu saat dolu. Başka saat seçin.");
    gecerli = false;
  }

  if (form.mesaj.value.trim().length < 10) {
    alanHataGoster("mesaj", "Mesaj en az 10 karakter olmalı.");
    gecerli = false;
  }

  return gecerli;
}

function iletisimFormuDogrula(form) {
  let gecerli = true;
  ["adSoyad", "eposta", "mesaj"].forEach(function (id) { alanHataTemizle(id); });

  if (form.adSoyad.value.trim().length < 2) {
    alanHataGoster("adSoyad", "Ad soyad zorunludur.");
    gecerli = false;
  }
  if (!epostaGecerliMi(form.eposta.value.trim())) {
    alanHataGoster("eposta", "Geçerli e-posta girin.");
    gecerli = false;
  }
  if (form.mesaj.value.trim().length < 5) {
    alanHataGoster("mesaj", "Mesaj çok kısa.");
    gecerli = false;
  }
  return gecerli;
}
