/**
 * Teklif randevu saatleri ve telefon biçimlendirme
 */

var CALISMA_SAATLERI = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

/** Sadece rakamları alır */
function telefonRakamlari(metin) {
  return (metin || "").replace(/\D/g, "");
}

/** 905xxxxxxxxx formatına çevirir */
function telefonNormalize(metin) {
  var rakam = telefonRakamlari(metin);
  if (rakam.indexOf("90") === 0) {
    rakam = rakam.slice(0, 12);
  } else if (rakam.indexOf("0") === 0) {
    rakam = "90" + rakam.slice(1, 11);
  } else if (rakam.indexOf("5") === 0) {
    rakam = "90" + rakam.slice(0, 10);
  } else {
    rakam = "90" + rakam.slice(0, 10);
  }
  return rakam.slice(0, 12);
}

/** +90 5XX XXX XX XX görünümü */
function telefonFormatlaGoster(metin) {
  var n = telefonNormalize(metin);
  if (n.length <= 2) return "+90 ";
  var ulke = "+90";
  var kalan = n.slice(2);
  var parca = [];
  if (kalan.length > 0) parca.push(kalan.slice(0, 3));
  if (kalan.length > 3) parca.push(kalan.slice(3, 6));
  if (kalan.length > 6) parca.push(kalan.slice(6, 8));
  if (kalan.length > 8) parca.push(kalan.slice(8, 10));
  return ulke + " " + parca.join(" ");
}

/** Türkiye cep: 90 + 5 + 9 hane = 12 rakam */
function telefonGecerliMi(metin) {
  var n = telefonNormalize(metin);
  return n.length === 12 && n.indexOf("905") === 0;
}

function teklifleriGetirSlot() {
  return veriOku(STORAGE_TEKLIF) || [];
}

/** Teklif durumu: beklemede | onaylandi | reddedildi */
function teklifDurumu(t) {
  return t.durum || "beklemede";
}

/** Sadece admin onayladıysa saat dolu sayılır */
function saatDoluMu(tarih, saat) {
  if (!tarih || !saat) return false;
  return teklifleriGetirSlot().some(function (t) {
    return (
      t.randevuTarihi === tarih &&
      t.randevuSaati === saat &&
      teklifDurumu(t) === "onaylandi"
    );
  });
}

/** Onaylanan randevuyu dolu log listesine yazar */
function doluRandevuLogla(teklif) {
  var log = veriOku(STORAGE_DOLU_LOG) || [];
  var zatenVar = log.some(function (k) {
    return k.randevuTarihi === teklif.randevuTarihi && k.randevuSaati === teklif.randevuSaati;
  });
  if (zatenVar) return;

  log.push({
    id: Date.now(),
    teklifId: teklif.id,
    adSoyad: teklif.adSoyad,
    randevuTarihi: teklif.randevuTarihi,
    randevuSaati: teklif.randevuSaati,
    onayTarihi: teklif.onayTarihi,
    kayit: "DOLU — bu saat artık randevu alınamaz"
  });
  veriYaz(STORAGE_DOLU_LOG, log);
}

function doluLoglariGetir() {
  return veriOku(STORAGE_DOLU_LOG) || [];
}

function musaitSaatleriGetir(tarih) {
  if (!tarih) return [];
  return CALISMA_SAATLERI.filter(function (saat) {
    return !saatDoluMu(tarih, saat);
  });
}

function saatSecenekleriniGuncelle() {
  var tarihInput = document.getElementById("randevuTarihi");
  var saatSelect = document.getElementById("randevuSaati");
  var musaitBilgi = document.getElementById("musaitBilgi");

  if (!tarihInput || !saatSelect) return;

  var tarih = tarihInput.value;
  saatSelect.innerHTML = "";

  if (!tarih) {
    saatSelect.innerHTML = '<option value="">Önce tarih seçin</option>';
    if (musaitBilgi) musaitBilgi.textContent = "";
    return;
  }

  var musait = musaitSaatleriGetir(tarih);
  var doluSayisi = CALISMA_SAATLERI.length - musait.length;

  saatSelect.innerHTML = '<option value="">Saat seçin</option>';

  CALISMA_SAATLERI.forEach(function (s) {
    var opt = document.createElement("option");
    opt.value = s;
    if (saatDoluMu(tarih, s)) {
      opt.textContent = s + " (dolu)";
      opt.disabled = true;
    } else {
      opt.textContent = s + " (müsait)";
    }
    saatSelect.appendChild(opt);
  });

  if (musait.length === 0) {
    if (musaitBilgi) {
      musaitBilgi.textContent = "Seçilen günde tüm saatler dolu (onaylı randevular).";
      musaitBilgi.className = "musait-uyari dolu";
    }
    return;
  }

  if (musaitBilgi) {
    musaitBilgi.textContent = musait.length + " müsait, " + doluSayisi + " dolu saat.";
    musaitBilgi.className = "musait-uyari musait";
  }
}

function telefonInputBaslat() {
  var input = document.getElementById("telefon");
  if (!input) return;

  input.addEventListener("input", function () {
    var formatted = telefonFormatlaGoster(input.value);
    input.value = formatted;
  });

  input.addEventListener("focus", function () {
    if (!input.value.trim()) input.value = "+90 ";
  });
}
