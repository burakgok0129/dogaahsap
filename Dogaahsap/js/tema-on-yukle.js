/** Sayfa çizilmeden önce kayıtlı temayı uygular (yanıp sönmeyi azaltır) */
(function () {
  var tema = localStorage.getItem("doga_tema");
  document.documentElement.setAttribute("data-tema", tema === "koyu" ? "koyu" : "acik");
})();
