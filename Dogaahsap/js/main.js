/**
 * Tüm sayfalarda kullanılan ortak JavaScript
 * Şimdilik: mobil menü aç/kapa
 */

// Mobil menü butonuna tıklanınca menüyü göster/gizle
function mobilMenuBaslat() {
  const menuBtn = document.getElementById("menuToggle");
  const anaMenu = document.getElementById("anaMenu");

  if (!menuBtn || !anaMenu) return;

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("acik");
    anaMenu.classList.toggle("acik");
  });

  // Menü linkine tıklanınca mobil paneli kapat
  anaMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuBtn.classList.remove("acik");
      anaMenu.classList.remove("acik");
    });
  });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", mobilMenuBaslat);
