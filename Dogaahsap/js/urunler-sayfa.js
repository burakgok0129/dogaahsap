/** Ürünler sayfası: listele, ara, sepete ekle */

function urunleriGoster(liste) {
  const alan = document.getElementById("urunListesi");
  const bos = document.getElementById("urunBosMesaj");
  if (!alan) return;

  if (liste.length === 0) {
    alan.innerHTML = "";
    if (bos) bos.hidden = false;
    return;
  }

  if (bos) bos.hidden = true;

  alan.innerHTML = liste.map(function (u) {
    return (
      '<article class="urun-kart">' +
      '<img src="' + u.gorsel + '" alt="' + u.ad + '" width="400" height="200" loading="lazy" decoding="async">' +
      '<div class="urun-kart-icerik">' +
      "<h3>" + u.ad + "</h3>" +
      '<p class="urun-fiyat">' + fiyatFormatla(u.fiyat) + "</p>" +
      '<button type="button" class="btn btn-birincil" data-urun-id="' + u.id + '">Sepete Ekle</button>' +
      "</div></article>"
    );
  }).join("");

  alan.querySelectorAll("[data-urun-id]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const urun = URUNLER.find(function (u) { return u.id === Number(btn.dataset.urunId); });
      if (urun) {
        sepeteEkle(urun);
        btn.textContent = "Eklendi ✓";
        setTimeout(function () { btn.textContent = "Sepete Ekle"; }, 1500);
      }
    });
  });
}

function urunleriFiltrele() {
  const arama = (document.getElementById("urunArama") || {}).value || "";
  const kategori = (document.getElementById("kategoriFiltre") || {}).value || "tumu";
  const metin = arama.toLowerCase().trim();

  const sonuc = URUNLER.filter(function (u) {
    const kategoriUygun = kategori === "tumu" || u.kategori === kategori;
    const metinUygun = !metin || u.ad.toLowerCase().includes(metin);
    return kategoriUygun && metinUygun;
  });

  urunleriGoster(sonuc);
}

document.addEventListener("DOMContentLoaded", function () {
  demoVeriYukle();
  urunleriGoster(URUNLER);

  const arama = document.getElementById("urunArama");
  const filtre = document.getElementById("kategoriFiltre");
  if (arama) arama.addEventListener("input", urunleriFiltrele);
  if (filtre) filtre.addEventListener("change", urunleriFiltrele);
});
