/**

 * Admin panel — teklif listele, onayla, reddet, dolu log

 * STORAGE_TEKLIF, STORAGE_DOLU_LOG → js/utils.js

 * teklifDurumu, saatDoluMu, doluRandevuLogla → js/teklif-slot.js

 */



function teklifleriGetir() {

  return veriOku(STORAGE_TEKLIF) || [];

}



function teklifleriKaydet(liste) {

  veriYaz(STORAGE_TEKLIF, liste);

}



function durumEtiketi(durum) {

  if (durum === "onaylandi") {

    return '<span class="durum-etiket durum-onay">Onaylı / Dolu</span>';

  }

  if (durum === "reddedildi") {

    return '<span class="durum-etiket durum-red">Reddedildi</span>';

  }

  return '<span class="durum-etiket durum-bekleme">Beklemede</span>';

}



function teklifOnayla(id) {

  var liste = teklifleriGetir();

  var kayit = liste.find(function (t) { return t.id === id; });

  if (!kayit) return;



  if (teklifDurumu(kayit) === "onaylandi") {

    alert("Bu randevu zaten onaylı.");

    return;

  }



  if (saatDoluMu(kayit.randevuTarihi, kayit.randevuSaati)) {

    alert("Bu saat zaten dolu. Başka bir onaylı randevu var.");

    return;

  }



  kayit.durum = "onaylandi";

  kayit.onayTarihi = new Date().toLocaleString("tr-TR");

  teklifleriKaydet(liste);

  doluRandevuLogla(kayit);



  teklifListesiniGoster();

  doluLogListesiniGoster();

}



function teklifReddet(id) {

  var liste = teklifleriGetir();

  var kayit = liste.find(function (t) { return t.id === id; });

  if (!kayit) return;



  kayit.durum = "reddedildi";

  kayit.redTarihi = new Date().toLocaleString("tr-TR");

  teklifleriKaydet(liste);

  teklifListesiniGoster();

}



function teklifListesiniGoster() {

  var tbody = document.getElementById("teklifTabloGovde");

  var bosMesaj = document.getElementById("teklifBos");

  var sayac = document.getElementById("teklifSayisi");



  if (!tbody) return;



  var teklifler = teklifleriGetir();



  if (sayac) sayac.textContent = teklifler.length;



  if (teklifler.length === 0) {

    tbody.innerHTML = "";

    if (bosMesaj) bosMesaj.hidden = false;

    return;

  }



  if (bosMesaj) bosMesaj.hidden = true;



  teklifler.sort(function (a, b) {

    return (b.id || 0) - (a.id || 0);

  });



  tbody.innerHTML = teklifler.map(function (t) {

    var randevu = t.randevuTarihi || "—";

    var saat = t.randevuSaati || "—";

    var gonderim = t.gonderimTarihi || t.tarih || "—";

    var durum = teklifDurumu(t);

    var islemler = "";



    if (durum === "beklemede") {

      islemler =

        '<button type="button" class="btn-onay-admin" data-onay-id="' + t.id + '">Onayla</button> ' +

        '<button type="button" class="btn-red-admin" data-red-id="' + t.id + '">Reddet</button> ';

    }



    islemler += '<button type="button" class="btn-sil-admin" data-sil-id="' + t.id + '">Sil</button>';



    return (

      "<tr>" +

      "<td>" + (t.adSoyad || "—") + "</td>" +

      "<td>" + (t.eposta || "—") + "</td>" +

      "<td>" + (t.telefon || "—") + "</td>" +

      "<td>" + randevu + "</td>" +

      "<td>" + saat + "</td>" +

      "<td>" + durumEtiketi(durum) + "</td>" +

      "<td>" + (t.mesaj || "—") + "</td>" +

      "<td>" + gonderim + "</td>" +

      "<td class=\"admin-islem-hucre\">" + islemler + "</td>" +

      "</tr>"

    );

  }).join("");



  tbody.querySelectorAll("[data-onay-id]").forEach(function (btn) {

    btn.addEventListener("click", function () {

      teklifOnayla(Number(btn.getAttribute("data-onay-id")));

    });

  });



  tbody.querySelectorAll("[data-red-id]").forEach(function (btn) {

    btn.addEventListener("click", function () {

      if (!confirm("Bu talebi reddetmek istiyor musunuz?")) return;

      teklifReddet(Number(btn.getAttribute("data-red-id")));

    });

  });



  tbody.querySelectorAll("[data-sil-id]").forEach(function (btn) {

    btn.addEventListener("click", function () {

      if (!confirm("Bu teklifi silmek istiyor musunuz?")) return;

      var id = Number(btn.getAttribute("data-sil-id"));

      var yeni = teklifleriGetir().filter(function (t) { return t.id !== id; });

      teklifleriKaydet(yeni);

      teklifListesiniGoster();

      doluLogListesiniGoster();

    });

  });

}



function doluLogListesiniGoster() {

  var tbody = document.getElementById("doluLogGovde");

  var bosMesaj = document.getElementById("doluLogBos");

  if (!tbody) return;



  var log = doluLoglariGetir();



  if (log.length === 0) {

    tbody.innerHTML = "";

    if (bosMesaj) bosMesaj.hidden = false;

    return;

  }



  if (bosMesaj) bosMesaj.hidden = true;



  log.sort(function (a, b) {

    return (b.id || 0) - (a.id || 0);

  });



  tbody.innerHTML = log.map(function (k) {

    return (

      "<tr>" +

      "<td>" + (k.randevuTarihi || "—") + "</td>" +

      "<td>" + (k.randevuSaati || "—") + "</td>" +

      "<td>" + (k.adSoyad || "—") + "</td>" +

      "<td><span class=\"durum-etiket durum-onay\">DOLU</span></td>" +

      "<td>" + (k.onayTarihi || "—") + "</td>" +

      "<td>" + (k.kayit || "—") + "</td>" +

      "</tr>"

    );

  }).join("");

}



function adminPanelBaslat() {

  adminGirisZorunlu();

  teklifListesiniGoster();

  doluLogListesiniGoster();



  window.addEventListener("pageshow", function () {

    teklifListesiniGoster();

    doluLogListesiniGoster();

  });

  window.addEventListener("focus", function () {

    teklifListesiniGoster();

    doluLogListesiniGoster();

  });



  var yenileBtn = document.getElementById("teklifYenile");

  if (yenileBtn) {

    yenileBtn.addEventListener("click", function () {

      teklifListesiniGoster();

      doluLogListesiniGoster();

    });

  }



  var cikisBtn = document.getElementById("adminCikis");

  if (cikisBtn) {

    cikisBtn.addEventListener("click", function () {

      adminCikisYap();

      window.location.href = "admin-giris.html";

    });

  }

}



document.addEventListener("DOMContentLoaded", adminPanelBaslat);

