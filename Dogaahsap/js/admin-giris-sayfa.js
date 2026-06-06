/**
 * Admin giriş sayfası
 */
document.addEventListener("DOMContentLoaded", function () {
  if (adminGirisYapildiMi()) {
    window.location.href = "admin-panel.html";
    return;
  }

  var form = document.getElementById("adminGirisForm");
  var hata = document.getElementById("girisHata");

  if (!form) return;

  form.addEventListener("submit", function (olay) {
    olay.preventDefault();
    if (hata) hata.hidden = true;

    var kullanici = form.kullanici.value.trim();
    var sifre = form.sifre.value;

    if (adminGirisDogrula(kullanici, sifre)) {
      adminGirisYap();
      window.location.href = "admin-panel.html";
    } else if (hata) {
      hata.hidden = false;
    }
  });
});
