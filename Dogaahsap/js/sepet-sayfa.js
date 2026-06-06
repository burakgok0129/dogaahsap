/** Teklif sepeti sayfası */

function sepetSayfasiniGoster() {
  const sepet = sepetiGetir();
  const liste = document.getElementById("sepetListe");
  const bos = document.getElementById("sepetBos");
  const ozet = document.getElementById("sepetOzet");

  if (!liste) return;

  if (sepet.length === 0) {
    liste.innerHTML = "";
    if (bos) bos.hidden = false;
    if (ozet) ozet.hidden = true;
    return;
  }

  if (bos) bos.hidden = true;
  if (ozet) ozet.hidden = false;

  liste.innerHTML = sepet.map(function (k) {
    return (
      '<li class="sepet-satir">' +
      "<div><strong>" + k.ad + "</strong><br><small>Adet: " + k.adet + "</small></div>" +
      "<span>" + fiyatFormatla(k.fiyat * k.adet) + "</span>" +
      '<button type="button" class="btn-sil" data-sil="' + k.id + '">Sil</button>' +
      "</li>"
    );
  }).join("");

  const toplamEl = document.getElementById("sepetToplam");
  if (toplamEl) toplamEl.textContent = fiyatFormatla(sepetToplami(sepet));

  liste.querySelectorAll("[data-sil]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      sepettenSil(Number(btn.dataset.sil));
      sepetSayfasiniGoster();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  demoVeriYukle();
  sepetSayfasiniGoster();
});
