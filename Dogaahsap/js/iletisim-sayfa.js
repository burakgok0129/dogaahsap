/** İletişim formu — mesajları localStorage'a kaydeder */



document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("iletisimForm");

  var basari = document.getElementById("iletisimBasari");

  if (!form) return;



  form.addEventListener("submit", function (olay) {

    olay.preventDefault();

    if (basari) basari.hidden = true;



    if (!iletisimFormuDogrula(form)) return;



    var kayitlar = veriOku(STORAGE_ILETISIM) || [];

    var yeniId = kayitlar.length > 0

      ? Math.max.apply(null, kayitlar.map(function (k) { return k.id || 0; })) + 1

      : 1;



    kayitlar.push({

      id: yeniId,

      adSoyad: form.adSoyad.value.trim(),

      eposta: form.eposta.value.trim(),

      konu: form.konu ? form.konu.value.trim() : "",

      mesaj: form.mesaj.value.trim(),

      gonderimTarihi: new Date().toLocaleString("tr-TR")

    });



    veriYaz(STORAGE_ILETISIM, kayitlar);

    form.reset();



    if (basari) basari.hidden = false;

  });

});

