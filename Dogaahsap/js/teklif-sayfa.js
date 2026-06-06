/** Teklif formu — localStorage + müsait saat kontrolü */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("teklifForm");
  var basari = document.getElementById("formBasari");
  var tarihInput = document.getElementById("randevuTarihi");

  telefonInputBaslat();

  if (tarihInput) {
    tarihInput.setAttribute("min", new Date().toISOString().split("T")[0]);
    tarihInput.addEventListener("change", saatSecenekleriniGuncelle);
    saatSecenekleriniGuncelle();
  }

  if (!form) return;

  form.addEventListener("submit", function (olay) {
    olay.preventDefault();
    if (basari) basari.hidden = true;

    if (!teklifFormuDogrula(form)) return;

    var randevuTarihi = form.randevuTarihi.value;
    var randevuSaati = form.randevuSaati.value;

    if (saatDoluMu(randevuTarihi, randevuSaati)) {
      alanHataGoster("randevuSaati", "Bu saat az önce doldu. Başka saat seçin.");
      saatSecenekleriniGuncelle();
      return;
    }

    var kayitlar = teklifleriGetirSlot();
    var yeniId = kayitlar.length > 0
      ? Math.max.apply(null, kayitlar.map(function (k) { return k.id || 0; })) + 1
      : 1;

    kayitlar.push({
      id: yeniId,
      adSoyad: form.adSoyad.value.trim(),
      eposta: form.eposta.value.trim(),
      telefon: telefonFormatlaGoster(form.telefon.value),
      randevuTarihi: randevuTarihi,
      randevuSaati: randevuSaati,
      mesaj: form.mesaj.value.trim(),
      durum: "beklemede",
      gonderimTarihi: new Date().toLocaleString("tr-TR")
    });

    veriYaz(STORAGE_TEKLIF, kayitlar);

    form.reset();
    if (document.getElementById("telefon")) {
      document.getElementById("telefon").value = "";
    }
    saatSecenekleriniGuncelle();

    if (basari) {
      basari.hidden = false;
      basari.textContent =
        "Talebiniz alındı (" + randevuTarihi + " " + randevuSaati + "). Admin onayından sonra saat dolu sayılır.";
    }
  });
});
