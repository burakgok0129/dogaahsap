/**
 * Açık / koyu tema geçişi — tercih localStorage'da saklanır
 */
function temaBaslat() {
  var html = document.documentElement;
  var butonlar = document.querySelectorAll("[data-tema-sec]");

  function temaUygula(tema) {
    html.setAttribute("data-tema", tema);
    localStorage.setItem("doga_tema", tema);

    butonlar.forEach(function (btn) {
      var secili = btn.getAttribute("data-tema-sec") === tema;
      btn.classList.toggle("aktif", secili);
      btn.setAttribute("aria-pressed", secili ? "true" : "false");
    });
  }

  butonlar.forEach(function (btn) {
    btn.addEventListener("click", function () {
      temaUygula(btn.getAttribute("data-tema-sec"));
    });
  });

  temaUygula(html.getAttribute("data-tema") || "acik");
}

document.addEventListener("DOMContentLoaded", temaBaslat);
